import { NextResponse } from "next/server";
import connectDB from "@/app/utils/database";
import { ItemModel } from "@/app/utils/schemaModels";

export async function GET() {
    try {
        await connectDB()
        const allItems = await ItemModel.find()
        return NextResponse.json({message: "全アイテム読取成功", allItems: allItems})
    } catch (error) {
        return NextResponse.json({message: "全アイテム読取失敗"})
    }
}

export const revalidate = 0