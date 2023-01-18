import React, { useState } from "react"
import styles from "./styles.module.css"

const OpinionForm = ({newOpinion, profile, setIsShowThanksPopup}) => {
  const [opinionText, setOpinionText] = useState('')

  const onChange = e => {
    setOpinionText(e.target.value)
  }

  const onSubmit = e => {
    e.preventDefault()

    newOpinion(profile._id, opinionText)
    setIsShowThanksPopup(true)
  }

  return (
    <form className={styles.opinionForm} onSubmit={onSubmit}>
      <textarea className={styles.opinionField} value={opinionText} onChange={onChange} placeholder="Leave your opinion (It's completely anonymous)"></textarea>
      <button className={styles.opinionSubmitButton}>Send</button>
    </form>
  )
}

export default OpinionForm