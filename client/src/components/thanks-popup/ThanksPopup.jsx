import React from "react"
import styles from "./styles.module.css"

let ThanksPopup = () => {
  return (
    <div className={styles.popupWrapper}>
      <div className={styles.popup}>
        <h2 className={styles.title}>Спасибо за ваше мнение!</h2>
        <p className={styles.prompt}>*Мнения можно оставлять раз в день</p>
      </div>
    </div>
  )
}

export default ThanksPopup