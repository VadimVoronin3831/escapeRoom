export type BookingQuest = {
  id: string;
  location: {
    address: string;
    coords: [number, number];
  };
  slots: {
    today: [
      {
        time: string;
        isAvailable: boolean;
      },
    ];
    tomorrow: [
      {
        time: string;
        isAvailable: boolean;
      },
    ];
  };
};
