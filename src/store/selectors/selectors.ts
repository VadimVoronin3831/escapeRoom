import { RootState } from '../store';
import { sliceName } from '../../const';

export const getQuestList = (state: RootState) => state[sliceName.QUESTS].questList;
export const getQuest = (state: RootState) => state[sliceName.QUESTS].quest;
export const getItemLoading = (state: RootState) => state[sliceName.QUESTS].itemIsLoading;
export const getListLoading = (state: RootState) => state[sliceName.QUESTS].listIsLoading;
export const getIsBookingQuestInfoLoading = (state: RootState) => state[sliceName.QUESTS].isBookingQuestInfoLoading;
export const getBookingQuestInfo = (state: RootState) => state[sliceName.QUESTS].bookingQuestInfo;
export const getBookingQuestPostLoading = (state: RootState) => state[sliceName.QUESTS].isBookingQuestPostLoading;
export const getMyQuestList = (state: RootState) => state[sliceName.QUESTS].myQuestList;
export const getIsMyQuestListLoading = (state: RootState) => state[sliceName.QUESTS].isMyQuestListLoading;
export const getQuestError = (state: RootState) => state[sliceName.QUESTS].error;
export const getIsDeleteBookingLoading = (state: RootState) => state[sliceName.QUESTS].isDeleteBookingLoading;

export const getIsAuth = (state: RootState) => state[sliceName.USER].isAuth;
export const getIsAuthLoading = (state: RootState) => state[sliceName.USER].isLoading;
