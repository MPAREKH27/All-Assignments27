import {
  OffersState,
  OffersActionTypes,
  FETCH_OFFERS_START,
  FETCH_OFFERS_SUCCESS,
  FETCH_OFFERS_FAILURE,
} from '../../types/redux';

const initialState: OffersState = {
  items: [],
  loading: false,
  error: null,
  lastFetched: null,
};

export function offersReducer(
  state = initialState,
  action: OffersActionTypes
): OffersState {
  switch (action.type) {
    case FETCH_OFFERS_START:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_OFFERS_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload,
        error: null,
        lastFetched: new Date().toLocaleTimeString(),
      };

    case FETCH_OFFERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
