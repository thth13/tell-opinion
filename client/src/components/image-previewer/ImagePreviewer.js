import React, { useState } from "react"
import styles from "./ImagePreviewer.module.css"

const ImagePreviewer = ({avatar, register}) => {
  const [profileImg, setProfileImg] = useState(avatar)

  const imageHandler = e => {
    debugger
    const reader = new FileReader()
    reader.onload = () => {
      if (reader.readyState === 2) {
        setProfileImg(reader.result)
      }
    }
    reader.readAsDataURL(e.target.files[0]);
  }

  return (
      <div className={styles.container}>
        <h1 className={styles.heading}>Add your Image</h1>
        <div className={styles.imgHolder}>
          <img src={profileImg} alt="" id="img" className={styles.img}/>
        </div>
        <input
          className={styles.inputFile} 
          type="file" 
          name="image-upload" 
          id="input" accept="image/*" 
          {...register("avatar", {
            onChange: imageHandler
          })}
          // onChange={imageHandler}
        />
        <div className={styles.label}>
          <label htmlFor="input" className={styles.imageUpload}>
            Choose your photo
          </label>
        </div>
      </div>
  ) 
}

export default ImagePreviewer