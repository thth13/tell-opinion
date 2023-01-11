import React, {useEffect, useState} from "react"
import moment from "moment"
import {useParams} from "react-router-dom"
import {connect} from "react-redux"
import AppBar from "../appbar/AppBar"
import {getCurrentProfile, getProfileByName, newOpinion, loadMoreOpinions} from "../../actions/profile"
import styles from "./styles.module.css"
import ThanksPopup from "../thanks-popup/ThanksPopup"
import ProfileInfo from "./ProfileInfo/ProfileInfo"
import Opinions from "./Opinions/Opinions"
import MetaTags from 'react-meta-tags'
import previewImage from "../../img/previewImage.png"

const Profile = ({
  getCurrentProfile, getProfileByName, newOpinion, loadMoreOpinions,
  auth: {user},
  profile,
  error,
  opinions,
  opinionsLength
}) => {
  const params = useParams()
  const [isMyProfile, setIsMyProfile] = useState(false)
  const [userOpinionInfo, setUserOpinionInfo] = useState()
  const [isShowThanksPopup, setIsShowThanksPopup] = useState(false)

  const loadMore = () => {
    loadMoreOpinions(profile._id, opinions.length);
  }

  useEffect(() => {
    if (user && user.login === params.username) {
      getCurrentProfile()
    } else {
      getProfileByName(params.username)
    }
  }, [getCurrentProfile, getProfileByName, params, user])

  useEffect(() => {
    if (opinions) {
      setUserOpinionInfo(JSON.parse(localStorage.getItem(`opinion#${profile && profile._id}`)))
    }
  }, [opinions, setUserOpinionInfo])

  useEffect(() => {
    setIsMyProfile(user && user.login === params.username)
  }, [user, setIsMyProfile, params.username])

  const isOneDayAfter = 
    userOpinionInfo ?
    moment().isAfter(moment(userOpinionInfo.date).add(1, 'day')) : true

  return (
    <div>
      <MetaTags>
        {user && <title>{params.username} | Tell Opinion</title>}
        <meta
          name="og:description"
          content={`Leave an anonymous opinion to user ${params.username}`}
        />
        <meta property="og:title" content={`${params.username} | Tell Opinion`} />
      </MetaTags>
      <AppBar />
      <main>
        <div className={styles.container}>
          <ProfileInfo
            profile={profile}
            isMyProfile={isMyProfile} 
            opinions={opinions}
            opinionsLength={opinionsLength}
          />
          <Opinions
            profile={profile}
            opinions={opinions} 
            newOpinion={newOpinion}
            isMyProfile={isMyProfile}
            isOneDayAfter={isOneDayAfter}
            setIsShowThanksPopup={setIsShowThanksPopup}
            opinionsLength={opinionsLength}
            loadMore={loadMore}
          />
          {(error && error.msg) && 
            <h1 className={styles.errorMessage}>{error.msg}</h1>
          }
        </div>
      </main>
      {isShowThanksPopup && 
        <ThanksPopup 
          isShowThanksPopup={isShowThanksPopup}
          setIsShowThanksPopup={setIsShowThanksPopup} 
        />
      }
      {/* {!isOneDayAfter && userOpinionInfo  && (
        <WaitPopup/>
      )} */}
    </div>
  )
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile.profile,
  error: state.profile.error,
  opinions: state.profile.opinions,
  opinionsLength: state.profile.opinionsLength
})

export default connect(mapStateToProps, {
  getCurrentProfile, 
  getProfileByName, 
  newOpinion,
  loadMoreOpinions
})(Profile)