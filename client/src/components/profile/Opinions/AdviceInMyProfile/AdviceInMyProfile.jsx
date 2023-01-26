import React from "react"
import styles from "./styles.module.css"

const AdviceInMyProfile = ({name, setIsShowAdviceInMyProfile, login}) => {
  const closeAdvice = () => {
    setIsShowAdviceInMyProfile(false)
  }

  return (
    <div className={styles.adviceInMyProfile}>
      <button className={styles.closeAdviceButton} onClick={closeAdvice}></button>
      {name && <span className={styles.adviceName}>{name}, </span>}
      {name ? 't' : 'T'}o receive opinions, share a link to your account in social networks
      <span className={styles.link}>Your link: https://tell-opinion.com/{login}</span>
    </div>
  )
}

export default AdviceInMyProfile