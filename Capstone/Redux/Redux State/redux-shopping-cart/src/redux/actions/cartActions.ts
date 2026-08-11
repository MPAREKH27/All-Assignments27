import {
  Product,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  CLEAR_CART,
  APPLY_COUPON,
  AddToCartAction,
  RemoveFromCartAction,
  UpdateCartQuantityAction,
  ClearCartAction,
  ApplyCouponAction,
} from '../../types/redux';

export const addToCart = (product: Product): AddToCartAction => ({
  type: ADD_TO_CART,
  payload: product,
});

export const removeFromCart = (productId: string): RemoveFromCartAction => ({
  type: REMOVE_FROM_CART,
  payload: { productId },
});

export const updateCartQuantity = (
  productId: string,
  quantity: number
): UpdateCartQuantityAction => ({
  type: UPDATE_CART_QUANTITY,
  payload: { productId, quantity },
});

export const clearCart = (): ClearCartAction => ({
  type: CLEAR_CART,
});

export const applyCoupon = (
  couponCode: string,
  discountPercent: number
): ApplyCouponAction => ({
  type: APPLY_COUPON,
  payload: { couponCode, discountPercent },
});
