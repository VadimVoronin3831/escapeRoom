import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_PATH } from '../../const';
import { Quest } from '../../types/quest';
import { QuestInfo } from '../../types/questInfo';
import { AuthResponse } from '../../types/authResponse';
import { AxiosError } from 'axios';
import { AuthData } from '../../types/authData';
import { thunkConf } from '../../types/thunkConf';
import { BookingQuest } from '../../types/bookingQuest';
import { bookingQuestForm } from '../../types/bookingQuestForm';
import { myQuestList } from '../../types/myQuestList';

export const fetchQuestList = createAsyncThunk<Quest[], void, thunkConf>(
  'quest/fetchQuestList',
  async (_, { rejectWithValue, extra: api }) => {
    try {
      const response = await api.get<Quest[]>(API_PATH.GET_QUESTLIST);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 404) {
        return rejectWithValue('Квесты не найдены');
      }
      return rejectWithValue('Ошибка загрузки списка квестов');
    }
  },
);
export const fetchMyQuestList = createAsyncThunk<
  myQuestList[],
  void,
  thunkConf
>('quest/fetchMyQuestList', async (_, { rejectWithValue, extra: api }) => {
  try {
    const response = await api.get<myQuestList[]>(API_PATH.GET_MYQUEST);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 404) {
      return rejectWithValue('Квесты не найдены');
    }
    return rejectWithValue('Ошибка загрузки списка квестов');
  }
});

export const fetchQuest = createAsyncThunk<QuestInfo, string, thunkConf>(
  'quest/fetchQuest',
  async (id, { rejectWithValue, extra: api }) => {
    try {
      const url = API_PATH.GET_QUEST.replace(':id', id);
      const response = await api.get<QuestInfo>(url);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 404) {
        return rejectWithValue('Квест не найден');
      }
      return rejectWithValue('Ошибка загрузки квеста');
    }
  },
);

export const fetchBookingQuestInfo = createAsyncThunk<
  BookingQuest[],
  string,
  thunkConf
>(
  'quest/fetchBookingQuestInfo',
  async (id, { rejectWithValue, extra: api }) => {
    try {
      const url = API_PATH.BOOKING_QUESTINFO.replace(':id', id);
      const response = await api.get<BookingQuest[]>(url);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 404) {
        return rejectWithValue('Квест не найден');
      }
      return rejectWithValue('Ошибка загрузки квеста');
    }
  },
);

export const deleteBookingQuest = createAsyncThunk<
  string,
  string,
  thunkConf
>('quest/deleteBookingQuest', async (id, { rejectWithValue, extra: api }) => {
  try {
    const url = API_PATH.DELETE_BOOKING.replace(':id', id);
    await api.delete(url);
    return id;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 404) {
      return rejectWithValue('Бронирование не найдено');
    }
    return rejectWithValue('Ошибка удаления бронирования');
  }
});

export const fetchBookingQuestPost = createAsyncThunk<
  bookingQuestForm,
  { questId: string; placeId: string; data: bookingQuestForm },
  thunkConf
>(
  'quest/fetchBookingQuestPost',
  async ({ questId, placeId, data }, { rejectWithValue, extra: api }) => {
    try {
      const url = API_PATH.BOOKING_QUESTINFO.replace(':id', questId);
      const response = await api.post<bookingQuestForm>(url, {
        ...data,
        placeId,
      });
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 404) {
        return rejectWithValue('Квест не найден');
      }
      return rejectWithValue('Ошибка загрузки квеста');
    }
  },
);

export const fetchAutorize = createAsyncThunk<
  AuthResponse,
  AuthData,
  thunkConf
>(
  'user/fetchAutorize',
  async ({ email, password }: AuthData, { rejectWithValue, extra: api }) => {
    try {
      const response = await api.post<AuthResponse>(API_PATH.LOGIN, {
        email,
        password,
      });
      const { token, email: userEmail } = response.data;
      localStorage.setItem('token', token);

      return { token, email: userEmail };
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 401) {
        return rejectWithValue('Неверный email или пароль');
      }
      return rejectWithValue('Ошибка сервера, попробуйте позже');
    }
  },
);

export const checkAuth = createAsyncThunk<AuthResponse, void, thunkConf>(
  'user/checkAuth',
  async (_, { rejectWithValue, extra: api }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return rejectWithValue('No token');
      }

      const response = await api.get<AuthResponse>(API_PATH.LOGIN);
      const { token: newToken, email: userEmail } = response.data;

      return { token: newToken, email: userEmail };
    } catch (error) {
      localStorage.removeItem('token');
      return rejectWithValue('Unauthorized');
    }
  },
);
