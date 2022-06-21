import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

type InitialState = {
  token: string;
};

const initialState: InitialState = {
  token: '',
};

export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

export const { setToken } = user.actions;

export const selectToken = (state: RootState): string => state.user.token;
