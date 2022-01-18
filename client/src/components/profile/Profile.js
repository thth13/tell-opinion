import React, {useEffect} from 'react'
import {useParams} from "react-router-dom";
import {connect} from 'react-redux'
import {getCurrentProfile, getProfileByName} from '../../actions/profile'

const Profile = ({
  getCurrentProfile,
  getProfileByName,
  auth: {user},
  profile: {profile},
}) => {
  let params = useParams();
  // TODO: Сделать проверку свой чужой профиль
  useEffect(() => {
    if (params.username) {
      getProfileByName(params.username)
    } else {
      getCurrentProfile()
    }
  }, [getCurrentProfile, getProfileByName, params])


  return (
    <h1>asd</h1>
  )
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
})

export default connect(mapStateToProps, {getCurrentProfile, getProfileByName})(Profile)
