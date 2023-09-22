import Phaser from "phaser";
import { Bootstrap } from "./bootstrap.js";
import { Game } from "./game.js";
import React, { useEffect } from "react";

const config = {
  type: Phaser.AUTO,
  parent: "phaser-container",
  backgroundColor: "transparent",
  transparent: true,
  width: window.innerWidth * window.devicePixelRatio,
  height: window.innerHeight * window.devicePixelRatio,
  scale: {
    mode: Phaser.Scale.ScaleModes.FIT,
  },
  fx: {
    glow: {
      distance: 16,
      quality: 0.05,
    },
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: true,
    },
  },
  scene: [Bootstrap, Game],
};

const IoPhaser = React.forwardRef((props, ref) => {
  useEffect(() => {
    const phaserGame = new Phaser.Game(config);
    ref.current = phaserGame;
    return () => phaserGame.destroy(true);
  }, []);

  return (
    <div
      id="phaser-container"
      style={{
        width: "100vw",
        height: "100svh",
      }}
    ></div>
  );
});

export default IoPhaser;
