import React, {useState} from "react"
import {useParams} from "react-router-dom"
import {useTranslation} from 'react-i18next'
import {connect} from "react-redux"
import AppBar from "../appbar/AppBar"
import styles from "./styles.module.css"
import {Helmet} from "react-helmet";
import instagramIcon from '../../img/social/instagram.svg'
import twitterIcon from '../../img/social/twitter.svg'
import background from '../../img/avatarBackground.svg'
import { toast, ToastContainer } from 'react-toastify';
import Navbar from "../navbar/Navbar"

const Profile = ({auth}) => {
  const params = useParams()
  const {t} = useTranslation()

  const copyLink = () => {
    navigator.clipboard.writeText(`https://tell-opinion.com/${auth?.user?.login}`)

    toast.success(`${t('linkCopied')}`, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }

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
          <div className={styles.shareLinkAdvice} onClick={copyLink}>
            <p>Share you link for get more opinions</p>
            <div className={styles.shareLink}>
              <span>https://tell-opinion.com/{auth?.user?.login}</span>
            </div>
          </div>
          {/*<div className={styles.socialItems}>*/}
          {/*  <img src={instagramIcon} className={styles.icon} />*/}
          {/*  <img src={twitterIcon} />*/}
          {/*</div>*/}
        </div>
      </main>
      <ToastContainer />
      <Navbar />
    </div>
  )
}

const mapStateToProps = state => ({
  auth: state.auth,
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