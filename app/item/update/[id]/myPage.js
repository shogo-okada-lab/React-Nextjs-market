"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";    //作成後、トップページ移動で使用
import useAuth from "@/app/utils/useAuth";

const MyPage = (context) => {
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [image, setImage] = useState("")
    const [description, setDescription] = useState("")
    const [email, setEmail] = useState("")
    // 「編集権限がありません。」が写らないように
    const [loading, setLoading] = useState("")

    const router = useRouter()
    const loginUserEmail = useAuth()

    // 特定のタイミングで実行したい操作の時に使用
    useEffect(() => {
        const getSingleItem = async(itemId) => {
            // JSのコードを書くためにバッククオート+ ${}を使用する
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/readSingle/${itemId}`, {cache: "no-cache"})
            const jsonData = await response.json()
            const singleItem = await jsonData.singleItem

            setTitle(singleItem?.title)
            setPrice(singleItem?.price)
            setImage(singleItem?.image)
            setDescription(singleItem?.description)
            setEmail(singleItem?.email)
            setLoading(true)
        }
        getSingleItem(context.params.id)
        // [context]で一回のみの動作に制限
    }, [context])

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/update/${context.params.id}`, {
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
                    email: loginUserEmail
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

    if (!loading) {
        return (
            <h1>ローディング中...</h1>
        )
    }
    if (loginUserEmail != email) {
        return (
            <h1>編集権限がありません。</h1>
        )
    }
    return (
        <div>
            <h1 className="page-title">アイテム編集</h1>
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

export default MyPage