"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
    const [hasToken, setHasToken] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem("token")
        setHasToken(!!token)
    }, []);

    return (
        <header>
            <div>
                <Link href="/">
                    <Image src="/header.svg" width={1330} height={148} alt="header-image" property/>
                </Link>
            </div>
            <nav>
                <ul>
                    <li><Link href="/user/register">登録</Link></li>
                    {/* {hasToken ? (
                        <li><button onClick={() => {
                            localStorage.removeItem("token"); // ログアウト処理
                            setHasToken(false);
                        }}>ログアウト</button></li>
                    ) : (
                        <li><Link href="/user/login">ログイン</Link></li>
                    )}
                    {!hasToken && <li><Link href="/item/create">アイテム作成</Link></li>} */}



                    <li><Link href="/user/login">ログイン</Link></li>
                    <li><Link href="/item/create">アイテム作成</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header