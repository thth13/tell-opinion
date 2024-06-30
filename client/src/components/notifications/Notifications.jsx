import React, {useEffect} from "react"
import {useParams} from "react-router-dom"
import {connect} from "react-redux"
import AppBar from "../appbar/AppBar"
import styles from "./styles.module.css"
import {Helmet} from "react-helmet";
import Navbar from "../navbar/Navbar"
import {getNotifications} from "../../actions/profile"
import { ToastContainer } from 'react-toastify';
import OpinionItem from "./OpinionItem"

const Notifications = ({getNotifications, auth, notifications}) => {
  const params = useParams()

  useEffect(() => {
    if (auth.user) {
      getNotifications(auth.user._id)
    }
  }, [auth])

  return (
    <div>
      <Helmet>
        <title>Tell Opinion</title>
        <meta
          name="og:description"
          content={`Leave an anonymous opinion to user ${params.username}`}
        />
        <meta property="og:title" content="Notifications" />
      </Helmet>
      <AppBar />
      <main>
        <div className={styles.container}>
          <h3 className={styles.headText}>You have {notifications.length} new notifications</h3>
          {notifications && notifications.map(item => (
            <OpinionItem key={item.date} item={item} />
          ))}
        </div>
      </main>
      <Navbar />
      <ToastContainer />
    </div>
  )
}

const mapStateToProps = state => ({
  auth: state.auth,
  notifications: state.profile.notifications,
  profile: state.profile.profile
  // error: state.profile.error,
})

export default connect(mapStateToProps, {
  getNotifications
})(Notifications)