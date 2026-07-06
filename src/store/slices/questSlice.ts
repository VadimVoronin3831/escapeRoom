import { createSlice } from '@reduxjs/toolkit';
import { sliceName } from '../../const';
import { Quest } from '../../types/quest';
import {
  fetchBookingQuestInfo,
  fetchBookingQuestPost,
  fetchMyQuestList,
  fetchQuest,
  fetchQuestList,
  deleteBookingQuest,
} from '../apiActions/apiActions';
import { QuestInfo } from '../../types/questInfo';
import { BookingQuest } from '../../types/bookingQuest';
import { myQuestList } from '../../types/myQuestList';

type QuestsData = {
  questList: Quest[];
  quest: QuestInfo | null;
  bookingQuestInfo: BookingQuest[];
  isBookingQuestPostLoading: boolean;
  isBookingQuestInfoLoading: boolean;
  listIsLoading: boolean;
  itemIsLoading: boolean;
  error: string | null;
  myQuestList: myQuestList[];
  isMyQuestListLoading: boolean;
  isDeleteBookingLoading: boolean;
};

const initialState: QuestsData = {
  questList: [],
  listIsLoading: true,
  itemIsLoading: true,
  error: null,
  quest: null,
  bookingQuestInfo: [],
  isBookingQuestInfoLoading: false,
  isBookingQuestPostLoading: false,
  isMyQuestListLoading: false,
  myQuestList: [],
  isDeleteBookingLoading: false,
};

export const questListSlice = createSlice({
  name: sliceName.QUESTS,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestList.pending, (state) => {
        state.listIsLoading = true;
        state.error = null;
      })
      .addCase(fetchQuestList.fulfilled, (state, action) => {
        state.listIsLoading = false;
        state.questList = action.payload;
      })
      .addCase(fetchQuestList.rejected, (state, action) => {
        state.listIsLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchMyQuestList.pending, (state) => {
        state.isMyQuestListLoading = true;
        state.error = null;
      })
      .addCase(fetchMyQuestList.fulfilled, (state, action) => {
        state.isMyQuestListLoading = false;
        state.myQuestList = action.payload;
      })
      .addCase(fetchMyQuestList.rejected, (state, action) => {
        state.isMyQuestListLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchBookingQuestInfo.pending, (state) => {
        state.isBookingQuestInfoLoading = true;
        state.error = null;
      })
      .addCase(fetchBookingQuestInfo.fulfilled, (state, action) => {
        state.isBookingQuestInfoLoading = false;
        state.bookingQuestInfo = action.payload;
      })
      .addCase(fetchBookingQuestInfo.rejected, (state, action) => {
        state.isBookingQuestInfoLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchQuest.pending, (state) => {
        state.itemIsLoading = true;
        state.error = null;
      })
      .addCase(fetchQuest.fulfilled, (state, action) => {
        state.itemIsLoading = false;
        state.quest = action.payload;
      })
      .addCase(fetchQuest.rejected, (state, action) => {
        state.itemIsLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchBookingQuestPost.pending, (state) => {
        state.isBookingQuestPostLoading = true;
        state.error = null;
      })
      .addCase(fetchBookingQuestPost.fulfilled, (state) => {
        state.isBookingQuestPostLoading = false;
      })
      .addCase(fetchBookingQuestPost.rejected, (state, action) => {
        state.isBookingQuestPostLoading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteBookingQuest.pending, (state) => {
        state.isDeleteBookingLoading = true;
        state.error = null;
      })
      .addCase(deleteBookingQuest.fulfilled, (state, action) => {
        state.isDeleteBookingLoading = false;
        state.myQuestList = state.myQuestList.filter(
          (booking) => booking.id !== action.payload,
        );
      })
      .addCase(deleteBookingQuest.rejected, (state, action) => {
        state.isDeleteBookingLoading = false;
        state.error = action.payload as string;
      });
  },
});
