import { legacy_createStore as createStore, combineReducers, applyMiddleware, Middleware } from 'redux';
import { thunk, ThunkDispatch } from 'redux-thunk';
import { useDispatch as useReduxDispatch } from 'react-redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import { cartReducer } from './reducers/cartReducer';
import { wishlistReducer } from './reducers/wishlistReducer';
import { offersReducer } from './reducers/offersReducer';
import { RootState, ActionLogEntry, AnyAppAction } from '../types/redux';

export type { RootState, ActionLogEntry };

// 1. Combine Reducers (Requirement 3)
export const rootReducer = combineReducers({
  cart: cartReducer,
  wishlist: wishlistReducer,
  offers: offersReducer,
});

// Custom Listener for In-App Live Redux DevTools Panel
type ActionLogSubscriber = (logEntry: ActionLogEntry) => void;
const actionSubscribers: ActionLogSubscriber[] = [];

export const subscribeToActionLogs = (subscriber: ActionLogSubscriber) => {
  actionSubscribers.push(subscriber);
  return () => {
    const idx = actionSubscribers.indexOf(subscriber);
    if (idx > -1) actionSubscribers.splice(idx, 1);
  };
};

// Middleware to capture dispatched actions & state snapshots for live in-app DevTools inspector
const loggerMiddleware: Middleware<{}, RootState> = (storeApi) => (next) => (action) => {
  const prevState = storeApi.getState();
  const result = next(action);
  const nextState = storeApi.getState();

  const logEntry: ActionLogEntry = {
    id: `act_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
    timestamp: new Date().toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      fractionalSecondDigits: 3,
    }),
    action: action as AnyAppAction,
    prevState,
    nextState,
  };

  actionSubscribers.forEach((sub) => sub(logEntry));
  return result;
};

// 2. Configure Store with Redux Thunk and Redux DevTools Extension (Requirements 4 & 5)
const composeEnhancers = composeWithDevTools({
  name: 'Redux Shopping App',
  trace: true,
  traceLimit: 25,
});

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk as any, loggerMiddleware))
);

export type AppDispatch = ThunkDispatch<RootState, undefined, AnyAppAction>;
export const useAppDispatch = () => useReduxDispatch<AppDispatch>();
