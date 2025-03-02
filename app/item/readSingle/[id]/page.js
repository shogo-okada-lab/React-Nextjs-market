import Image from "next/image"
import Link from "next/link"

export async function generateMetaData(context) {
    const singleItem = await getSingleItem(context.params.id)
    return {
        title: singleItem.title,
        description: singleItem.description
    }
}

const getSingleItem = async(itemId) => {
    // JSのコードを書くためにバッククオート+ ${}を使用する
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/readSingle/${itemId}`, {cache: "no-cache"})
    const jsonData = await response.json()
    return jsonData.singleItem
}

const readSingleItem = async(context) => {
    const params = await context.params
    const singleItem = await getSingleItem(params.id)

    return (
        <div className="grid-container-si">
            <div>
                <Image src={singleItem.image} width={750} height={500} alt="item-image" priority/>
            </div>
            <div>
                <h1>{singleItem.title}</h1>
                <h2>{singleItem.price}円</h2>
                <hr/>
                <p>{singleItem.description}</p>
            </div>
            <div>
                <Link href={`/item/update/${singleItem._id}`}>アイテム編集</Link>
                <Link href={`/item/delete/${singleItem._id}`}>アイテム削除</Link>
            </div>
        </div>
    )
}

export default readSingleItem