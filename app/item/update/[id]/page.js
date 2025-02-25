"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";    //作成後、トップページ移動で使用

const updateItem = (context) => {
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [image, setImage] = useState("")
    const [description, setDescription] = useState("")
    const [email, setEmail] = useState("")

    const router = useRouter()

    // 特定のタイミングで実行したい操作の時に使用
    useEffect(() => {
        const getSingleItem = async(itemId) => {
            // JSのコードを書くためにバッククオート+ ${}を使用する
            const response = await fetch(`http://localhost:3000/api/item/readSingle/${itemId}`, {cache: "no-cache"})
            const jsonData = await response.json()
            const singleItem = await jsonData.singleItem

            setTitle(singleItem.title)
            setPrice(singleItem.price)
            setImage(singleItem.image)
            setDescription(singleItem.description)
            setEmail(singleItem.email)
        }
        getSingleItem(context.params.id)
        // [context]で一回のみの動作に制限
    }, [context])

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            const response = await fetch(`http://localhost:3000/api/item/update/${context.params.id}`, {
                method: "PUT",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    // JavaScriptでトークン取得コード
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                // JSON形式に
                body: JSON.stringify({
                    title: title,
                    price: price,
                    image: image,
                    description: description,
                    email: "dummy"
                })
            })
            const jsonData = await response.json()
            alert(jsonData.message)
            router.push("/")
            router.refresh()
        } catch (error) {
            alert("アイテム編集に失敗しました。")
        }
    }

    return (
        <div>
            <h1>アイテム編集</h1>
            <form onSubmit={handleSubmit}>
                <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" name="title" placeholder="アイテム名" required></input>
                <input value={price} onChange={(e) => setPrice(e.target.value)} type="text" name="price" placeholder="価格" required></input>
                <input value={image} onChange={(e) => setImage(e.target.value)} type="text" name="image" placeholder="画像" required></input>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} name="description" rows={15} placeholder="商品説明" required></textarea>
                <button>編集</button>
            </form>
        </div>
    )
}

export default updateItem