import Phaser from "phaser";

export class Game extends Phaser.Scene {
  constructor() {
    super("game");
  }

  init() {
    let style = {
      font: "32px Arial",
      fill: "#ffffff",
      align: "center",
    };
  }

  preload() {}

  create() {
    this.mainWidth = this.game.config.width;

    if (window.innerWidth > window.innerHeight) {
      this.mainWidth = this.game.config.width * 0.35;
    }

    let world = "nihao";

    // get dictionary
    this.dictionary = this.cache.text.get("directory");
    this.dictionary = this.dictionary.split("\n");

    this.dictionary = this.dictionary.map((item) => {
      return item.trim();
    });

    if (this.dictionary.includes(world)) {
      console.log("find");
    } else {
      console.log("not find");
    }

    // hander draw line
    this.startDraw = false;
    this.startPoint = false;
    this.endPoint = false;
    this.pathGraphics = this.add.graphics();

    // 设置画布
    this.tileLetters = [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
    ];

    // set tile color
    this.tileColors = ["#fff"];

    // set tile size
    this.tileWidth = this.mainWidth * 0.12;
    this.tileHeight = this.mainWidth * 0.12;

    // this will hold all of our tile sprites
    this.tileGroup = this.add.group();

    //create whatevet shape you like
    this.tileGrid = [
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
    ];

    // broad with and height
    this.boardWidth = this.tileGrid[0].length * this.tileWidth;
    this.boardHeight = this.tileGrid.length * this.tileHeight;

    // encore the tile grid
    this.leftBuffer =
      this.game.config.width / 2 - this.boardWidth / 2 + this.boardWidth * 0.02;

    this.topBuffer = this.game.config.height / 2 - this.boardHeight / 2;

    let seen = new Date().now;
    this.ramdom = new Phaser.Math.RandomDataGenerator([seen]);

    // init tile
    this.initBook();
    this.initTile();
    this.initDraw();
  }

  initBook() {
    this.book = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      "Book_Flip_000"
    );
    this.bookPlay = false;
    this.book.setDisplaySize(this.mainWidth, this.mainWidth * 1.77);
    this.book.setInteractive();
    this.book.on("pointerdown", () => {
      // book played
      if (!this.bookPlay) {
        this.bookPlay = true;
        this.book.anims.play("flip").on("animationcomplete", () => {
          for (let tiles of this.tileGrid) {
            for (let tile of tiles) {
              tile.setAlpha(1);
            }
          }
        });
      }
    });
  }

  initDraw() {
    this.input.on("pointermove", (pointer) => {
      if (this.startDraw && this.startPoint) {
        let { x: startX, y: startY } = this.startPoint;
        this.endPoint = { x: pointer.x, y: pointer.y };
        this.drawLine(startX, startY, this.endPoint.x, this.endPoint.y);
      }
    });

    this.input.on("pointerup", (pointer) => {
      this.pathGraphics.clear();
      this.startDraw = false;
      this.startPoint = false;
      this.endPoint = false;
    });
  }

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
    let tileLetters_length = this.tileLetters.length;
    let tileColor_length = this.tileColors.length;

    let tileLetter =
      this.tileLetters[this.ramdom.integerInRange(0, tileLetters_length - 1)];

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

  drawLine(startX, startY, endX, endY) {
    let line = this.pathGraphics;
    line.setDepth(10);
    line.clear();

    line.lineStyle(5, 0xff00ff, 1.0);
    line.beginPath();
    line.moveTo(startX, startY);
    line.lineTo(endX, endY);
    line.closePath();
    line.strokePath();
  }

  findClosestValue(array, degree) {
    // Initialize variables to keep track of the closest value and its difference
    let closestValue = array[0];
    let minDifference = Math.abs(degree - array[0]);

    // Iterate through the array
    for (let i = 1; i < array.length; i++) {
      const currentDifference = Math.abs(degree - array[i]);

      // Check if the current element has a smaller difference
      if (currentDifference < minDifference) {
        closestValue = array[i];
        minDifference = currentDifference;
      }
    }

    return closestValue;
  }

  update(e) {
    if (this.startDraw && this.startPoint && this.endPoint) {
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
      const closest = this.findClosestValue(array, degree);

      // check if the angle is close enough to a specific angle
      if (Math.abs(closest - degree) < 3) {
        let c = startY - m * startX;

        console.log("====================================");
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

            let startDis = Math.sqrt(Math.pow(startX, 2) + Math.pow(startY, 2));
            let endDis = Math.sqrt(Math.pow(endX, 2) + Math.pow(endY, 2));
            let tileDis = Math.sqrt(Math.pow(tileX, 2) + Math.pow(tileY, 2));

            if (startDis > endDis) {
              if (
                distance < this.mainWidth * 0.03 &&
                endDis <= tileDis &&
                startDis >= tileDis
              ) {
                tile.setTint(0xff0000);
              } else {
                tile.clearTint();
              }
            } else if (
              distance < this.mainWidth * 0.03 &&
              endDis >= tileDis &&
              startDis <= tileDis
            ) {
              tile.setTint(0xff0000);
            } else {
              tile.clearTint();
            }
          }
        }
      }
    }
  }
}

// this.ramdom.integerInRange
