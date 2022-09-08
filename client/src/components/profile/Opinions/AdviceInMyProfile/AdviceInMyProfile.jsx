import React from "react"
import styles from "./styles.module.css"

const AdviceInMyProfile = ({name, setIsShowAdviceInMyProfile}) => {
  const closeAdvice = () => {
    setIsShowAdviceInMyProfile(false)
  }

  return (
    <div className={styles.adviceInMyProfile}>
      <button className={styles.closeAdviceButton} onClick={closeAdvice}></button>
      <span className={styles.adviceName}>{name}, </span>
      чтобы получать больше мнений, делитесь сайтом в соц.сетях. 
    </div>
  )
}

export default AdviceInMyProfile