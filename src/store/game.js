import { create } from "zustand";

// Initialize Firebase

const useGameStore = create((set, get) => {
  return {
    countDown: 60,

    game: {
      init() {
        // main loop
        let current = new Date().getTime();

        const countDown = () => {
          // check if 1 second has passed
          if (new Date().getTime() - current > 1000) {
            set({ countDown: get().countDown - 1 });
            current = new Date().getTime();
          }

          requestAnimationFrame(countDown);
        };
        countDown();
      },
    },
  };
});

export default useGameStore;
