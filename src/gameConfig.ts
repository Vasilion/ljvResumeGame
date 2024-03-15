import Phaser from "phaser";
import Game from "./game";
import Preloader from "./preloader";
export const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: "app",
  width: window.innerWidth,
  height: window.innerHeight,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: true,
    },
  },
  dom: {
    createContainer: true,
  },
  scene: [Preloader, Game],
  scale: {},
};
