import React from "react"
import styles from "./styles.module.css"

const AdviceInMyProfile = ({name, setIsShowAdviceInMyProfile}) => {
  const closeAdvice = () => {
    setIsShowAdviceInMyProfile(false)
  }

  return (
    <div className={styles.adviceInMyProfile}>
      <button className={styles.closeAdviceButton} onClick={closeAdvice}></button>
      {name && <span className={styles.adviceName}>{name}, </span>}
      {name ? 't' : 'T'}o get more opinions, share the site on social networks.
    </div>
  )
}

export default AdviceInMyProfile