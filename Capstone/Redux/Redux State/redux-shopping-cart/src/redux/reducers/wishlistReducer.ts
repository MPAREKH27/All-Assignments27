import {
  WishlistState,
  WishlistActionTypes,
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
  TOGGLE_WISHLIST,
} from '../../types/redux';

const initialState: WishlistState = {
  items: [],
};

export function wishlistReducer(
  state = initialState,
  action: WishlistActionTypes
): WishlistState {
  switch (action.type) {
    case ADD_TO_WISHLIST: {
      const exists = state.items.some(
        (item) => item.product.id === action.payload.id
      );
      if (exists) return state;

      return {
        ...state,
        items: [
          ...state.items,
          {
            product: action.payload,
            addedAt: new Date().toLocaleTimeString(),
          },
        ],
      };
    }

    case REMOVE_FROM_WISHLIST: {
      return {
        ...state,
        items: state.items.filter(
          (item) => item.product.id !== action.payload.productId
        ),
      };
    }

    case TOGGLE_WISHLIST: {
      const exists = state.items.some(
        (item) => item.product.id === action.payload.id
      );
      if (exists) {
        return {
          ...state,
          items: state.items.filter(
            (item) => item.product.id !== action.payload.id
          ),
        };
      }
      return {
        ...state,
        items: [
          ...state.items,
          {
            product: action.payload,
            addedAt: new Date().toLocaleTimeString(),
          },
        ],
      };
    }

    default:
      return state;
  }
}
