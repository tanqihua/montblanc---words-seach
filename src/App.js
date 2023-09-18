import IoPhaser from "./2d/phaser";
import React from "react";

// function setdoc
async function getDoc(count) {}
function App() {
  const phaserGame = React.useRef(null);
  const [count, setCount] = React.useState(0);
  getDoc();
  return (
    <div className="App">
      <IoPhaser ref={phaserGame} />
    </div>
  );
}

export default App;
