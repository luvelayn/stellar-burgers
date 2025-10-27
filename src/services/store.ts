import { combineSlices, configureStore } from '@reduxjs/toolkit';

import {
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import { ingredientsSlice } from './ingredients/slice';
import { burgerConstructorSlice } from './burgerConstructor/slice';
import { orderSlice } from './order/orderSlice';
import { userSlice } from './user/slice';

const rootReducer = combineSlices(
  ingredientsSlice,
  orderSlice,
  burgerConstructorSlice,
  userSlice
);

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch = dispatchHook.withTypes<AppDispatch>();
export const useSelector = selectorHook.withTypes<RootState>();

export default store;
