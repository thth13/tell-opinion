import React from "react"
import { useEffect } from "react"
import styles from "./styles.module.css"

const ThanksPopup = ({isShowThanksPopup, setIsShowThanksPopup}) => {
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
        <h2 className={styles.title}>Thank you for your opinion!</h2>
        <p className={styles.prompt}>*Opinions can be posted once a day</p>
      </div>
    </div>
  )
}

export default ThanksPopup