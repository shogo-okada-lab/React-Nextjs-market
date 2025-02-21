"use client"    // クライアントコンポーネントへ変更
import { useState } from "react"

const register = () => {
    const [name, setName] = useState("")    //一時保管
    const handleSubmit = () => {
        try {
            fetch("http://localhost:3000/user/register", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: "dummy data"
            })
        } catch (error) {
            //
        }
    }

    return (
        <div>
            <h1>ユーザー登録</h1>
            <form onSubmit={handleSubmit}></form>
            <form action="http://localhost:3000/user/register" method="POST">
                <input type="text" name="name" placeholder="名前" required></input>
                <input type="text" name="email" placeholder="メールアドレス" required></input>
                <input type="password" name="password" placeholder="パスワード" required></input>
                <button>登録</button>
            </form>
        </div>
    )
}

export default register