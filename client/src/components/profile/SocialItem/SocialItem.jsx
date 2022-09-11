import React from "react"
import styles from "./styles.module.css"
import c from "classnames"

const SocialItem = ({socialName, socialProperty}) => {
  return (
    <a target="_blank" rel="noreferrer" href={`https://www.${socialName}.com/${socialProperty}`}>
      <button className={c(styles.socialbtn, styles[socialName])}></button>
    </a>
  )
}

export default SocialItem