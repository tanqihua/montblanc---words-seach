import IoPhaser from "./2d/phaser";
import React, { useEffect, useMemo } from "react";
import useFirebase from "./store/firebase";
import Overlay from "./overlay";
import { DesktopBlock } from "./overlay/desktopblock";
// function setdoc
function App() {
  const phaserGame = React.useRef(null);

  return (
    <div className="App">
      {window.innerWidth > 721 ? (
        <DesktopBlock />
      ) : (
        <>
          <IoPhaser ref={phaserGame} />
          <Overlay gameRef={phaserGame} />
        </>
      )}
    </div>
  );
}

export default App;
