import { NextResponse } from "next/server";
import connectDB from "@/app/utils/database";
import { ItemModel } from "@/app/utils/schemaModels";

export async function DELETE(request, context) {
    const reqBody = await request.json()
    try {
        await connectDB()
        const item = await ItemModel.findById(context.params.id)

        if (item.email !== reqBody.email) {
            return NextResponse.json({message: "他の人が作成したアイテムの為、削除はできません"})
        }

        await ItemModel.deleteOne({_id: context.params.id})
        return NextResponse.json({message: "アイテム削除成功"})
    } catch (error) {
        return NextResponse.json({message: "アイテム削除失敗"})
    }
}