import { createSlice } from '@reduxjs/toolkit';
import { sliceName } from '../../const';
import { checkAuth, fetchAutorize } from '../apiActions/apiActions';

type UserData = {
  email: string | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  isAuth: boolean;
};

const inicialState: UserData = {
  email: null,
  token: localStorage.getItem('token'),
  isLoading: true,
  error: null,
  isAuth: false,
};

export const userSlice = createSlice({
  name: sliceName.USER,
  initialState: inicialState,
  reducers: {
    logout: (state) => {
      state.email = null;
      state.token = null;
      state.isAuth = false;
      localStorage.removeItem('token');
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAutorize.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAutorize.fulfilled, (state, action) => {
        state.isLoading = false;
        state.email = action.payload.email;
        state.token = action.payload.token;
        state.isAuth = true;
      })
      .addCase(fetchAutorize.rejected, (state, action) => {
        state.isAuth = false;
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.email = action.payload.email;
        state.token = action.payload.token;
        state.isAuth = true;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isAuth = false;
        state.isLoading = false;
        state.email = null;
        state.token = null;
        localStorage.removeItem('token');
      });
  },
});

export const { logout } = userSlice.actions;
