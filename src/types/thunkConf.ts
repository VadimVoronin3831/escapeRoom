import { AxiosInstance } from 'axios';
import { AppDispatch, RootState } from '../store/store';

export type thunkConf = {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
  rejectValue: string;
};
