import Phaser from "phaser";
import Game from "./game";
import Preloader from "./preloader";
import WordBox from "./scenes/wordBox";
import WorkInterior from "./scenes/workInterior";
export const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: "app",
  width: window.innerWidth,
  height: window.innerHeight,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  dom: {
    createContainer: true,
  },
  scene: [Preloader, Game, WordBox, WorkInterior],
  scale: {},
};
