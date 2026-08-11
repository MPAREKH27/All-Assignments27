import { Dispatch } from 'redux';
import {
  FETCH_OFFERS_START,
  FETCH_OFFERS_SUCCESS,
  FETCH_OFFERS_FAILURE,
  OffersActionTypes,
} from '../../types/redux';
import { MOCK_OFFERS_LIST } from '../../data/products';

export const fetchOffersStart = (): OffersActionTypes => ({
  type: FETCH_OFFERS_START,
});

export const fetchOffersSuccess = (offers: typeof MOCK_OFFERS_LIST): OffersActionTypes => ({
  type: FETCH_OFFERS_SUCCESS,
  payload: offers,
});

export const fetchOffersFailure = (error: string): OffersActionTypes => ({
  type: FETCH_OFFERS_FAILURE,
  payload: error,
});

/**
 * Async Thunk action to fetch discount offers from API (simulated with setTimeout)
 * Requirement 4 implementation!
 */
export const fetchOffers = () => {
  return (dispatch: Dispatch<OffersActionTypes>) => {
    dispatch(fetchOffersStart());

    // Simulate network delay using setTimeout
    setTimeout(() => {
      try {
        // Successfully fetched simulated offers
        dispatch(fetchOffersSuccess(MOCK_OFFERS_LIST));
      } catch (err) {
        dispatch(
          fetchOffersFailure(
            err instanceof Error ? err.message : 'Failed to load offers'
          )
        );
      }
    }, 1500); // 1.5 second delay
  };
};
