import Phaser from "phaser";
import Game from "./game";
export const gameConfig = {
  type: Phaser.AUTO,
  parent: "app",
  width: 1920,
  height: 1920,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
    },
  },
  scene: [Game],
  scale: {},
};
