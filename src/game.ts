import Phaser from "phaser";
import { gameConfig } from "./gameConfig";
export default class Game extends Phaser.Scene {
  config = {
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
  constructor() {
    super("game");
  }

  preload() {
    this.load.tilemapTiledJSON("level", "src/Levels/level01.json");
    this.load.image("tiles", "public/Terrain/Ground/Tilemap_Elevation.png");
    this.load.image("tiles2", "public/Terrain/Ground/Tilemap_Flat.png");
    this.load.image("tiles3", "public/Terrain/Ground/Shadows.png");
    this.load.image("tiles4", "public/Terrain/Water/Foam/Foam.png");
    this.load.image("tiles5", "public/Terrain/Water/Water.png");
    this.load.image("tiles6", "public/Terrain/Bridge/Bridge_All.png");
  }

  create() {
    // Set up game objects and logic here
    const map = this.make.tilemap({ key: "level" });
    const tileSet = [
      map.addTilesetImage("Elevation", "tiles"),
      map.addTilesetImage("ground", "tiles2"),
      map.addTilesetImage("Shadows", "tiles3"),
      map.addTilesetImage("water-Foam", "tiles4"),
      map.addTilesetImage("water", "tiles5"),
      map.addTilesetImage("Bridges", "tiles6"),
    ];

    const layerUnder = map.createLayer("under", tileSet);
    layerUnder.setCollisionByProperty({ collides: true });
    const layerShadow = map.createLayer("shadows", tileSet);
    layerShadow.setCollisionByProperty({ collides: true });
    const layerBase = map.createLayer("base", tileSet);
    layerBase.setCollisionByProperty({ collides: true });
    const layerAbove = map.createLayer("above", tileSet);
    layerAbove.setCollisionByProperty({ collides: true });
  }
}
