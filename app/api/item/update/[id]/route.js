import { NextResponse } from "next/server";
import connectDB from "@/app/utils/database";
import { ItemModel } from "@/app/utils/schemaModels";

export async function PUT(request, context) {
    const reqBody = await request.json()
    try {
        await connectDB()
        const item = await ItemModel.findById(context.params.id)

        if (item.email !== reqBody.email) {
            return NextResponse.json({message: "他の人が作成したアイテムの為、編集はできません"})
        }

        // 更新
        await ItemModel.updateOne({_id: context.params.id}, reqBody)
        return NextResponse.json({message: "アイテム編集成功"})
    } catch (error) {
        return NextResponse.json({message: "アイテム編集失敗"})
    }
}