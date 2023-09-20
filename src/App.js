import IoPhaser from "./2d/phaser";
import React, { useEffect, useMemo } from "react";
import useStore from "./store";
// function setdoc
function App() {
  const phaserGame = React.useRef(null);
  const [count, setCount] = React.useState(0);

  const firebase = useStore((state) => state.firebase);

  void useEffect(() => {
    return () => {
      firebase.init();
    };
  }, []);

  return (
    <div className="App">
      <IoPhaser ref={phaserGame} />
    </div>
  );
}

export default App;
