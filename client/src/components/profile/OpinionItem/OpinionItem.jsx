import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {addAnswer} from '../../../actions/profile'
import DeleteOpinionPopup from '../../delete-opinion/DeleteOpinionPopup'
import EditIcon from '@skbkontur/react-icons/Edit'
import TrashIcon from '@skbkontur/react-icons/Trash'
import {useTranslation} from 'react-i18next'
import { MenuItem, Toast, Kebab } from '@skbkontur/react-ui'
import {connect} from 'react-redux'
import styles from './styles.module.css'
import moment from 'moment'

const OpinionItem = ({addAnswer, profile, item, auth: {user}}) => {
  const {t} = useTranslation()
  const [handleAddAnswer, setHandleAddAnswer] = useState(false)
  const [answerText, setAnswerText] = useState('')
  const [isMyProfile, setIsMyProfile] = useState(false)
  const [handleDeleteOpinionPopup, setHandleDeleteOpinionPopup] = useState(false)

  const setAddAnswer = () => setHandleAddAnswer(!handleAddAnswer)

  const onChange = e => {
    setAnswerText(e.target.value)
  }

  const onSubmit = e => {
    e.preventDefault()

    if (answerText) {
      addAnswer(item._id, answerText)
    }    
    setHandleAddAnswer(false)
  }

  const deleteOpinion = () => {
    setHandleDeleteOpinionPopup(true)
    // Toast.push(t('deleted'))
  }

  useEffect(() => {
    if (user && user.login ===  profile.profile.login) {
      setIsMyProfile(true)
    }
  }, [user, profile])

  return (
    <div key={item.date} className={styles.opinionItem}>
      <div className={styles.headOpinion}>
        <span className={styles.opinionDate}>{moment(item.date).fromNow()}</span>
        {handleDeleteOpinionPopup && 
          <DeleteOpinionPopup
            opinionId={item._id}
            setHandleDeleteOpinionPopup={setHandleDeleteOpinionPopup}
          />
        }
        {isMyProfile && 
          <Kebab size='medium'>
           {/* <MenuItem icon={<EditIcon />} onClick={() => Toast.push('Отредактировано')}>
             Report
           </MenuItem> */}
           <MenuItem
             icon={<TrashIcon />}
             onClick={deleteOpinion}
           >
             {t('delete')}
           </MenuItem>
          </Kebab>
        }
    </div>
      <p className={styles.opinionBody}>{item.text}</p>
      {item.answer && <p className={styles.opinionAnswer}>{item.answer}</p>}
      
      {!item.answer && isMyProfile && (
        <>
          {!handleAddAnswer && 
            <div className={styles.addAnswerButtonWrapper}>
              <button className={styles.addAnswerButton} onClick={setAddAnswer}>{t('addAnswer')}</button>
              </div>
            }
          {handleAddAnswer && (
            <form onSubmit={onSubmit} className={styles.answerForm}>
              <input
                className={styles.field}
                value={answerText}
                onChange={onChange}
                placeholder={t('enterYourAnswer')}
                autoFocus
              />
              <button type='submit' className={styles.sendButton}>{t('send')}</button>
            </form>
          )}
        </>
      )}
    </div>
  )
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
})

export default connect(mapStateToProps, {addAnswer})(OpinionItem)