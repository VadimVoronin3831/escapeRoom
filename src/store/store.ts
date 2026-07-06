import { configureStore } from '@reduxjs/toolkit';
import { sliceName } from '../const';
import { questListSlice } from './slices/questSlice';
import { userSlice } from './slices/userSlice';
import { createAPI } from './api';
const api = createAPI();
export const store = configureStore({
  reducer: {
    [sliceName.QUESTS]: questListSlice.reducer,
    [sliceName.USER]: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
