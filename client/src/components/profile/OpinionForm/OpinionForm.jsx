import React, { useState } from "react"
import {useTranslation} from 'react-i18next'
import styles from "./styles.module.css"

const OpinionForm = ({newOpinion, profile, setIsShowThanksPopup}) => {
  const {t} = useTranslation()
  const [opinionText, setOpinionText] = useState('')

  const onChange = e => {
    setOpinionText(e.target.value)
  }

  const onSubmit = e => {
    e.preventDefault()

    newOpinion(profile._id, opinionText)
    setOpinionText('')
    setIsShowThanksPopup(true)
  }

  return (
    <form className={styles.opinionForm} onSubmit={onSubmit}>
      <textarea
        className={styles.opinionField}
        value={opinionText}
        onChange={onChange}
        placeholder={t('leaveYourOpinion')}
      >  
      </textarea>
      <button className={styles.opinionSubmitButton}>{t('send')}</button>
    </form>
  )
}

export default OpinionForm