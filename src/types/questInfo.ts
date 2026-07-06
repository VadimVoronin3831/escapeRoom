export type QuestInfo = {
  id: string;
  title: string;
  previewImg: string;
  previewImgWebp: string;
  level: 'easy' | 'medium' | 'hard';
  type: 'adventures' | 'horror' | 'mystic' | 'detective' | 'sci-fi';
  peopleMinMax: number[];
  description: string;
  coverImg: string;
  coverImgWebp: string;
};
