"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";    //作成後、トップページ移動で使用
import useAuth from "@/app/utils/useAuth";
import ImgInput from "@/app/components/imgInput";

const createItem = () => {
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [image, setImage] = useState("")
    const [description, setDescription] = useState("")

    const router = useRouter()
    const loginUserEmail = useAuth()

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/create`, {
                method: "POST",
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
            alert("アイテム作成に失敗しました。")
        }
    }

    if (loginUserEmail) {
        return (
            <div>
                <h1 className="page-title">アイテム作成</h1>
                <ImgInput setImage={setImage}/>
                <form onSubmit={handleSubmit}>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" name="title" placeholder="アイテム名" required></input>
                    <input value={price} onChange={(e) => setPrice(e.target.value)} type="text" name="price" placeholder="価格" required></input>
                    <input value={image} onChange={(e) => setImage(e.target.value)} type="text" name="image" placeholder="画像" required></input>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} name="description" rows={15} placeholder="商品説明" required></textarea>
                    <button>作成</button>
                </form>
            </div>
        )
    }
}

export default createItem