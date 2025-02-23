import Image from "next/image"

const getSingleItem = async(itemId) => {
    // JSのコードを書くためにバッククオート+ ${}を使用する
    const response = await fetch(`http://localhost:3000/api/item/readSingle/${itemId}`)
    const jsonData = await response.json()
    return jsonData.singleItem
}

const readSingleItem = async(context) => {
    const params = await context.params
    const singleItem = await getSingleItem(params.id)

    return (
        <div>
            <div>
                <Image src={singleItem.image} width={750} height={500} alt="item-image" priority/>
            </div>
            <div>
                <h1>{singleItem.title}</h1>
                <h2>{singleItem.price}円</h2>
                <hr/>
                <p>{singleItem.description}</p>
            </div>
        </div>
    )
}

export default readSingleItem