import React, {useEffect, useState} from "react"
import c from "classnames"
import moment from "moment"
import {Link, useParams} from "react-router-dom"
import {connect} from "react-redux"
import AppBar from "../appbar/AppBar"
import {getCurrentProfile, getProfileByName, newOpinion} from "../../actions/profile"
import styles from "./styles.module.css"
import noAvatar from "../../img/noAvatar.png"
import ThanksPopup from "../thanks-popup/ThanksPopup"
import WaitPopup from "../wait-popup/WaitPopup"

let Profile = ({
  getCurrentProfile, getProfileByName, newOpinion,
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

  let isShowLine = (profile && profile.social && ((
    profile.social.facebook 
    && profile.social.instagram 
    && profile.social.twitter 
    && profile.social.youtube) === null)) ? true : false
  
  
  return (
    <div>
      <WaitPopup/>
      {/* <ThanksPopup/> */}
      <AppBar /> 
      <main>
        <div className={styles.container}>
          <section className={c(styles.info, styles.section)}>
            <div className={styles.avatarContainer}>
              <div className={styles.avatarWrapper}>
                <img 
                  src={profile && profile.avatar ? `avatars/${profile.avatar}` : noAvatar}
                  alt="avatar" 
                  className={styles.avatar}
                />
              </div>
            </div>
            <h1 className={styles.name}>{profile && profile.name && profile.name}</h1>
            <h3 className={styles.nickName}>@{profile && profile.user.login}</h3>
            <p className={styles.description}>{profile && profile.description}</p>
            {isMyProfile && <Link to="/editProfile">
              <button className={c(styles.editProfileBtton, styles.editProfileBttonNarrow)}>Редактировать профиль</button>
            </Link>}
            <div className={styles.contacts}>
              <div className="infoSocial">
                {profile && profile.social.google && (
                  <a target="_blank" rel="noreferrer" href={`https://www.google.com/${profile.social.google}`}>
                    <button className={c(styles.socialbtn, styles.google)}></button>
                  </a>
                )}
                {profile && profile.social.twitter && (
                  <a target="_blank" rel="noreferrer" href={`https://twitter.com.com/${profile.social.twitter}`}>
                    <button className={c(styles.socialbtn, styles.tw)}></button>
                  </a>
                )}
                {profile && profile.social.instagram && (
                  <a target="_blank" rel="noreferrer" href={`https://www.instagram.com/${profile.social.instagram}`}>
                    <button className={c(styles.socialbtn, styles.instg)}></button>
                  </a>
                )}
                {profile && profile.social.facebook && (
                  <a target="_blank" rel="noreferrer" href={`https://www.facebook.com/${profile.social.facebook}`}>
                    <button className={c(styles.socialbtn, styles.fb)}></button>
                  </a>
                )}
                {profile && profile.social.youtube && (
                  <a target="_blank" rel="noreferrer" href={`https://www.youtube.com/${profile.social.youtube}`}>
                    <button className={c(styles.socialbtn, styles.yt)}></button>
                  </a>
                )}                
              </div>
              {!isShowLine && <span className={styles.dividingLine}></span>}
              <div className={styles.opinionCount}>{profile && profile.opinions.length} opinions</div>
            </div>
            {isMyProfile && <Link to="/editProfile">
              <button className={c(styles.editProfileBtton, styles.editProfileBttonWide)}>Редактировать профиль</button>
            </Link>}
          </section>
          <section className={c(styles.opinions, styles.section)}>
            <h2 className={styles.opinionsTitle}>Мнения</h2>
            <div className="opinionBox">
            {!isOneDayAfter && userOpinionInfo  && (
              <WaitPopup/>
            )}
            </div>
            <div className={styles.opinionItemsContainer}>
              {profile && profile.opinions.length < 1 && 
                <p className={styles.noOpinions}>
                  {isMyProfile ? 'You dont have any opinions' : 'User has no opinions'}
                </p>
              }
              {profile && profile.opinions.map(item => (
                <div key={item.date} className={styles.opinionItem}>
                  <span className={styles.opinionDate}>{moment(item.date).fromNow()}</span>
                  <p className={styles.opinionBody}>{item.text}</p>
                </div>
              ))}
            </div>
            {!isMyProfile && isOneDayAfter && (
              <form className={styles.opinionForm} onSubmit={onSubmit}>
                <textarea className={styles.opinionField} value={opinionText} onChange={onChange} placeholder="Оставьте свое мнение(Это абсолютно анонимно)"></textarea>
                <button className={styles.opinionSubmitButton}>Send</button>
              </form>
            )}
            {isMyProfile && (
              <p className={styles.advice}>
                <span className={styles.adviceName}>{profile && profile.name && profile.name}</span>, 
                чтобы получать больше мнений, 
                делитесь сайтом в соц.сетях.
              </p>
            )}
          </section>
        </div>
      </main>
    </div>
  )
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
})

export default connect(mapStateToProps, {
  getCurrentProfile, 
  getProfileByName, 
  newOpinion})(Profile)