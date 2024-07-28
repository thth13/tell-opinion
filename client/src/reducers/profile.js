import {
  GET_PROFILE,
  PROFILE_ERROR,
  NEW_OPINION,
  MORE_OPINIONS,
  GET_APPBAR_INFO,
  GET_USER_LIST,
  MORE_USERS,
  ADD_ANSWER,
  DELETE_OPINION,
  GET_MY_PROFILE,
  GET_NOTIFICATIONS,
  SET_NUMBER_NOTIFICATIONS
} from '../actions/types'

const initialState = {
  profile: null,
  opinions: [],
  notifications: [],
  opinionsLength: 0,
  loading: true,
  numberNotifications: 0,
  name: '',
  avatar: '',
  userList: [],
  error: null,
  myProfile: null,
}

function profileReducer(state = initialState, action) {
  const {type, payload} = action

  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: payload.profile,
        opinions: payload.opinions,
        opinionsLength: payload.opinionsLength,
        error: null,
        loading: false
      }
    case SET_NUMBER_NOTIFICATIONS:
      return {
        ...state,
        numberNotifications: payload
      }
    case GET_MY_PROFILE:
      return {
        ...state,
        myProfile: payload.profile,
        error: null,
        loading: false
      }
    case GET_APPBAR_INFO:
      return {
          ...state,
          name: payload.profile.name,
          avatar: payload.profile.avatar
      }
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        profile: null
      }
    case NEW_OPINION: {
      return {
        ...state,
        opinions: [payload, ...state.opinions],
        loading: false
      }
    }
    case DELETE_OPINION: {
      return {
        ...state,
        opinionsLength: state.opinionsLength--,
        opinions: state.opinions.filter(item => item._id !== action.payload),
      }
    }
    case MORE_OPINIONS: {
      return {
        ...state,
        opinions: state.opinions.concat(payload)
      }
    }
    case GET_USER_LIST: {
      return {
        ...state,
        userList: payload
      }
    }
    case MORE_USERS: {
      return {
        ...state,
        userList: state.userList.concat(payload)
      }
    }
    case ADD_ANSWER: {
      return {
        ...state,
        notifications: state.notifications.filter(item => item._id !== payload._id),
        numberNotifications: --state.numberNotifications
      }
    }
    case GET_NOTIFICATIONS: {
      return {
        ...state,
        notifications: payload
      }
    }
    default:
      return state
  }
}

export default profileReducer
