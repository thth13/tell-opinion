import React from "react"
import { useEffect } from "react"
import {useTranslation} from 'react-i18next'
import styles from "./styles.module.css"

const ThanksPopup = ({isShowThanksPopup, setIsShowThanksPopup}) => {
  const {t} = useTranslation()

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
        <h2 className={styles.title}>{t('thanksForYourOpinion')}</h2>
        <p className={styles.prompt}>{t('opinionsOnceADay')}</p>
      </div>
    </div>
  )
}

export default ThanksPopup