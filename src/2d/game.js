import Phaser from "phaser";
import { findClosestValue } from "./utils/index.js";
export class Game extends Phaser.Scene {
  constructor() {
    super("game");
  }

  init() {
    this.currentTime = new Date().getTime();
    this.startGame = false;
    this.point = 0;
    this.playHistory = [];
    this.live = 3;
    this.gameEnd = false;
  }

  preload() {}

  getPlayHistory() {
    return this.playHistory;
  }

  create() {
    this.gameIsEnd = false;

    this.mainWidth = (this.game.config.height * 0.65 * 11) / 16;

    // check result
    this.result = null;

    // get dictionary
    this.dictionary = this.cache.text.get("directory");
    this.dictionary = this.dictionary.split("\n");
    this.dictionary = this.dictionary.map((item) => {
      return item.trim();
    });

    // hander draw line
    this.startDraw = false;
    this.startPoint = false;
    this.endPoint = false;
    this.pathGraphics = this.add.graphics();
    this.partGraphics2 = this.add.graphics();

    // set tile color
    this.tileColors = ["#fff"];

    // set tile size
    this.tileWidth = this.mainWidth * 0.097;
    this.tileHeight = this.mainWidth * 0.097;

    // this will hold all of our tile sprites
    this.tileGroup = this.add.group();

    //create whatevet shape you like
    this.tileGrid = [
      ["s", "l", "e", "y", "d", "q", "g", "b", "m"],
      ["i", "t", "i", "c", "s", "n", "e", "o", "i"],
      ["b", "w", "o", "t", "i", "m", "n", "o", "c"],
      ["x", "w", "o", "t", "e", "t", "g", "k", "o"],
      ["a", "r", "i", "r", "b", "r", "g", "s", "n"],
      ["y", "r", "t", "l", "d", "o", "a", "x", "i"],
      ["w", "x", "a", "e", "r", "s", "t", "r", "c"],
      ["e", "n", "l", "i", "b", "r", "a", "r", "y"],
      ["c", "n", "e", "w", "y", "o", "r", "k", "m"],
    ];

    // broad with and height
    this.boardWidth = this.tileGrid.length * this.tileHeight;
    this.boardHeight = this.tileGrid[[0]].length * this.tileWidth;

    // encore the tile grid
    this.leftBuffer =
      this.game.config.width / 2 - this.boardWidth / 2 + this.boardWidth * 0.02;

    this.topBuffer = this.game.config.height / 2 - this.boardHeight / 2;

    let seen = new Date().now;
    this.ramdom = new Phaser.Math.RandomDataGenerator([seen]);

    // init tile
    this.initLayout();
    this.initBook();
    this.initTile();
    this.initDraw();

    window.startMainGame = () => {
      this.startMainGame();
    };

    window.endGame = () => {
      this.endGame();
    };
  }
  // Layout
  initLayout() {
    this.background = this.add
      .image(this.game.config.width / 2, this.game.config.height / 2, "bg")
      .setOrigin(0.5);
    this.background.setDisplaySize(
      this.game.config.height,
      this.game.config.height
    );
    this.background.setDepth(-100);

    this.logo = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.1,
      "mblogo"
    );

    this.logo.setDisplaySize(
      this.game.config.height * 0.1 * 2.77,
      this.game.config.height * 0.1
    );

    window.WebFont.load({
      custom: {
        families: ["Montblant", "Montblant-bold"],
      },
      active: () => {
        // set indicator text
        this._a = 0;
        this.indicatorText = this.add
          .text(
            this.game.config.width * 0.5,
            this.game.config.height * 0.26,
            "SPOT 10 WORDS \nWITHIN 120 SECONDS",
            {
              fontSize: this.game.config.height * 0.018,
              fontFamily: "Montblant",
              color: "#000",
              align: "center",
            }
          )
          .setOrigin(0.5)
          .setAlpha(this._a);

        // this.title = this.add
        //   .text(
        //     this.game.config.width * 0.5,
        //     this.game.config.height * 0.165,
        //     "Spot 10 words within 120 seconds",
        //     {
        //       fontSize: this.game.config.height * 0.015,
        //       fontFamily: "Montblant",
        //       color: "#000",
        //       align: "center",
        //     }
        //   )
        //   .setOrigin(0.5)
        //   .setAlpha(1);

        // set text
        this.countDownText = this.add
          .text(
            this.game.config.width * 0.09,
            this.game.config.height * 0.09,
            "120",
            {
              fontSize: this.game.config.height * 0.05,
              fontFamily: "Montblant-bold",
              color: "#000",
            }
          )
          .setOrigin(0.5)
          .setAlpha(this._a);

        this._countDownText = this.add
          .text(
            this.countDownText.x,
            this.countDownText.y - this.countDownText.height * 0.65,
            "TIME",
            {
              fontSize: this.game.config.height * 0.025,
              fontFamily: "Montblant",
              color: "#000",
            }
          )
          .setAlpha(this._a)
          .setOrigin(0.5);

        // set text point
        this.textPoint = this.add
          .text(
            this.game.config.width * 0.88,
            this.game.config.height * 0.09,
            "0/10",
            {
              fontSize: this.game.config.height * 0.05,
              fontFamily: "Montblant",
              color: "#000",
            }
          )
          .setAlpha(this._a)
          .setOrigin(0.5);

        this._textPoint = this.add
          .text(
            this.textPoint.x,
            this.textPoint.y - this.textPoint.height * 0.65,
            "WORDS",
            {
              fontSize: this.game.config.height * 0.022,
              fontFamily: "Montblant",
              color: "#000",
            }
          )
          .setAlpha(this._a)
          .setOrigin(0.5);

        this.clue = this.add
          .text(
            this.game.config.width * 0.5,
            this.game.config.height * 0.5 +
              ((this.game.config.height * 0.65 * 11) / 16) * 0.52,
            "NONE",
            {
              fontSize: this.game.config.height * 0.02,
              fontFamily: "Montblant",
              color: "#f00",
            }
          )
          .setOrigin(0.5)
          .setAlpha(this._a);

        this.paragraph = this.add
          .text(
            this.game.config.width * 0.5,
            this.game.config.height * 0.215,
            "MONTBLANC INVITES YOU TO EXPLORE THE POWER \n OF LIBRARIES THROUGH THE LENS OF LITERARY \nDESTINATIONS WITH A GAME OF WORD SEARCH.",
            {
              fontSize: this.game.config.height * 0.0175,
              fontFamily: "Montblant",
              color: "#000",
              align: "center",
              underline: true,
            }
          )
          .setOrigin(0.5);
      },
    });

    // load icon
    this.icon = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.9,
      "icon"
    );

    this.icon
      .setDisplaySize(
        this.game.config.height * 0.1,
        this.game.config.height * 0.1
      )
      .setAlpha(0);

    this.clueText = this.add
      .image(
        this.icon.x + this.game.config.height * 0.1 * 1.4,
        this.icon.y - this.game.config.height * 0.1 * 0.2,
        "clueText"
      )
      .setOrigin(0.5)
      .setDepth(10)
      .setAlpha(0);

    this.clueText.setDisplaySize(
      (this.game.config.height * 0.06 * 200) / 80,
      this.game.config.height * 0.06
    );
    this.pointsys = this.add
      .sprite(
        this.clueText.x,
        this.clueText.y + this.game.config.height * 0.06 * 0.8,
        "pointsys"
      )
      .setOrigin(0.5)
      .setDepth(10)
      .setAlpha(0);

    this.pointsys.setDisplaySize(
      (this.game.config.height * 0.03 * 167) / 51,
      this.game.config.height * 0.03
    );

    this.icon.setInteractive();

    this.icon.preFX.setPadding(15);
    const fx = this.icon.preFX.addGlow(0xbff1f5);
    //  For PreFX Glow the quality and distance are set in the Game Configuration
    this.tweens.add({
      targets: fx,
      outerStrength: 10,
      yoyo: true,
      loop: -1,
      ease: "sine.inout",
    });

    this.icon.on("pointerdown", () => {
      if (this.icon.alpha === 1) {
        this.clue.setAlpha(1);

        if (this.live > 0) {
          this.clue.setText(this.getClue());
          fx.color = 0xf39c98;
          this.clueText.setAlpha(1);
          this.pointsys.setAlpha(1);

          switch (this.live) {
            case 3:
              this.pointsys.anims.play("2point");
              break;
            case 2:
              this.pointsys.anims.play("1point");
              break;
            case 1:
              this.pointsys.anims.play("0point");
              // to gray color
              this.icon.setTint(0x808080);
              break;
          }
        }
      }
    });

    this.icon.on("pointerup", () => {
      fx.color = 0xbff1f5;
      this.live -= 1;
    });

    // store sellected tile
    this.collectedTile = [];
  }

  // get clue
  getClue() {
    // random clue
    let random = this.ramdom.integerInRange(0, this.dictionary.length - 1);
    let clud = this.dictionary[random];
    clud = clud.toUpperCase();
    // add point
    for (let i = 0; i < 5; i++) {
      // delay
      this.time.delayedCall(i * 50, () => {
        this.point -= 2;
      });
    }

    this.playHistory.push({
      clue: clud,
      point: this.point,
      time: new Date().getTime(),
    });

    console.log(this.playHistory);

    return clud;
  }

  endGame() {
    // this.bookPlay = false;
    this.gameIsEnd = true;
    this.book.removeInteractive();
    for (let tiles of this.tileGrid) {
      for (let tile of tiles) {
        this.tweens.add({
          targets: tile,
          alpha: 0,
          duration: 700,
          delay: 500,
        });
      }
    }

    this.tweens.add({
      targets: [
        this.textPoint,
        this._textPoint,
        this.countDownText,
        this._countDownText,
        this.indicatorText,
        this.clue,
        this.icon,
        this.clueText,
        this.pointsys,
        this.b_logo,
      ],
      alpha: 0,
      duration: 700,
      delay: 500,
      onComplete: () => {
        this.partGraphics2.clear();
        this.pathGraphics.clear();
      },
    });

    const { width } = this.logo;
    const scale = (this.game.config.height * 0.1 * 2.77) / width;

    this.tweens.add({
      targets: this.logo,
      scale: scale,
      delay: 500,
      duration: 2500,
    });

    this.time.delayedCall(800, () => {
      this.sound.play("bookfipEnd");
      this.book.anims.playReverse("flip").on("animationcomplete", () => {
        this.bookPlay = false;
        this.textPoint.alpha = 0;
        this._textPoint.alpha = 0;
        this.countDownText.alpha = 0;
        this._countDownText.alpha = 0;
        this.indicatorText.alpha = 0;
        this.clue.alpha = 0;
        this.icon.alpha = 0;
        this.clueText.alpha = 0;
        this.pointsys.alpha = 0;
        this.b_logo.alpha = 0;

        for (let tiles of this.tileGrid) {
          for (let tile of tiles) {
            tile.alpha = 0;
          }
        }

        this.tweens.add({
          targets: this.book,
          alpha: 0,
          duration: 700,
          onComplete: () => {
            this.logo.alpha = 0;
            window.setFormTrigger();
          },
        });
      });
    });
  }
  // BOOK
  startMainGame() {
    this.bookPlay = true;

    // logo animation
    const { width } = this.logo;
    const scale = (this.game.config.height * 0.09 * 2.77) / width;

    this.tweens.add({
      targets: this.logo,
      scale: scale,
      delay: 500,
      duration: 2500,
    });

    this.tweens.add({
      targets: this.paragraph,
      alpha: 0,
      delay: 500,
    });

    // play book sound effect
    this.time.delayedCall(200, () => {
      this.sound.play("bookflip");
    });

    this.time.delayedCall(4100, () => {
      this.startGame = true;
    });

    // book animation
    this.book.anims.play("flip").on("animationcomplete", () => {
      this.textPoint.setAlpha(1);
      this.countDownText.setAlpha(1);
      this._textPoint.setAlpha(1);
      this._countDownText.setAlpha(1);
      this.indicatorText.setAlpha(1);
      this.icon.setAlpha(1);
      this.clueText.setAlpha(1);
      this.pointsys.setAlpha(1);
      this.b_logo.setAlpha(1);

      for (let tiles of this.tileGrid) {
        for (let tile of tiles) {
          tile.setAlpha(1);
        }
      }
    });
  }

  initBook() {
    this.book = this.add
      .sprite(
        this.game.config.width * 0.5,
        this.game.config.height * 0.5,
        "Book_Flip_000"
      )
      .setDepth(-1);
    this.bookPlay = false;

    this.book.setDisplaySize(
      (this.game.config.height * 0.62 * 16) / 11,
      (this.game.config.height * 0.62 * 16) / 11
    );

    this.b_logo = this.add
      .image(
        this.book.x,
        this.book.y + (this.game.config.height * 0.62 * 16 * 0.3) / 11,
        "b_logo"
      )
      .setDepth(10)
      .setDisplaySize(
        this.game.config.width * 0.15,
        (this.game.config.width * 0.15 * 27) / 200
      )
      .setAlpha(0);

    // this.book.setInteractive();
    // this.book.on("pointerdown", () => {
    //   if (!this.bookPlay) {
    //     this.startMainGame();
    //   }
    // });
  }

  // LINE
  initDraw() {
    this.input.on("pointermove", (pointer) => {
      if (this.startDraw && this.startPoint) {
        let { x: startX, y: startY } = this.startPoint;
        this.endPoint = { x: pointer.x, y: pointer.y };
        this.drawLine(startX, startY, this.endPoint.x, this.endPoint.y);
      }
    });

    this.input.on("pointerup", () => {
      // check result
      if (this.result?.length > 0) {
        // reverse string
        let reverse_result = this.result.split("").reverse().join("");
        if (
          this.dictionary.includes(this.result) ||
          this.dictionary.includes(reverse_result)
        ) {
          let drawLine = {
            start: {
              x: null,
              y: null,
            },
            end: {
              x: null,
              y: null,
            },
          };
          this.collectedTile.forEach((element, index) => {
            const { width, height } = element;
            let scaleSize = (this.tileWidth * 1.4) / width;
            this.tweens.add({
              targets: element,
              duration: 500,
              scale: scaleSize,
              ease: "Power4",
              delay: index * 80,
              onComplete: () => {
                // let _element = this.add.sprite(
                //   element.x,
                //   element.y,
                //   element.letter
                // );

                // this.tweens.add({
                //   targets: _element,
                //   duration: 700,
                //   ease: "Power4",
                //   x: this.textPoint.x,
                //   y: this.textPoint.y,
                //   scale: this.tileWidth / width,
                //   onComplete: () => {
                //     _element.destroy();
                //   },
                // });

                this.tweens.add({
                  targets: element,
                  duration: 500,
                  ease: "Power4",
                  scale: this.tileWidth / width,
                });
              },
            });
          });
          switch (this.result) {
            case "montblanc":
              drawLine.start.x = this.tileGrid[0][8].x;
              drawLine.start.y = this.tileGrid[0][8].y;

              drawLine.end.x = this.tileGrid[8][0].x;
              drawLine.end.y = this.tileGrid[8][0].y;
              break;

            case "books":
              drawLine.start.x = this.tileGrid[0][7].x;
              drawLine.start.y = this.tileGrid[0][7].y;

              drawLine.end.x = this.tileGrid[4][7].x;
              drawLine.end.y = this.tileGrid[4][7].y;
              break;
            case "library":
              drawLine.start.x = this.tileGrid[7][2].x;
              drawLine.start.y = this.tileGrid[7][2].y;

              drawLine.end.x = this.tileGrid[7][8].x;
              drawLine.end.y = this.tileGrid[7][8].y;
              break;
            case "emertxe":
              drawLine.start.x = this.tileGrid[7][0].x;
              drawLine.start.y = this.tileGrid[7][0].y;

              drawLine.end.x = this.tileGrid[1][6].x;
              drawLine.end.y = this.tileGrid[1][6].y;
              break;
            case "iconic":
              drawLine.start.x = this.tileGrid[1][8].x;
              drawLine.start.y = this.tileGrid[1][8].y;

              drawLine.end.x = this.tileGrid[6][8].x;
              drawLine.end.y = this.tileGrid[6][8].y;
              break;
            case "words":
              drawLine.start.x = this.tileGrid[2][1].x;
              drawLine.start.y = this.tileGrid[2][1].y;

              drawLine.end.x = this.tileGrid[6][5].x;
              drawLine.end.y = this.tileGrid[6][5].y;
              break;
            case "gnitirw":
              drawLine.start.x = this.tileGrid[6][0].x;
              drawLine.start.y = this.tileGrid[6][0].y;

              drawLine.end.x = this.tileGrid[0][6].x;
              drawLine.end.y = this.tileGrid[0][6].y;
              break;
            case "story":
              drawLine.start.x = this.tileGrid[1][4].x;
              drawLine.start.y = this.tileGrid[1][4].y;

              drawLine.end.x = this.tileGrid[5][0].x;
              drawLine.end.y = this.tileGrid[5][0].y;
              break;
            case "literary":
              drawLine.start.x = this.tileGrid[0][1].x;
              drawLine.start.y = this.tileGrid[0][1].y;

              drawLine.end.x = this.tileGrid[7][8].x;
              drawLine.end.y = this.tileGrid[7][8].y;
              break;
            case "newyork":
              drawLine.start.x = this.tileGrid[8][1].x;
              drawLine.start.y = this.tileGrid[8][1].y;

              drawLine.end.x = this.tileGrid[8][7].x;
              drawLine.end.y = this.tileGrid[8][7].y;
              break;
          }

          // add point
          for (let i = 0; i < 15; i++) {
            // delay
            this.time.delayedCall(i * 25, () => {
              this.point += 2;
            });
          }

          this.tweens.add({
            targets: this.clue,
            alpha: 0,
            duration: 1000,
          });

          this.playHistory.push({
            point: this.point,
            time: new Date().getTime(),
          });

          // play sound
          this.sound.play("heightlight");

          this.textPoint.setText(11 - this.dictionary.length + "/10");

          this.drawLine3(
            drawLine.start.x,
            drawLine.start.y,
            drawLine.end.x,
            drawLine.end.y
          );

          this.dictionary = this.dictionary.filter((item) => {
            return item !== this.result && item !== reverse_result;
          });

          if (this.dictionary.length === 0) {
            this.endGame();
          }
        } else {
          console.log("not find");
        }
      }

      // other

      this.pathGraphics.clear();
      this.startDraw = false;
      this.startPoint = false;
      this.endPoint = false;
    });

    this.collectedPoints = [];
  }

  drawLine(startX, startY, endX, endY, clear = true) {
    let line = this.pathGraphics;
    line.setDepth(10);

    if (clear) {
      line.clear();
    }

    line.lineStyle(this.mainWidth * 0.08, 0xffffff);
    line.beginPath();
    line.moveTo(startX, startY);
    line.lineTo(endX, endY);
    // line with curve at the end and start of the line
    line.strokePath();
    line.setDepth(0);
    line.closePath();

    // draw half circle at the end of the line\
    let m = (endY - startY) / (endX - startX);
    let angle = Math.atan(m);

    // angle to 360

    line.beginPath();

    if (endX < startX) {
      line.arc(
        endX,
        endY,
        this.mainWidth * 0.04,
        0 + angle + Math.PI / 2,
        Math.PI + angle + Math.PI / 2,
        false
      );
    } else {
      line.arc(
        endX,
        endY,
        this.mainWidth * 0.04,
        0 + angle - Math.PI / 2,
        Math.PI + angle - Math.PI / 2,
        false
      );
    }

    line.fillStyle(0xffffff);
    line.fillPath();
    line.closePath();

    line.beginPath();

    if (endX > startX) {
      line.arc(
        startX,
        startY,
        this.mainWidth * 0.04,
        Math.PI / 2 + angle,
        (Math.PI * 3) / 2 + angle,
        false
      );
    } else {
      line.arc(
        startX,
        startY,
        this.mainWidth * 0.04,
        0 + angle - Math.PI / 2,
        Math.PI + angle - Math.PI / 2,
        false
      );
    }

    line.fillStyle(0xffffff);
    line.fillPath();
    line.closePath();
  }

  drawLine3(startX, startY, endX, endY, clear = false) {
    let line = this.partGraphics2;
    line.setDepth(10);
    if (clear) {
      line.clear();
    }

    line.lineStyle(this.mainWidth * 0.08, 0x008080, 0.4);
    line.beginPath();
    line.moveTo(startX, startY);
    line.lineTo(endX, endY);
    // line with curve at the end and start of the line
    line.strokePath();
    line.setDepth(0);
    line.closePath();

    // draw half circle at the end of the line\
    let m = (endY - startY) / (endX - startX);
    let angle = Math.atan(m);

    // angle to 360

    line.beginPath();

    if (endX < startX) {
      line.arc(
        endX,
        endY,
        this.mainWidth * 0.04,
        0 + angle + Math.PI / 2,
        Math.PI + angle + Math.PI / 2,
        false
      );
    } else {
      line.arc(
        endX,
        endY,
        this.mainWidth * 0.04,
        0 + angle - Math.PI / 2,
        Math.PI + angle - Math.PI / 2,
        false
      );
    }

    line.fillStyle(0x008080, 0.4);
    line.fillPath();
    line.closePath();

    line.beginPath();

    if (endX >= startX) {
      line.arc(
        startX,
        startY,
        this.mainWidth * 0.04,
        Math.PI / 2 + angle,
        (Math.PI * 3) / 2 + angle,
        false
      );
      console.log("startX", startX);
    } else {
      line.arc(
        startX,
        startY,
        this.mainWidth * 0.04,
        0 + angle - Math.PI / 2,
        Math.PI + angle - Math.PI / 2,
        false
      );
    }

    line.fillStyle(0x008080, 0.4);
    line.fillPath();
    line.closePath();
  }

  // TILE
  initTile() {
    for (let i = 0; i < this.tileGrid.length; i++) {
      for (let j = 0; j < this.tileGrid[i].length; j++) {
        let tile = this.addTile(i, j);
        this.tileGrid[i][j] = tile;
      }
    }
  }

  addTile(x, y) {
    //Choose a random tile to add
    let tileColor_length = this.tileColors.length;

    let tileLetter = this.tileGrid[x][y];

    let tileColor =
      this.tileColors[this.ramdom.integerInRange(0, tileColor_length - 1)];

    let tileToAdd = this.createTile(tileLetter, tileColor, x, y);

    return tileToAdd;
  }

  createTile(letter, color, x, y) {
    // create a sprite with a ALphebet letter in the center
    let tile = this.add.sprite(0, 0, letter);
    tile.setAlpha(0);
    tile.letter = letter;
    tile.color = color;
    tile.setDisplaySize(this.tileWidth, this.tileHeight);
    tile.setPosition(
      this.tileWidth * x + this.tileWidth / 2 + this.leftBuffer,
      this.tileHeight * y + this.tileHeight / 2 + this.topBuffer
    );

    tile.setInteractive();
    tile.on("pointerdown", () => {
      let { x, y } = tile;
      this.startDraw = true;
      this.startPoint = {
        x: x,
        y: y,
      };
    });

    // is hover
    tile.on("pointerover", (e) => {
      if (this.startDraw) {
        let vecA = this.endPoint;
        let vecB = { x: e.x, y: e.y };
        let theshold = 10;
        let dis_a_b = Math.sqrt(
          Math.pow(vecA.x - vecB.x, 2) + Math.pow(vecA.y - vecB.y, 2)
        );

        if (theshold > dis_a_b) {
          this.endPoint = vecB;
        }
      }
    });

    return tile;
  }

  reverseString(str) {
    return str.split("").reverse().join("");
  }

  update(e) {
    if (new Date().getTime() - this.currentTime > 1000 && this.startGame) {
      this.currentTime = new Date().getTime();
      if (parseInt(this.countDownText.text) > 0) {
        this.countDownText.setText(parseInt(this.countDownText.text) - 1);
      } else {
        // do something
        if (!this.gameIsEnd) {
          this.startGame = false;
          this.endGame();
        }
      }
    }

    if (this.startPoint && this.endPoint) {
      let { x: _startX, y: _startY } = this.startPoint;
      let { x: _endX, y: _endY } = this.endPoint;

      let startX = _startX;
      let startY = _startY;

      let endX = _endX;
      let endY = _endY;

      let m = (endY - startY) / (endX - startX);
      let mT = -1 / m;

      // set only Specific angle
      const array = [0, 45, 90, -45, -90];

      // find closest value
      const degree = Math.atan(m) * (180 / Math.PI);
      const closest = findClosestValue(array, degree);

      // check if the angle is close enough to a specific angle
      if (Math.abs(closest - degree) < 3) {
        let _result = "";
        let c = startY - m * startX;
        for (let i = 0; i < this.tileGrid.length; i++) {
          for (let j = 0; j < this.tileGrid[i].length; j++) {
            let tile = this.tileGrid[i][j];

            // find the engle of the tile
            let { x: tileX, y: tileY } = tile;

            let cT = tileY - mT * tileX;

            // find the intersection point
            let x = (cT - c) / (m - mT);
            let y = m * x + c;

            // check distance between the intersection point and the tile point
            let distance = Math.sqrt(
              Math.pow(tileX - x, 2) + Math.pow(tileY - y, 2)
            );

            // startToEndDis
            let startToEndDis = Math.sqrt(
              Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2)
            );

            let startToIntersectDis = Math.sqrt(
              Math.pow(x - startX, 2) + Math.pow(y - startY, 2)
            );

            let endToIntersectDis = Math.sqrt(
              Math.pow(x - endX, 2) + Math.pow(y - endY, 2)
            );

            if (
              distance < this.mainWidth * 0.03 &&
              startToEndDis > startToIntersectDis - this.boardWidth * 0.02 &&
              startToEndDis > endToIntersectDis - this.boardWidth * 0.02
            ) {
              _result += tile.letter;
              let _result_uppercse = _result.toUpperCase();

              // specific angle reverse
              if (closest === -45 && startX > endX) {
                _result_uppercse = this.reverseString(_result_uppercse);
              }
              this.indicatorText.setText(_result_uppercse);
              // check if the tile is already selected
              if (!this.collectedTile.includes(tile)) {
                this.collectedTile.push(tile);
              }
            } else {
              this.collectedTile = this.collectedTile.filter((item) => {
                return item !== tile;
              });
              tile.clearTint();
            }
          }
        }

        if (_result.length > 0) {
          this.result = _result;
        }
      }
    }
  }
}

// this.ramdom.integerInRange
