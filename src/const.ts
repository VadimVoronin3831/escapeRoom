export enum APP_PATH {
  PAGE_MAIN = '/',
  PAGE_QUESTBOOKING = '/quest/:id/booking',
  PAGE_NOTFOUND = '*',
  PAGE_CONTACTS = '/contacts',
  PAGE_LOGIN = '/login',
  PAGE_MYQUEST = '/my-quests',
  PAGE_QUEST = '/quest/:id'
}

export const questItemViewMode = {
  catalog: 'catalog',
  booking: 'booking',
}as const;


export const sliceName = {
  QUESTS: 'QUESTS',
  USER: 'USER',
} as const;

export enum API_PATH {
  GET_QUESTLIST = 'quest',
  GET_QUEST = 'quest/:id',
  GET_MYQUEST = 'reservation',
  LOGIN = 'login',
  DELETE_BOOKING = 'reservation/:id',
  BOOKING_QUESTINFO = 'quest/:id/booking',
}

export enum MAP_VIEWMODE {
  CONTACTS = '370px',
  QUEST = '530px',
}

export const levelQuest = {
  'any': 'Любой',
  'easy': 'Легкий',
  'medium': 'Средний',
  'hard': 'Сложный',
} as const;

export const typeQuest = {
  'all': 'Все квесты',
  'adventures': 'Приключения',
  'horror': 'Ужасы',
  'mystic': 'Мистика',
  'detective': 'Детектив',
  'sci-fi': 'Sci-fi',
} as const;


export const validatePassword = {
  minLength: 3,
  maxLength: 15,
  LengthError: 'Пароль должен быть от 3 до 15 символов',
} as const;

export const escapeRoomAddress: [number, number] = [59.968322, 30.317359];


