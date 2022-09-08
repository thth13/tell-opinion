import React, {useEffect, useState} from "react"
import c from "classnames"
import moment from "moment"
import {useParams} from "react-router-dom"
import {connect} from "react-redux"
import AppBar from "../appbar/AppBar"
import {getCurrentProfile, getProfileByName, newOpinion} from "../../actions/profile"
import styles from "./styles.module.css"
import ThanksPopup from "../thanks-popup/ThanksPopup"
import WaitPopup from "../wait-popup/WaitPopup"
import ProfileInfo from "./ProfileInfo/ProfileInfo"
import Opinions from "./Opinions/Opinions"

const Profile = ({
  getCurrentProfile, getProfileByName, newOpinion,
  auth: {user},
  profile,
  opinions
}) => {
  const params = useParams()
  const [isMyProfile, setIsMyProfile] = useState(false)
  const [userOpinionInfo, setUserOpinionInfo] = useState()
  const [isShowThanksPopup, setIsShowThanksPopup] = useState(false)

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
      <AppBar /> 
      <main>
        <div className={styles.container}>
          <ProfileInfo profile={profile} isMyProfile={isMyProfile} 
            opinions={opinions} 
          />
          <Opinions profile={profile} opinions={opinions} 
            newOpinion={newOpinion} isMyProfile={isMyProfile} isOneDayAfter={isOneDayAfter}
            setIsShowThanksPopup={setIsShowThanksPopup} 
          />
        </div>
      </main>
      {isShowThanksPopup && <ThanksPopup 
        isShowThanksPopup={isShowThanksPopup} setIsShowThanksPopup={setIsShowThanksPopup} 
      />}
      {/* {!isOneDayAfter && userOpinionInfo  && (
        <WaitPopup/>
      )} */}
    </div>
  )
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile.profile,
  opinions: state.profile.opinions
})

export default connect(mapStateToProps, {
  getCurrentProfile, 
  getProfileByName, 
  newOpinion})(Profile)