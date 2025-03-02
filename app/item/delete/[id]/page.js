import MyPage from "./myPage";

export async function generateMetaData(context) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/readSingle/${context.params.id}`, {cache: "no-cache"})
    const jsonData = await response.json()
    const singleItem = jsonData.singleItem

    return {
        title: singleItem.title,
        description: singleItem.description
    }
}

const deleteItem = (context) => {
    return (
        <MyPage {...context}/>
    )
}

export default deleteItem