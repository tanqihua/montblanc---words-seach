import { create } from "zustand";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getAuth, signInAnonymously } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCvOLqEkE3S0K6NKMW6vIO5MjVdxJ4k0Zw",
  authDomain: "superfan-3a794.firebaseapp.com",
  projectId: "superfan-3a794",
  storageBucket: "superfan-3a794.appspot.com",
  messagingSenderId: "18328979437",
  appId: "1:18328979437:web:b6fb5190d1b2ba9445c9e4",
  measurementId: "G-9MNC1K6CRJ",
};

let collection = "montblanc-sg-wordsseach";
let superfan = "superfan-montblanc-sg-wordsseach";

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

      playRecord(props) {
        const db = get().db;
        const uid = get().uid;
        let enterTime = get().enterTime;
        console.log(props);
        if (uid) {
          setDoc(
            doc(db, collection, uid),
            {
              [enterTime]: {
                playRecord: props,
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

      submit(props) {
        const db = get().db;
        const uid = get().uid;
        let enterTime = get().enterTime;

        if (uid) {
          setDoc(
            doc(db, superfan, uid),
            {
              [collection]: {
                [enterTime]: { info: props },
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
            doc(db, collection, uid),
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
