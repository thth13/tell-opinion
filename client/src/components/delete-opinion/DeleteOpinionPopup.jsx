import React from "react"
import c from 'classnames'
import {connect} from 'react-redux'
import {useTranslation} from 'react-i18next'
import {deleteOpinion} from "../../actions/profile"
import styles from "./styles.module.css"

const DeleteOpinionPopup = ({opinionId, deleteOpinion, setHandleDeleteOpinionPopup}) => {
  const {t} = useTranslation()
  
  const confirmDelete = () => {
    deleteOpinion(opinionId)

    setHandleDeleteOpinionPopup(false)
  }

  const closePopup = () => setHandleDeleteOpinionPopup(false)
  
  return (
    <div className={styles.popupWrapper}>
      <div className={styles.popup}>
        <p>{t('areYouSure')}</p>
        <div className={styles.buttonsWrapper}>
          <button className={styles.button} onClick={confirmDelete}>{t('yes')}</button>
          <button
            className={c(styles.button, styles.cancelButton)}
            onClick={closePopup}
          >
            {t('cancel')}
          </button>
        </div>

        {/* <h2 className={styles.title}>
          You have already left the opinion of this user today.
          <br/>Try tomorrow.
         </h2>
        <p className={styles.prompt}>*Opinions can be posted once a day </p> */}
      </div>
    </div>
  )
}

export default connect(null, {deleteOpinion})(DeleteOpinionPopup)