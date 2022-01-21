import {
  GET_PROFILE,
  PROFILE_ERROR,
  NEW_OPINION
} from '../actions/types'

const initialState = {
  profile: null,
  loadig: true,
  error: {}
}

function profileReducer(state = initialState, action) {
  const {type, payload} = action

  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false
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
        profile: { ...state.profile, opinions: payload },
        loading: false
      }
    }
    default:
      return state
  }
}

export default profileReducer
