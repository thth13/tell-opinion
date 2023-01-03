import api from '../utils/api'
import {
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGOUT,
  GET_ERORRS,
  RESTORE_PASSWORD
} from './types'

export const loadUser = () => async dispatch => {
  try {
    const res = await api.get('/auth')

    dispatch({
      type: USER_LOADED,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    })
  }
}

export const registerUser = formData => async dispatch => {
  try {
    const res = await api.post('/users', formData)
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    })

    dispatch(loadUser())
  } catch (err) {
    dispatch({
      type: GET_ERORRS,
      payload: err.response.data
    })
  }
}

export const resetPassword = (formData, token, navigate) => async dispatch => {
  try {
    await api.post(`/auth/reset/${token}`, formData)

    navigate('/login')
  } catch (err) {
    dispatch({
      type: GET_ERORRS,
      payload: err.response.data
    })
  }
}

export const restorePassword = data => async dispatch => {
  try {
    await api.post('/auth/recover', data)

    dispatch({type: RESTORE_PASSWORD})
  } catch (err) {
    dispatch({
      type: GET_ERORRS,
      payload: err.response.data
    })
  }
}

export const changePassword = (formData, navigate) => async dispatch => {
  try {
    await api.put('auth/changepassword', formData)
    navigate('/')
  } catch (err) {
    dispatch({
      type: GET_ERORRS,
      payload: err.response.data
    })
  }
}

export const loginUser = formData => async dispatch => {
  try {
    const res = await api.post('/auth', formData)

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    })

    dispatch(loadUser())
  } catch (err) {
    dispatch({
      type: GET_ERORRS,
      payload: err.response.data
    })
  }
}

export const googleLoginUser = token => async dispatch => {
  try {
    const res = await api.post('/auth/google', {token})

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    })

    dispatch(loadUser())
  } catch (err) {
    dispatch({
      type: GET_ERORRS,
      payload: err.response.data
    })
  }
}

export const logoutsUser = () => ({type: LOGOUT})