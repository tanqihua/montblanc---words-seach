import Phaser from "phaser";
import { getNormal } from "./utils/index.js";
export class Game extends Phaser.Scene {
  constructor() {
    super("game");
  }

  init() {
    this.tileMap = [
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
    ];

    this.dragStartHandler = {
      start_pos: {
        x: null,
        y: null,
      },
      end_pos: {
        x: null,
        y: null,
      },
      dragStart: false,

      validLines: [],
    };

    this.pathGraphics = this.add.graphics();
  }

  preload() {}

  create() {
    this.handerBook();

    this.input.on("pointerdown", (e) => {
      this.dragStartHandler.dragStart = true;
      this.dragStartHandler.start_pos = {
        x: e.x,
        y: e.y,
      };
    });

    // point hover
    this.input.on("pointermove", (e) => {
      if (this.dragStartHandler.dragStart) {
        let n = getNormal(this.dragStartHandler.start_pos, {
          x: e.x - 20,
          y: e.y - 20,
        });

        let line = this.pathGraphics;
        line.clear();

        line.lineStyle(5, 0xff00ff, 1.0);
        line.beginPath();
        line.moveTo(
          this.dragStartHandler.start_pos.x - 20,
          this.dragStartHandler.start_pos.y - 20
        );
        line.lineTo(e.x + 20, e.y + 20);
        line.closePath();
        line.strokePath();

        line.beginPath();
        line.moveTo(
          this.dragStartHandler.start_pos.x + 20,
          this.dragStartHandler.start_pos.y + 20
        );

        line.lineTo(e.x + 20, e.y + 20);
        line.closePath();
        line.strokePath();
      }
    });

    // point up
    this.input.on("pointerup", (e) => {
      if (this.dragStartHandler.dragStart) {
        this.dragStartHandler.dragStart = false;
        this.dragStartHandler.end_pos = {
          x: e.x,
          y: e.y,
        };

        this.dragStartHandler.validLines.push({
          start: this.dragStartHandler.start_pos,
          end: {
            x: e.x,
            y: e.y,
          },
        });
      }
    });
  }

  handerBook() {
    let size = {
      width: this.game.config.width,
      height: this.game.config.width * 1.77,
    };

    // console.log(
    //   this.game.config.width * (1.77 - 0.24) - this.game.config.height * 0.65
    // );

    if (this.game.config.width > this.game.config.height) {
      size = {
        width: this.game.config.height * 0.56,
        height: this.game.config.height,
      };
    }
    this.book = this.add.sprite(
      this.game.config.width / 2,
      this.game.config.height / 2,
      "Book_Flip_000"
    );
    this.book.setDisplaySize(size.width, size.height);
    this.book.setDepth(-2);
    this.book.anims.play("flip");
  }

  update(e) {
    // if (this.dragStartHandler.validLines.length > 0) {
    //   for (let i = 0; i < this.dragStartHandler.validLines.length; i++) {
    //     const { start, end } = this.dragStartHandler.validLines[i];
    //     let line = this.pathGraphics;
    //     line.lineStyle(5, 0xff00ff, 1.0);
    //     line.beginPath();
    //     line.moveTo(start.x, start.y);
    //     line.lineTo(end.x, end.y);
    //     line.closePath();
    //     line.strokePath();
    //   }
    // }
  }
}
