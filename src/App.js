import IoPhaser from "./2d/phaser";
import React, { useEffect, useMemo } from "react";
import useFirebase from "./store/firebase";
import Overlay from "./overlay";
// function setdoc
function App() {
  const phaserGame = React.useRef(null);
  const firebase = useFirebase((state) => state.firebase);

  void useEffect(() => {
    return () => {
      firebase.init();
    };
  }, []);

  return (
    <div className="App">
      <IoPhaser ref={phaserGame} />
      <Overlay ref={phaserGame} />
    </div>
  );
}

export default App;
