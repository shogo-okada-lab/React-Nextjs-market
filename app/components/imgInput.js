import { useState } from "react";

const ImgInput = (props) => {
    const [imgFile, setImgFile] = useState("")

    const handleClick = async() => {
        try {
            const data = new FormData()
            data.append("file", imgFile)
            // cloudinaryアカウント情報
            data.append("upload_preset", "")
            data.append("cloud_name", "")
            const response= await fetch("https://api.cloudinary.com/v1_1/.../image/upload", {method: "POST", body: data})
            const jsonData = await response.json()
            await props.setImage(jsonData.url)
            alert("画像アップロード成功")
        } catch (error) {
            alert("画像アップロード失敗")
        }
    }

    return (
        <div className="img-input">
            <input type="file" onChange={(e) => setImgFile(e.target.files[0])} accept="image/png, image/jpg"></input>
            <button onClick={handleClick} disabled={!imgFile}>画像アップロード</button>
        </div>
    )
}

export default ImgInput