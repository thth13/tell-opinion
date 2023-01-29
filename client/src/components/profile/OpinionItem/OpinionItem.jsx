import React, {useState} from "react"
import {useParams} from "react-router-dom"
import {addAnswer} from "../../../actions/profile"
import {connect} from "react-redux"
import styles from "./styles.module.css"
import moment from "moment"

const OpinionItem = ({addAnswer, item, auth: {user}}) => {
  const params = useParams()
  const [handleAddAnswer, setHandleAddAnswer] = useState(false)
  const [answerText, setAnswerText] = useState('')
  const [isMyProfile] = useState(user && user.login === params.username)

  const setAddAnswer = () => setHandleAddAnswer(!handleAddAnswer)

  const onChange = e => {
    setAnswerText(e.target.value)
  }

  const onSubmit = e => {
    e.preventDefault()

    addAnswer(item._id, answerText)
    setHandleAddAnswer(false)
  }
  console.log(item)
  return (
    <div key={item.date} className={styles.opinionItem}>
      <span className={styles.opinionDate}>{moment(item.date).fromNow()}</span>
      <p className={styles.opinionBody}>{item.text}</p>
      {item.answer && <p className={styles.opinionAnswer}>{item.answer}</p>}
      
      {!item.answer && isMyProfile && (
        <>
          {!handleAddAnswer && <button className={styles.addAnswerButton} onClick={setAddAnswer}>Add answer</button>}
          {handleAddAnswer && (
            <form onSubmit={onSubmit} className={styles.answerForm}>
              <input
                className={styles.field}
                value={answerText}
                onChange={onChange}
                placeholder="Enter your answer"
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