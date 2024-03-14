import Phaser from "phaser";
import Game from "./game";
import Preloader from "./preloader";
export const gameConfig = {
  type: Phaser.AUTO,
  parent: "app",
  width: 1920,
  height: 1920,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: true,
    },
  },
  scene: [Preloader, Game],
  scale: {},
};
