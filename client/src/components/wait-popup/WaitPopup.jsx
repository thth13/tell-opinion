import React from "react"
import styles from "./styles.module.css"

let WaitPopup = () => {
  return (
    <div className={styles.popupWrapper}>
      <div className={styles.popup}>
        <h2 className={styles.title}>
          Вы уже оставляли мнение этому пользователю сегодня. 
          <br/>Повторите завтра.
         </h2>
        <p className={styles.prompt}>*Мнения можно оставлять раз в день </p>
      </div>
    </div>
  )
}

export default WaitPopup