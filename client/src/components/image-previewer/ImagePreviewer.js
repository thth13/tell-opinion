import React, { useEffect, useState } from "react"
import noAvatar from '../../img/noAvatar.png'
import styles from "./ImagePreviewer.module.css"
import {useTranslation} from 'react-i18next'
import c from "classnames"

const ImagePreviewer = ({avatar, register, errors}) => {
  const {t} = useTranslation()
  const [profileImg, setProfileImg] = useState(avatar ? avatar : noAvatar)

  useEffect(() => {
    if (avatar) setProfileImg(avatar)
  }, [avatar])
  
  const imageHandler = e => {
    const reader = new FileReader()
    reader.onload = () => {
      if (reader.readyState === 2) {
        setProfileImg(reader.result)
      }
    }
    reader.readAsDataURL(e.target.files[0]);
  }

  return (
    <div className={styles.avatarContainer}>
      <div className={styles.avatarWrapper}>
        <div className={styles.avatarHolder}>
          <img src={profileImg} alt="" id="img" 
            className={c(styles.avatar, {[styles.error]: errors.avatar})}
          />
        </div>
      </div>
      <input
        className={styles.inputFile} 
        type="file" 
        name="image-upload" 
        id="input"
        accept="image/*" 
        {...register("avatar", {
          onChange: imageHandler
        })}
      />
      <label htmlFor="input"
        className={c(styles.label, {[styles.error]: errors.avatar})}
      >
        {t('selectPhoto')}
      </label>
      {errors.avatar && <p className={styles.errorText}>{errors.avatar.message}</p>}
    </div>
  ) 
}

export default ImagePreviewer