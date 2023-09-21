import Phaser from "phaser";
import { findClosestValue } from "./utils/index.js";
export class Game extends Phaser.Scene {
  constructor() {
    super("game");
  }

  init() {}

  preload() {}

  create() {
    this.mainWidth = (this.game.config.height * 0.65 * 11) / 16;

    if (window.innerWidth > window.innerHeight) {
      this.mainWidth = this.game.config.width * 0.35;
    }

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
  }
  // Layout
  initLayout() {
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
        // set text
        this.countDownText = this.add
          .text(
            this.game.config.width * 0.05,
            this.game.config.height * 0.05,
            "100",
            {
              fontSize: this.game.config.height * 0.05,
              fontFamily: "Montblant-bold",
              color: "#000",
            }
          )
          .setAlpha(1);

        this._countDownText = this.add
          .text(
            this.game.config.width * 0.05 + this.countDownText.width * 0.12,
            this.game.config.height * 0.05 - this.countDownText.height * 0.45,
            "TIME",
            {
              fontSize: this.game.config.height * 0.025,
              fontFamily: "Montblant",
              color: "#000",
            }
          )
          .setAlpha(1);

        // set text point
        this.textPoint = this.add
          .text(
            this.game.config.width * 0.95 - this.game.config.height * 0.07,
            this.game.config.height * 0.05,
            "00",
            {
              fontSize: this.game.config.height * 0.05,
              fontFamily: "Montblant",
              color: "#000",
            }
          )
          .setAlpha(1);

        this._textPoint = this.add
          .text(
            this.game.config.width * 0.95 - this.game.config.height * 0.08,
            this.game.config.height * 0.05 - this.textPoint.height * 0.45,
            "WORDS",
            {
              fontSize: this.game.config.height * 0.022,
              fontFamily: "Montblant",
              color: "#000",
            }
          )
          .setAlpha(1);

        this.clue = this.add
          .text(
            this.game.config.width * 0.5,
            this.game.config.height * 0.5 +
              ((this.game.config.height * 0.65 * 11) / 16) * 0.55,
            "none",
            {
              fontSize: this.game.config.height * 0.02,
              fontFamily: "Montblant",
              color: "#f00",
            }
          )
          .setOrigin(0.5)
          .setAlpha(1);
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

    this.icon.setInteractive();
    this.icon.on("pointerdown", () => {
      if (this.icon.alpha === 1) {
        this.clue.setText(this.getClue());
      }
    });

    // store sellected tile
    this.collectedTile = [];
  }

  // get clue
  getClue() {
    // random clue
    let random = this.ramdom.integerInRange(0, this.dictionary.length - 1);
    let clud = this.dictionary[random];
    return clud;
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

    // book animation
    this.book.anims.play("flip").on("animationcomplete", () => {
      this.textPoint.setAlpha(1);
      this.countDownText.setAlpha(1);
      this.icon.setAlpha(1);

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

    this.book.setInteractive();
    this.book.on("pointerdown", () => {
      if (!this.bookPlay) {
        this.startMainGame();
      }
    });
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

          this.drawLine3(
            drawLine.start.x,
            drawLine.start.y,
            drawLine.end.x,
            drawLine.end.y
          );

          this.dictionary = this.dictionary.filter((item) => {
            return item !== this.result && item !== reverse_result;
          });
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
    let line = this.add.graphics();
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
    tile.setAlpha(1);
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

  update(e) {
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
