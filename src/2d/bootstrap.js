import Phaser from "phaser";

export class Bootstrap extends Phaser.Scene {
  constructor() {
    super("bootstrap");
  }

  init() {
    let style = {
      font: "32px Arial",
      fill: "#ffffff",
      align: "center",
    };

    this.text = this.add
      .text(
        this.game.config.width / 2,
        this.game.config.height / 2,
        "Loading: 0%",
        style
      )
      .setOrigin(0.5);
  }

  preload() {
    // hander load books flip
    let path = "/Book_Flip/webp/";
    let assetname = "Book_Flip_";
    for (let i = 0; i <= 99; i++) {
      let current = i.toString().padStart(3, "0");
      this.load.image(
        assetname + current,
        path + assetname + current + ".webp"
      );
    }

    // preload directory
    this.load.text("directory", "/dictionary.txt");

    this.load.on("progress", (value) => {
      // color 0x00ff00
      this.text.setColor(0x00ff00);
      this.text.setText("Loading: " + parseInt(value * 100) + "%");
    });

    this.load.on("complete", () => {
      this.scene.start("game");
    });
  }

  create() {
    this.anims.create({
      key: "flip",
      frames: ArrayFrame(0, 99, false),
      frameRate: 30,
      repeat: 0,
    });
  }

  update() {}
}

function ArrayFrame(start, end, reverse) {
  if (reverse) {
    let arr = [];
    for (let i = start; i >= end; i--) {
      arr.push({ key: "Book_Flip_" + i.toString().padStart(3, "0") });
    }
    return arr;
  } else {
    let arr = [];
    for (let i = start; i <= end; i++) {
      arr.push({ key: "Book_Flip_" + i.toString().padStart(3, "0") });
    }
    return arr;
  }
}
