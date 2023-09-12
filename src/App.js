import IoPhaser from "./2d/phaser";
import React from "react";

function App() {
  const phaserGame = React.useRef(null);
  return (
    <div className="App">
      <IoPhaser ref={phaserGame} />
    </div>
  );
}

export default App;
