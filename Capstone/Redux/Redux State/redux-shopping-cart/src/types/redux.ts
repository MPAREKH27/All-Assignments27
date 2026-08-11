import { UnknownAction } from 'redux';

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  description: string;
  inStock: boolean;
  tag?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  addedAt: string;
}

export interface WishlistItem {
  product: Product;
  addedAt: string;
}

export interface Offer {
  id: string;
  code: string;
  title: string;
  description: string;
  discountPercent: number;
  minAmount: number;
  expiry: string;
  bgGradient: string;
  tag: string;
}

// State Shapes
export interface CartState {
  items: CartItem[];
  appliedDiscount: number; // percentage
  appliedCoupon: string | null;
}

export interface WishlistState {
  items: WishlistItem[];
}

export interface OffersState {
  items: Offer[];
  loading: boolean;
  error: string | null;
  lastFetched: string | null;
}

export interface RootState {
  cart: CartState;
  wishlist: WishlistState;
  offers: OffersState;
}

// Action Type Constants
export const ADD_TO_CART = 'cart/ADD_TO_CART' as const;
export const REMOVE_FROM_CART = 'cart/REMOVE_FROM_CART' as const;
export const UPDATE_CART_QUANTITY = 'cart/UPDATE_CART_QUANTITY' as const;
export const CLEAR_CART = 'cart/CLEAR_CART' as const;
export const APPLY_COUPON = 'cart/APPLY_COUPON' as const;

export const ADD_TO_WISHLIST = 'wishlist/ADD_TO_WISHLIST' as const;
export const REMOVE_FROM_WISHLIST = 'wishlist/REMOVE_FROM_WISHLIST' as const;
export const TOGGLE_WISHLIST = 'wishlist/TOGGLE_WISHLIST' as const;

export const FETCH_OFFERS_START = 'offers/FETCH_OFFERS_START' as const;
export const FETCH_OFFERS_SUCCESS = 'offers/FETCH_OFFERS_SUCCESS' as const;
export const FETCH_OFFERS_FAILURE = 'offers/FETCH_OFFERS_FAILURE' as const;

// Redux Action Interfaces conforming to UnknownAction
export interface AddToCartAction extends UnknownAction {
  type: typeof ADD_TO_CART;
  payload: Product;
}

export interface RemoveFromCartAction extends UnknownAction {
  type: typeof REMOVE_FROM_CART;
  payload: { productId: string };
}

export interface UpdateCartQuantityAction extends UnknownAction {
  type: typeof UPDATE_CART_QUANTITY;
  payload: { productId: string; quantity: number };
}

export interface ClearCartAction extends UnknownAction {
  type: typeof CLEAR_CART;
}

export interface ApplyCouponAction extends UnknownAction {
  type: typeof APPLY_COUPON;
  payload: { couponCode: string; discountPercent: number };
}

export type CartActionTypes =
  | AddToCartAction
  | RemoveFromCartAction
  | UpdateCartQuantityAction
  | ClearCartAction
  | ApplyCouponAction;

export interface AddToWishlistAction extends UnknownAction {
  type: typeof ADD_TO_WISHLIST;
  payload: Product;
}

export interface RemoveFromWishlistAction extends UnknownAction {
  type: typeof REMOVE_FROM_WISHLIST;
  payload: { productId: string };
}

export interface ToggleWishlistAction extends UnknownAction {
  type: typeof TOGGLE_WISHLIST;
  payload: Product;
}

export type WishlistActionTypes =
  | AddToWishlistAction
  | RemoveFromWishlistAction
  | ToggleWishlistAction;

export interface FetchOffersStartAction extends UnknownAction {
  type: typeof FETCH_OFFERS_START;
}

export interface FetchOffersSuccessAction extends UnknownAction {
  type: typeof FETCH_OFFERS_SUCCESS;
  payload: Offer[];
}

export interface FetchOffersFailureAction extends UnknownAction {
  type: typeof FETCH_OFFERS_FAILURE;
  payload: string;
}

export type OffersActionTypes =
  | FetchOffersStartAction
  | FetchOffersSuccessAction
  | FetchOffersFailureAction;

export type AnyAppAction = CartActionTypes | WishlistActionTypes | OffersActionTypes;

// For custom in-app DevTools action logger
export interface ActionLogEntry {
  id: string;
  timestamp: string;
  action: AnyAppAction;
  prevState: RootState;
  nextState: RootState;
}
