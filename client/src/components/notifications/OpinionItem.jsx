import React, {useState, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import {addAnswer} from '../../actions/profile'
import DeleteOpinionPopup from '../delete-opinion/DeleteOpinionPopup'
import EditIcon from '@skbkontur/react-icons/Edit'
import TrashIcon from '@skbkontur/react-icons/Trash'
import {useTranslation} from 'react-i18next'
import c from 'classnames'
import {connect} from 'react-redux'
import styles from './styles.module.css'
import moment from 'moment'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import answerIcon from '../../img/answer-icon.svg'

const OpinionItem = ({addAnswer, profile, item, auth: {user}}) => {
  const {t} = useTranslation()
  const [handleAddAnswer, setHandleAddAnswer] = useState(false)
  const [answerText, setAnswerText] = useState('')
  // const [isMyProfile, setIsMyProfile] = useState(false)
  const [handleDeleteOpinionPopup, setHandleDeleteOpinionPopup] = useState(false)

  const setAddAnswer = () => setHandleAddAnswer(!handleAddAnswer)

  const onChange = e => {
    setAnswerText(e.target.value)
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    if (answerText) {
      await addAnswer(item._id, answerText)
      toast.success(`🦄 ${t('success')}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    }

    setHandleAddAnswer(false)
  }

  // const deleteOpinion = () => {
  //   setHandleDeleteOpinionPopup(true)
  //   Toast.push('Success')
  // }

  return (
    <div className={styles.opinionItem}>
      <div className={styles.opinionInfo}>
        <div>
          <div className={styles.headOpinion}>
            <span className={styles.opinionDate}>{moment(item.date).fromNow()}</span>
          </div>
          <p className={styles.opinionBody}>{item.text}</p>
        </div>
        {!handleAddAnswer && <button onClick={setAddAnswer}><img src={answerIcon} /></button>}
      </div>
      {handleAddAnswer && (
        <form onSubmit={onSubmit} className={styles.answerForm}>
          <textarea
            className={styles.field}
            value={answerText}
            onChange={onChange}
            placeholder={t('enterYourAnswer')}
            autoFocus
          />
          <div className={styles.buttonsBlock}>
            <button onClick={setAddAnswer} className={c(styles.cancelButton, styles.sendButton)}>{t('cancel')}</button>
            <button type='submit' className={styles.sendButton}>{t('send')}</button>
          </div>
        </form>
      )}
      <ToastContainer />
    </div>
  )
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
})

export default connect(mapStateToProps, {addAnswer})(OpinionItem)