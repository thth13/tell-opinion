import React from "react"
import styles from "./styles.module.css"

let WaitPopup = () => {
  return (
    <div className={styles.popupWrapper}>
      <div className={styles.popup}>
        <h2 className={styles.title}>
          You have already left the opinion of this user today.
          <br/>Try tomorrow.
         </h2>
        <p className={styles.prompt}>*Opinions can be posted once a day </p>
      </div>
    </div>
  )
}

export default WaitPopup