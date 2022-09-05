import React from "react"
import styles from "./styles.module.css"
import moment from "moment"


const OpinionItem = ({item}) => {
  return (
    <div key={item.date} className={styles.opinionItem}>
      <span className={styles.opinionDate}>{moment(item.date).fromNow()}</span>
      <p className={styles.opinionBody}>{item.text}</p>
    </div>
  )
}

export default OpinionItem