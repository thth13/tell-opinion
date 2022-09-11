import React from "react"
import { useEffect } from "react"
import styles from "./styles.module.css"

let ThanksPopup = ({isShowThanksPopup, setIsShowThanksPopup}) => {
  useEffect(() => {
    const hidePopup = e => {
      if (e.target.className !== styles.popup) {
        setIsShowThanksPopup(false)
      }
    } 

    document.addEventListener('mouseup', hidePopup)

    return document.removeEventListener("click", hidePopup)
  }, [isShowThanksPopup])

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