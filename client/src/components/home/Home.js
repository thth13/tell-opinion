import React from "react"
import {useParams} from "react-router-dom"
import {connect} from "react-redux"
import AppBar from "../appbar/AppBar"
import styles from "./styles.module.css"
import {Helmet} from "react-helmet";

const Profile = ({}) => {
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
          Home page
        </div>
      </main>
    </div>
  )
}

const mapStateToProps = state => ({
  // auth: state.auth,
  // profile: state.profile.profile,
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