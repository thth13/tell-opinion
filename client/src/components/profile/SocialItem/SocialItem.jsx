import React from "react"
import styles from "./styles.module.css"
import c from "classnames"

const SocialItem = ({socialName, socialProperty}) => {
  const link = socialName === ('facebook' || 'youtube') ? socialProperty : `https://www.${socialName}.com/${socialProperty}`

  return (
    <a target="_blank" rel="noreferrer" href={link}>
      <button className={c(styles.socialbtn, styles[socialName])}></button>
    </a>
  )
}

export default SocialItem