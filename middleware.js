import { NextResponse } from "next/server";
import { jwtVerify } from "jose";   // トークン判定に使用

export async function middleware(request) {
    // フロント側でき次第修正
    const token = "eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InRlc3RAZnJvbnQuY29tIiwiZXhwIjoxNzQwMjM0MDY5fQ.04bgU_sCMRbPQQl7TlyP_7ME2mBka2P5wNZCU_psAr8"
    // const token = request.headers.get("Authorization")?.split(" ")[1];
    if (!token) {
        return NextResponse.json({message: "トークンがありません"})
    }

    try {
        // シークレットキー生成（JavaScriptのコード next-market-app-bookという文字列をトークン発行に使うシークレットキーの形式に変換する）
        const secretKey = new TextEncoder().encode("next-market-app-book")
        // 判定
        const decodedJwt = await jwtVerify(token, secretKey)
        // このファイルでの処理は問題なく完了したと告げるコード
        return NextResponse.next()
    } catch (error) {
        return NextResponse.json({message: "トークンが正しくないので、ログインしてください"})
    }
}

// ミドルウェア適応ファイル
export const config = {
    // matcher: ブラウザからのリクエストを絞り込む機能
    matcher: [
        "/api/item/create",
        "/api/item/update/:path*",
        "/api/item/delete/:path*",
        // "/api/user/login"
    ]
}