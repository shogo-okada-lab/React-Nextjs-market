import { NextResponse } from "next/server";
import { SignJWT } from "jose";     // JSON Web Token
import connectDB from "@/app/utils/database";
import { UserModel } from "@/app/utils/schemaModels";

export async function POST(request) {
    const reqBody = await request.json()
    try {
        await connectDB()
        const savedUser = await UserModel.findOne({email: reqBody.email})
        if (!savedUser) {
            return NextResponse.json({message: "ログイン失敗：ユーザー登録してください"})
        }
        if (reqBody.password !== savedUser.password) {
            return NextResponse.json({message: "ログイン失敗：パスワードが間違っています"})
        }

        // シークレットキー生成（JavaScriptのコード next-market-app-bookという文字列をトークン発行に使うシークレットキーの形式に変換する）
        const secretKey = new TextEncoder().encode("next-market-app-book")
        // トークンに含ませるデータとしてメールアドレスを使用
        const payload = {email: reqBody.email}
        // トークン発行（アルゴリズムとしてHS256を指定　一日有効）
        const token = await new SignJWT(payload)
            .setProtectedHeader({alg: "HS256"})
            .setExpirationTime("1d")
            .sign(secretKey)
        console.log(token)
        return NextResponse.json({message: "ログイン成功"})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: "ログイン失敗"})
    }
}