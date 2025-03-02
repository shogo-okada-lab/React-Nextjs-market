"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";    //作成後、トップページ移動で使用
import Image from "next/image";
import useAuth from "@/app/utils/useAuth";

const MyPage = (context) => {
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [image, setImage] = useState("")
    const [description, setDescription] = useState("")
    const [email, setEmail] = useState("")
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
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/delete/${context.params.id}`, {
                method: "DELETE",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    // JavaScriptでトークン取得コード
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                // JSON形式に
                body: JSON.stringify({
                    email: loginUserEmail
                })
            })
            const jsonData = await response.json()
            alert(jsonData.message)
            router.push("/")
            router.refresh()
        } catch (error) {
            alert("アイテム削除に失敗しました。")
        }
    }

    if (!loading) {
        return (
            <h1>ローディング中...</h1>
        )
    }
    if (loginUserEmail != email) {
        return (
            <h1>削除権限がありません。</h1>
        )
    }
    return (
        <div>
            <h1 className="page-title">アイテム削除</h1>
            <form onSubmit={handleSubmit}>
                <h2>{title}</h2>
                <Image src={image} width={750} height={500} alt="item-image" priority/>
                <h3>{price}円</h3>
                <p>{description}</p>
                <button>削除</button>
            </form>
        </div>
    )
}

export default MyPage