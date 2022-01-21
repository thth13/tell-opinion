import React, {useEffect, useState} from 'react'
import c from 'classnames'
import styles from "./styles.module.css"
import {useParams} from "react-router-dom"
import {connect} from 'react-redux'
import {getCurrentProfile, getProfileByName, newOpinion} from '../../actions/profile'
import noAvatar from '../../img/noAvatar.png'
import moment from 'moment'

// TODO: Убрать стили по тегам, сделать по классам
const Profile = ({
  getCurrentProfile,
  getProfileByName,
  newOpinion,
  auth: {user},
  profile: {profile},
}) => {
  let params = useParams()
  const [opinionText, setOpinionText] = useState('')
  const [isMyProfile] = useState(user && user.login === params.username)
  const [userOpinionInfo] = useState(JSON.parse(localStorage.getItem(`opinion#${profile && profile._id}`)))

  const onChange = e => {
    setOpinionText(e.target.value)
  }

  const onSubmit = e => {
    e.preventDefault()

    newOpinion(profile._id, opinionText)
  }

  useEffect(() => {
    if (user && user.login === params.username) {
      getCurrentProfile()
    } else {
      getProfileByName(params.username)
    }
  }, [getCurrentProfile, getProfileByName, params, user])

  console.log(userOpinionInfo)
  return (
    <div className={styles.body}>
      <header className={styles.header}>
        {isMyProfile && <span className={styles.views}>{profile && profile.views}</span>}
        <img src={noAvatar} alt="avatar" className={styles.avatar} />
        <h2 className={styles.userName}>{profile && profile.user.name && profile.user.name}</h2>
        <span>@{profile && profile.user.login}</span>
        <span>{profile && profile.description}</span>
        <h3 className={styles.opinionCounter}>{profile && profile.opinions.length} opinions</h3>
        <div className={styles.socialButtons}>
          <button className={c(styles.socialbtn, styles.ggl)}></button>
          <button className={c(styles.socialbtn, styles.instg)}></button>
        </div>
      </header>
      <section>
        {!isMyProfile && (
          <form onSubmit={onSubmit}>
            <textarea value={opinionText} onChange={onChange} placeholder="Tell your opinion"></textarea>
            <button type="submit">Send</button>
          </form>
        )}
        {profile && profile.opinions.length < 1 && <p className={styles.noOpinions}>
        {isMyProfile ? 'You dont have any opinions' : 'User has no opinions'}
        </p>}
        {profile && profile.opinions.map(item => (
          <div className={styles.revblock}>
            <span>{moment(item.date).fromNow()}</span>
            <p>{item.text}</p>
          </div>
        ))}
        {/* <div className={styles.revblock}>
          <span>2 days ago</span>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
        </div> */}
      </section>
    </div>
  )
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
})

export default connect(mapStateToProps, {getCurrentProfile, getProfileByName, newOpinion})(Profile)
