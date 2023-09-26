import { create } from "zustand";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getAuth, signInAnonymously } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCCmddK8-qe6fiyAGPctg3ipLegU3Gp_4A",
  authDomain: "superfans-83ecb.firebaseapp.com",
  projectId: "superfans-83ecb",
  storageBucket: "superfans-83ecb.appspot.com",
  messagingSenderId: "901884946996",
  appId: "1:901884946996:web:72a9947da79433fab7b861",
  measurementId: "G-GDGGX66YD1",
};

let collection = "montblanc-words-seach-sg";

// Initialize Firebase

const useFirebase = create((set, get) => {
  return {
    app: null,
    db: null,
    uid: null,
    timeSpend: 0,
    enterTime: new Date().getTime(),
    buttonHandler: {},

    firebase: {
      init() {
        set({ app: initializeApp(firebaseConfig) });
        set({ db: getFirestore() });

        // check if uid is in localstorage
        localStorage.getItem("uid") &&
          set({ uid: localStorage.getItem("uid") });

        if (!localStorage.getItem("uid")) {
          const auth = getAuth();
          signInAnonymously(auth)
            .then((userCredential) => {
              // Signed in..
              const user = userCredential.user;
              set({ uid: user.uid });
              localStorage.setItem("uid", user.uid);
            })
            .catch((error) => {});
        }

        // main loop
        let current = new Date().getTime();
        let count20 = 20;

        const countDown = () => {
          // check if 1 second has passed

          if (new Date().getTime() - current > 1000 && get().uid) {
            current = new Date().getTime();

            // hander time spend
            if (get().timeSpend < 120) {
              set({ timeSpend: get().timeSpend + 1 });
              if (count20 <= 0) {
                // set doc by uid
                const db = get().db;
                const uid = get().uid;
                let enterTime = get().enterTime;
                setDoc(
                  doc(db, collection, uid),
                  {
                    [enterTime]: { timeSpend: get().timeSpend },
                  },
                  {
                    merge: true,
                  }
                );
                count20 = 20;
              } else {
                count20--;
              }
            }
          }
          requestAnimationFrame(countDown);
        };

        countDown();
      },

      submit(props) {
        const db = get().db;
        const uid = get().uid;
        let enterTime = get().enterTime;

        if (uid) {
          setDoc(
            doc(db, collection, uid),
            {
              [enterTime]: { info: props },
            },

            {
              merge: true,
            }
          ).then((e) => {
            console.log(e);
          });
        }
      },

      trackBtn(type) {
        const db = get().db;
        const uid = get().uid;
        let enterTime = get().enterTime;

        let buttonHandler = get().buttonHandler;

        set({
          buttonHandler: {
            ...buttonHandler,
            [type]: buttonHandler[type] ? buttonHandler[type] + 1 : 1,
          },
        });

        if (uid) {
          setDoc(
            doc(db, "users", uid),
            {
              [enterTime]: {
                clicked: {
                  [type]: {
                    time: new Date(),
                    count: buttonHandler[type] ? buttonHandler[type] + 1 : 1,
                  },
                },
              },
            },
            {
              merge: true,
            }
          ).then((e) => {
            console.log(e);
          });
        }
      },
    },
  };
});

export default useFirebase;
