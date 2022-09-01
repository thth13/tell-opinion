import {
  GET_PROFILE,
  PROFILE_ERROR,
  NEW_OPINION
} from '../actions/types'

const initialState = {
  profile: null,
  opinions: [],
  loadig: true,
  error: {}
}

function profileReducer(state = initialState, action) {
  const {type, payload} = action

  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: payload.profile,
        opinions: payload.opinions,
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
        opinions: state.opinions.concat(payload),
        loading: false
      }
    }
    default:
      return state
  }
}

export default profileReducer
