import api from '../utils/api'

import {
  GET_PROFILE,
  PROFILE_ERROR,
  NEW_OPINION,
  MORE_OPINIONS,
  GET_APPBAR_INFO
} from './types'

export const getCurrentProfile = isAppBar => async dispatch => {
  try {
    const res = await api.get('/profile/me')
    
    if (isAppBar) {
      dispatch({
        type: GET_APPBAR_INFO,
        payload: res.data
      })
    } else {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    }
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    })
  }
}

export const getProfileByName = username => async dispatch => {
  try {
    const res = await api.get(`/profile/user/${username}`)

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.data.msg,
        status: err.response.status
      }
    })
  }
}

export const editProfile = data => async dispatch => {
  try {
    await api.post(`/profile`, data)
  } catch (err) {
    console.log(err)
  }
}

export const newOpinion = (profileId, text) => async dispatch => {
  try {
    const res = await api.post(`/profile/user/opinion/${profileId}`, {text})
    
    const localOpinionInfo = {
      user: profileId,
      date: new Date()
    }

    localStorage.setItem(`opinion#${profileId}`, JSON.stringify(localOpinionInfo))

    dispatch({
      type: NEW_OPINION,
      payload: res.data
    })
  } catch (err) {
    // TODO: обработка ошибок
    console.log(err)
  }
}

export const loadMoreOpinions = (profileId, opinionsLength) => async dispatch => {
  try {
    const res = await api.get(`/profile/user/moreopinions/${profileId}/${opinionsLength}`)

    dispatch({
      type: MORE_OPINIONS,
      payload: res.data
    })
  } catch (err) {
    console.log(err)
  }
}