import {
  SET_ARTIST_TYPE
} from './actions'

import { artistTypes } from '../../utils/data'

const initialState = {
  errorMessage: '',
  alertMessage: '',
  artistType: artistTypes.find(artistType => artistType.key === 'band')
}

export default function home(state = initialState, action) {
  switch (action.type) {
    case SET_ARTIST_TYPE:
      return {
        ...state,
        artistType: action.artistType
      }
    default:
      return state
  }
}
