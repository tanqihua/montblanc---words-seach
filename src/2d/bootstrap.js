import Phaser from "phaser";

export class Bootstrap extends Phaser.Scene {
  constructor() {
    super("bootstrap");
  }

  init() {}

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
  }

  create() {
    this.anims.create({
      key: "flip",
      frames: ArrayFrame(0, 99, false),
      frameRate: 30,
      repeat: 0,
    });

    this.game.scene.start("game");
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
