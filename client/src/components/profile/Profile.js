import React, {useEffect, useState} from 'react'
import c from 'classnames'
import moment from 'moment'
import {useParams} from "react-router-dom"
import {connect} from 'react-redux'
import AppBar from '../appbar/AppBar'
import {getCurrentProfile, getProfileByName, newOpinion} from '../../actions/profile'
import styles from "./styles.module.css"
import noAvatar from '../../img/noAvatar.png'

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
  const [isMyProfile, setIsMyProfile] = useState(false)
  const [userOpinionInfo, setUserOpinionInfo] = useState()

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

  useEffect(() => {
    if (profile) {
      setUserOpinionInfo(JSON.parse(localStorage.getItem(`opinion#${profile && profile._id}`)))
    }
  }, [profile, setUserOpinionInfo])

  useEffect(() => {
    setIsMyProfile(user && user.login === params.username)
  }, [user, setIsMyProfile, params.username])

  const isOneDayAfter = 
    userOpinionInfo ?
    moment().isAfter(moment(userOpinionInfo.date).add(1, 'day')) : true
  
  return (
    <div className={styles.body}>
      <AppBar />  
      <header className={styles.header}>
        {/* {isMyProfile && <span className={styles.views}>{profile && profile.views}</span>} */}
        <img 
          // src={noAvatar} 
          src={user.avatar ? user.avatar : noAvatar}
          alt="avatar" 
          className={styles.avatar}
        />
        <h2 className={styles.userName}>{profile && profile.name && profile.name}</h2>
        <span>@{profile && profile.user.login}</span>
        <span>{profile && profile.description}</span>
        <h3 className={styles.opinionCounter}>{profile && profile.opinions.length} opinions</h3>
        <div className={styles.socialButtons}>
          <button className={c(styles.socialbtn, styles.ggl)}></button>
          {/* {profile && profile.social.instagram && (
            <a target="_blank" rel="noreferrer" href={`https://www.instagram.com/${profile.social.instagram}`}>
              <button className={c(styles.socialbtn, styles.instg)}></button>
            </a>
          )} */}
        </div>
      </header>
      <section className={styles.opinionsSection}>
        {!isMyProfile && isOneDayAfter && (
          <form onSubmit={onSubmit}>
            <textarea className={styles.opinionField} value={opinionText} onChange={onChange} placeholder="Tell your opinion"></textarea>
            <button className={styles.submitButton} type="submit">Send</button>
          </form>
        )}
        {!isOneDayAfter && userOpinionInfo  && (
        <div className={styles.thanksOpinionText}>
          <p>Thanks for your opinion</p>
          <p>Opinions can be posted once a day</p>
        </div>
        )}
        {profile && profile.opinions.length < 1 && 
          <p className={styles.noOpinions}>
            {isMyProfile ? 'You dont have any opinions' : 'User has no opinions'}
          </p>
        }
        {profile && profile.opinions.map(item => (
          <div key={item.date} className={styles.revblock}>
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