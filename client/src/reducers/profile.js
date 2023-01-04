import {
  GET_PROFILE,
  PROFILE_ERROR,
  NEW_OPINION,
  MORE_OPINIONS,
  GET_APPBAR_INFO
} from '../actions/types'

const initialState = {
  profile: null,
  opinions: [],
  opinionsLength: 0,
  loadig: true,
  name: '',
  avatar: '',
  error: null
}

function profileReducer(state = initialState, action) {
  const {type, payload} = action

  switch (type) {
    case GET_PROFILE:
      return {
        profile: payload.profile,
        opinions: payload.opinions,
        opinionsLength: payload.opinionsLength,
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
    case MORE_OPINIONS: {
      return {
        ...state,
        opinions: state.opinions.concat(payload)
      }
    }
    default:
      return state
  }
}

export default profileReducer
