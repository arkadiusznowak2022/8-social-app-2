import { configureStore } from '@reduxjs/toolkit';
import { socialApi } from './apiSlice';
import { user } from './userSlice';

export const store = configureStore({
  reducer: {
    [socialApi.reducerPath]: socialApi.reducer,
    user: user.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socialApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
