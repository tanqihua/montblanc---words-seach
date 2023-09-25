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
    // pre load font
    this.load.script("webfont", "/webfont.js");

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
    // load a to z png
    this.load.image("a", "/2d/MB_Word/Alphabet/A.png");
    this.load.image("b", "/2d/MB_Word/Alphabet/B.png");
    this.load.image("c", "/2d/MB_Word/Alphabet/C.png");
    this.load.image("d", "/2d/MB_Word/Alphabet/D.png");
    this.load.image("e", "/2d/MB_Word/Alphabet/E.png");
    this.load.image("f", "/2d/MB_Word/Alphabet/F.png");
    this.load.image("g", "/2d/MB_Word/Alphabet/G.png");
    this.load.image("h", "/2d/MB_Word/Alphabet/H.png");
    this.load.image("i", "/2d/MB_Word/Alphabet/I.png");
    this.load.image("j", "/2d/MB_Word/Alphabet/J.png");
    this.load.image("k", "/2d/MB_Word/Alphabet/K.png");
    this.load.image("l", "/2d/MB_Word/Alphabet/L.png");
    this.load.image("m", "/2d/MB_Word/Alphabet/M.png");
    this.load.image("n", "/2d/MB_Word/Alphabet/N.png");
    this.load.image("o", "/2d/MB_Word/Alphabet/O.png");
    this.load.image("p", "/2d/MB_Word/Alphabet/P.png");
    this.load.image("q", "/2d/MB_Word/Alphabet/Q.png");
    this.load.image("r", "/2d/MB_Word/Alphabet/R.png");
    this.load.image("s", "/2d/MB_Word/Alphabet/S.png");
    this.load.image("t", "/2d/MB_Word/Alphabet/T.png");
    this.load.image("u", "/2d/MB_Word/Alphabet/U.png");
    this.load.image("v", "/2d/MB_Word/Alphabet/V.png");
    this.load.image("w", "/2d/MB_Word/Alphabet/W.png");
    this.load.image("x", "/2d/MB_Word/Alphabet/X.png");
    this.load.image("y", "/2d/MB_Word/Alphabet/Y.png");
    this.load.image("z", "/2d/MB_Word/Alphabet/Z.png");

    // load song
    this.load.audio("bookflip", "/sounds/Montblanc_game_bookflip.mp3");
    this.load.audio("bookfipEnd", "/sounds/Montblanc_game_bookflip_end2.mp3");
    this.load.audio(
      "heightlight",
      "/sounds/Montblanc_game_highlight_answer.mp3"
    );

    // load mb logo
    this.load.image("mblogo", "/2d/MB_logo.png");

    // load icon
    this.load.image("icon", "/2d/icon_300.png");

    // load text
    this.load.image("text", "/2d/text.png");

    // load bg
    this.load.image("bg", "/2d/BG.jpg");

    // load clueText
    this.load.image("clueText", "/2d/clueText.png");

    this.load.image("b_logo", "/2d/B_logo.png");

    // load sprite sheet
    this.load.spritesheet("pointsys", "/2d/point.png", {
      frameWidth: 167,
      frameHeight: 51,
    });

    this.load.on("progress", (value) => {
      // color 0x00ff00
      this.text.setColor(0x00ff00);
      this.text.setText("Loading: " + parseInt(value * 100) + "%");
    });
  }

  create() {
    this.anims.create({
      key: "flip",
      frames: ArrayFrame(0, 99, false),
      frameRate: 30,
      repeat: 0,
    });

    this.anims.create({
      key: "3point",
      frames: this.anims.generateFrameNumbers("pointsys", { start: 0, end: 0 }),
      frameRate: 1,
    });

    this.anims.create({
      key: "2point",
      frames: this.anims.generateFrameNumbers("pointsys", { start: 2, end: 2 }),
      frameRate: 1,
    });

    this.anims.create({
      key: "1point",
      frames: this.anims.generateFrameNumbers("pointsys", { start: 1, end: 1 }),
      frameRate: 1,
    });

    this.anims.create({
      key: "0point",
      frames: this.anims.generateFrameNumbers("pointsys", { start: 3, end: 3 }),
      frameRate: 1,
    });

    window.setPreload();
    this.scene.start("game");
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
