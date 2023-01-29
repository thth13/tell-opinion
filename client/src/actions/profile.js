import api from '../utils/api'

import {
  GET_PROFILE,
  PROFILE_ERROR,
  NEW_OPINION,
  MORE_OPINIONS,
  GET_APPBAR_INFO,
  GET_USER_LIST,
  MORE_USERS,
  ADD_ANSWER,
  DELETE_OPINION
} from './types'

export const getCurrentProfile = isAppBar => async dispatch => {
  try {
    const res = await api.get('/profile/me')
    
    dispatch({
      type: GET_APPBAR_INFO,
      payload: res.data
    })

    if (!isAppBar) {
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
    await api.post(`/profile`, data, {headers: {
      'Content-Type': 'multipart/form-data'
    }})
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

export const addAnswer = (opinionId, text) => async dispatch => {
  try {
    const res = await api.post('/profile/addAnswer', {opinionId, text})

    dispatch({
      type: ADD_ANSWER,
      payload: res.data
    })
  } catch (err) {
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

export const deleteOpinion = (id) => async dispatch => {
  try {
    await api.delete(`/profile/deleteOpinion/${id}`)

    dispatch({
      type: DELETE_OPINION,
      payload: id
    })
  } catch (err) {
    console.log(err)
  }
}

export const getUserList = userName => async dispatch => {
  try {
    const res = await api.get(`/users/find/${userName ? userName : undefined}/0`)

    dispatch({
      type: GET_USER_LIST,
      payload: res.data
    })
  } catch (err) {
    console.log(err)
  }
}

export const loadMoreUsers = (userName, usersLength) => async dispatch => {
  try {
    const res = await api.get(`/users/find/${userName ? userName : undefined}/${usersLength}`)

    dispatch({
      type: MORE_USERS,
      payload: res.data
    })
  } catch (err) {
    console.log(err)
  }
}