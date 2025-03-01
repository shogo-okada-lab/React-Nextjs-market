"use client";    // クライアントコンポーネントへ変更
import { useState } from "react";

const register = () => {
    // ()内のデータを入れる
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async(e) => {
        // イベントに対するデフォルトの動作を止めるメソッド(リロード阻止)
        e.preventDefault()
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/register`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                // JSON形式に
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password
                })
            })
            const jsonData = await response.json()
            alert(jsonData.message)
        } catch (error) {
            alert("ユーザー登録に失敗しました。")
        }
    }

    return (
        <div>
            <h1 className="page-title">ユーザー登録</h1>
            <form onSubmit={handleSubmit}>
                {/* inputに入力されたデータはeの中に　それをnameにデータを書き込むsetNameに渡している */}
                <input value={name} onChange={(e) => setName(e.target.value)} type="text" name="name" placeholder="名前" required></input>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" name="email" placeholder="メールアドレス" required></input>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" placeholder="パスワード" required></input>
                <button>登録</button>
            </form>
        </div>
    )
}

export default register