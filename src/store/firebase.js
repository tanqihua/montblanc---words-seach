import { create } from "zustand";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCCmddK8-qe6fiyAGPctg3ipLegU3Gp_4A",
  authDomain: "superfans-83ecb.firebaseapp.com",
  projectId: "superfans-83ecb",
  storageBucket: "superfans-83ecb.appspot.com",
  messagingSenderId: "901884946996",
  appId: "1:901884946996:web:72a9947da79433fab7b861",
  measurementId: "G-GDGGX66YD1",
};

// Initialize Firebase

const useFirebase = create((set, get) => {
  return {
    app: null,
    db: null,
    uid: null,
    timeSpend: 0,

    firebase: {
      init() {
        set({ app: initializeApp(firebaseConfig) });
        set({ db: getFirestore() });

        // check if uid is in localstorage
        localStorage.getItem("uid") &&
          set({ uid: localStorage.getItem("uid") });

        !localStorage.getItem("uid") && set({ uid: null });

        // main loop
        let current = new Date().getTime();
        let count20 = 20;

        const countDown = () => {
          // check if 1 second has passed
          if (new Date().getTime() - current > 1000 && get().uid) {
            // hander time spend
            if (get().timeSpend < 120) {
              set({ timeSpend: get().timeSpend + 1 });
              if (count20 <= 0) {
                // set doc by uid
                const db = get().db;
                const uid = get().uid;

                // setDoc(doc(db, "users", uid), {
                //   timeSpend: get().timeSpend,
                // });
                count20 = 20;
              } else {
                count20--;
              }
            }

            current = new Date().getTime();
          }

          requestAnimationFrame(countDown);
        };

        countDown();
      },

      write() {
        const db = get().db;
        const uid = get().uid;
        if (uid) {
          setDoc(doc(db, "users", uid), {
            first: "Ada",
            last: "Lovelace",
            born: 1815,
          });
        }
      },
    },
  };
});

export default useFirebase;
