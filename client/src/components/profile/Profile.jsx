import React, { useEffect, useState } from "react"
import moment from "moment"
import { useParams } from "react-router-dom"
import { connect } from "react-redux"
import AppBar from "../appbar/AppBar"
import { getCurrentProfile, getProfileByName, newOpinion, loadMoreOpinions } from "../../actions/profile"
import styles from "./styles.module.css"
import ThanksPopup from "../thanks-popup/ThanksPopup"
import ProfileInfo from "./ProfileInfo/ProfileInfo"
import ProfileInfoSkeleton from "./ProfileInfo/ProfileInfoSkeleton"
import Opinions from "./Opinions/Opinions"
import { Helmet } from "react-helmet";
import Navbar from "../navbar/Navbar"
import OpinionsSkeleton from "./Opinions/OpinionsSkeleton"

const Profile = ({
  getCurrentProfile,
  getProfileByName,
  newOpinion,
  loadMoreOpinions,
  auth: { user },
  profile,
  opinions,
  opinionsLength,
  loading
}) => {
  const params = useParams()
  const [isMyProfile, setIsMyProfile] = useState(false)
  const [userOpinionInfo, setUserOpinionInfo] = useState()
  const [isShowThanksPopup, setIsShowThanksPopup] = useState(false)

  const loadMore = () => {
    loadMoreOpinions(profile._id, opinions.length);
  }

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

  useEffect(() => {
    if (user && user.login === params.username) {
      getCurrentProfile()
    } else {
      getProfileByName(params.username)
    }
  }, [params.username])

  return (
    <div>
      <Helmet>
        {user && <title>{params.username} | Tell Opinion</title>}
        <meta
          name="og:description"
          content={`Leave an anonymous opinion to user ${params.username}`}
        />
        <meta property="og:title" content={`${params.username} | Tell Opinion`} />
      </Helmet>
      <AppBar />
      <main>
        <div className={styles.container}>
          {loading && !profile ? (
            <>
              <ProfileInfoSkeleton />
              <OpinionsSkeleton />
            </>
          ) : (
            <>
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
            </>
          )}
          {/* {(error && error.msg) &&
            <h1 className={styles.errorMessage}>{error.msg}</h1>
          } */}
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
      <Navbar />
    </div>
  )
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile.profile,
  loading: state.profile.loading,
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