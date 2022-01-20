import React, {useEffect} from 'react'
import c from 'classnames'
import styles from "./styles.module.css"
import {useParams} from "react-router-dom"
import {connect} from 'react-redux'
import {getCurrentProfile, getProfileByName} from '../../actions/profile'
import noAvatar from '../../img/noAvatar.png'
// TODO: Убрать стили по тегам, сделать по классам
const Profile = ({
  getCurrentProfile,
  getProfileByName,
  auth: {user},
  profile: {profile},
}) => {
  let params = useParams()
  const isMyProfile = user && user.login === params.username

  useEffect(() => {
    if (user && user.login === params.username) {
      getCurrentProfile()
    } else {
      getProfileByName(params.username)
    }
  }, [getCurrentProfile, getProfileByName, params, user])

  return (
    <div className={styles.body}>
      <header className={styles.header}>
        {isMyProfile && <span className={styles.views}>32 views</span>}
        <img src={noAvatar} alt="avatar" className={styles.avatar} />
        <h2 className={styles.userName}>Melanie Pasley</h2>
        <span>@{profile && profile.user.login}</span>
        <span>{profile && profile.description}</span>
        <h3 className={styles.opinionCounter}>{profile && profile.reviews.length} opinions</h3>
        <div className={styles.socialButtons}>
          <button className={c(styles.socialbtn, styles.ggl)}></button>
          <button className={c(styles.socialbtn, styles.instg)}></button>
        </div>
      </header>
      <section>
        {!isMyProfile && (
          <>
            <textarea placeholder="Tell your opinion"></textarea>
            <button>Send</button>
          </>
        )}
        {profile && profile.reviews.length < 1 && <p className={styles.noReviews}>You don't have any reviews</p>}
        {profile && profile.reviews.map(item => (
          <div className={styles.revblock}>
            <span>{item.date}2 days ago</span>
            <p>{item.text}</p>
          </div>
        ))}
        <div className={styles.revblock}>
          {/* <span className={styles.auth}>Anonymous</span> */}
          <span>2 days ago</span>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
            {/* <div className={styles.opinionBlock}>
              <span className={styles.confirmed}>Confirmed by Melanie</span>
              <img src="plus.svg" alt="plusIcon" className={styles.kek} />
              <a href="/">Report</a>
            </div> */}
        </div>
      </section>
    </div>
  )
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
})

export default connect(mapStateToProps, {getCurrentProfile, getProfileByName})(Profile)
