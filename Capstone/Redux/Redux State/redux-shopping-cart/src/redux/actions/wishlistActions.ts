import {
  Product,
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
  TOGGLE_WISHLIST,
  AddToWishlistAction,
  RemoveFromWishlistAction,
  ToggleWishlistAction,
} from '../../types/redux';

export const addToWishlist = (product: Product): AddToWishlistAction => ({
  type: ADD_TO_WISHLIST,
  payload: product,
});

export const removeFromWishlist = (productId: string): RemoveFromWishlistAction => ({
  type: REMOVE_FROM_WISHLIST,
  payload: { productId },
});

export const toggleWishlist = (product: Product): ToggleWishlistAction => ({
  type: TOGGLE_WISHLIST,
  payload: product,
});
