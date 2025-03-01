import Link from "next/link"
import Image from "next/image"

const getAllItems = async() => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/readAll`, {cache: "no-cache"})
    const jsonData = await response.json()
    return await jsonData.allItems
}

const readAllItems = async() => {
    const allItems = await getAllItems()
    return (
        <div>
            {allItems.map(item =>
                <div key={item._id}>
                    <Link href={`/item/readSingle/${item._id}`} key={item._id}>
                        {/* 手間のかかる画像の最適化を自動で行う */}
                        <Image src={item.image} width={750} height={500} alt="item-image" priority/>
                        <h2>{item.title}</h2>
                    </Link>
                    <h3>{item.price}円</h3>
                    <p>{item.description}</p>
                </div>
            )}
        </div>
    )
}

export default readAllItems