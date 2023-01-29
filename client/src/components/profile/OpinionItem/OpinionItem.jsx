import React, {useState} from 'react'
import {useParams} from 'react-router-dom'
import {addAnswer} from '../../../actions/profile'
import DeleteOpinionPopup from '../../delete-opinion/DeleteOpinionPopup'
import EditIcon from '@skbkontur/react-icons/Edit'
import TrashIcon from '@skbkontur/react-icons/Trash'
import { MenuItem, Toast, Kebab } from '@skbkontur/react-ui'
import {connect} from 'react-redux'
import styles from './styles.module.css'
import moment from 'moment'

const OpinionItem = ({addAnswer, item, auth: {user}}) => {
  const params = useParams()
  const [handleAddAnswer, setHandleAddAnswer] = useState(false)
  const [answerText, setAnswerText] = useState('')
  const [isMyProfile] = useState(user && user.login === params.username)
  const [handleDeleteOpinionPopup, setHandleDeleteOpinionPopup] = useState(false)

  const setAddAnswer = () => setHandleAddAnswer(!handleAddAnswer)

  const onChange = e => {
    setAnswerText(e.target.value)
  }

  const onSubmit = e => {
    e.preventDefault()

    addAnswer(item._id, answerText)
    setHandleAddAnswer(false)
  }

  const deleteOpinion = () => {
    setHandleDeleteOpinionPopup(true)
    // Toast.push('Deleted')
  }

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
        <Kebab size='medium'>
        {/* <MenuItem icon={<EditIcon />} onClick={() => Toast.push('Отредактировано')}>
          Report
        </MenuItem> */}
        <MenuItem
          icon={<TrashIcon />}
          onClick={deleteOpinion}
        >
          Delete
        </MenuItem>
      </Kebab>
    </div>
      <p className={styles.opinionBody}>{item.text}</p>
      {item.answer && <p className={styles.opinionAnswer}>{item.answer}</p>}
      
      {!item.answer && isMyProfile && (
        <>
          {!handleAddAnswer && 
            <div className={styles.addAnswerButtonWrapper}>
              <button className={styles.addAnswerButton} onClick={setAddAnswer}>Add answer</button>
              </div>
            }
          {handleAddAnswer && (
            <form onSubmit={onSubmit} className={styles.answerForm}>
              <input
                className={styles.field}
                value={answerText}
                onChange={onChange}
                placeholder='Enter your answer'
                autoFocus
              />
              <button type='submit' className={styles.sendButton}>Send</button>
            </form>
          )}
        </>
      )}
    </div>
  )
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, {addAnswer})(OpinionItem)