import {
  CartState,
  CartActionTypes,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  CLEAR_CART,
  APPLY_COUPON,
} from '../../types/redux';

const initialState: CartState = {
  items: [],
  appliedDiscount: 0,
  appliedCoupon: null,
};

export function cartReducer(
  state = initialState,
  action: CartActionTypes
): CartState {
  switch (action.type) {
    case ADD_TO_CART: {
      const existingIndex = state.items.findIndex(
        (item) => item.product.id === action.payload.id
      );

      if (existingIndex > -1) {
        const updatedItems = [...state.items];
        updatedItems[existingIndex] = {
          ...updatedItems[existingIndex],
          quantity: updatedItems[existingIndex].quantity + 1,
        };
        return {
          ...state,
          items: updatedItems,
        };
      }

      return {
        ...state,
        items: [
          ...state.items,
          {
            product: action.payload,
            quantity: 1,
            addedAt: new Date().toLocaleTimeString(),
          },
        ],
      };
    }

    case REMOVE_FROM_CART: {
      return {
        ...state,
        items: state.items.filter(
          (item) => item.product.id !== action.payload.productId
        ),
      };
    }

    case UPDATE_CART_QUANTITY: {
      const { productId, quantity } = action.payload;
      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((item) => item.product.id !== productId),
        };
      }
      return {
        ...state,
        items: state.items.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        ),
      };
    }

    case CLEAR_CART: {
      return {
        ...state,
        items: [],
        appliedDiscount: 0,
        appliedCoupon: null,
      };
    }

    case APPLY_COUPON: {
      return {
        ...state,
        appliedDiscount: action.payload.discountPercent,
        appliedCoupon: action.payload.couponCode,
      };
    }

    default:
      return state;
  }
}
