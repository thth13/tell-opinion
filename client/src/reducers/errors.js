import { GET_ERORRS } from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERORRS:
      return action.payload
    default:
      return state;
  }
};