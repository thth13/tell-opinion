import React from "react"
import c from "classnames"
import styles from "./styles.module.css"
import noAvatar from "../../../img/noAvatar.png"
import SocialItem from "../SocialItem/SocialItem"
import { Link } from "react-router-dom"

const ProfileInfo = ({
  profile, isMyProfile, opinionsLength
}) => {
  const isShowLine = (profile && profile.social) && (
    profile.social.facebook 
    || profile.social.instagram 
    || profile.social.twitter 
    || profile.social.youtube) ? true : false

  return (
    <section className={c(styles.info, styles.section)}>
      <div className={styles.avatarContainer}>
        <div className={styles.avatarWrapper}>
          <img 
            src={profile && profile.avatar ? `https://spaces.tell-opinion.com/${profile.avatar}` : noAvatar}
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
          {profile && profile.social && Object.keys(profile.social).map(key => profile.social[key] && (
            <SocialItem key={key} socialName={`${key}`} socialProperty={profile.social[key]} />
          ))}
        </div>
        {isShowLine && <span className={styles.dividingLine}></span>}
        <div className={styles.opinionCount}>{opinionsLength} opinions</div>
      </div>
      {isMyProfile && <Link to="/editProfile">
        <button className={c(styles.editProfileBtton, styles.editProfileBttonWide)}>Редактировать профиль</button>
      </Link>}
    </section>
  )
}

export default ProfileInfo