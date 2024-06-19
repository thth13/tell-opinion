import React from "react"
import {useParams} from "react-router-dom"
import {connect} from "react-redux"
import AppBar from "../appbar/AppBar"
import styles from "./styles.module.css"
import {Helmet} from "react-helmet";
import background from '../../img/avatarBackground.svg'
import Navbar from "../navbar/Navbar"

const Profile = ({profile}) => {
  const params = useParams()

  return (
    <div>
      <Helmet>
        <title>Tell Opinion</title>
        <meta
          name="og:description"
          content={`Leave an anonymous opinion to user ${params.username}`}
        />
        <meta property="og:title" content={`${params.username} | Tell Opinion`} />
      </Helmet>
      <AppBar />
      <main>
        <div className={styles.container}>
          <img className={styles.background} src={background} alt={'Background'} />
          <div className={styles.shareLinkAdvice}>
            <p>Share you link for get more opinions</p>
            <div className={styles.shareLink}>
              <span>https://tell-opinion.com/thth13</span>
            </div>
          </div>
        </div>
      </main>
      <Navbar avatar={profile?.avatar} />
    </div>
  )
}

const mapStateToProps = state => ({
  // auth: state.auth,
  profile: state.profile.profile,
  // error: state.profile.error,
  // opinions: state.profile.opinions,
  // opinionsLength: state.profile.opinionsLength
})

export default connect(mapStateToProps, {
  // getCurrentProfile, 
  // getProfileByName, 
  // newOpinion,
  // loadMoreOpinions
})(Profile)