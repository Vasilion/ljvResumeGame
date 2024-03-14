import Phaser from "phaser";

export default class Preloader extends Phaser.Scene {
  constructor() {
    super("preloader");
  }

  preload() {
    this.load.tilemapTiledJSON("level", "src/Levels/level01.json");
    this.load.image("tiles", "/Terrain/Ground/Tilemap_Elevation.png");
    this.load.image("tiles2", "/Terrain/Ground/Tilemap_Flat.png");
    this.load.image("tiles3", "/Terrain/Ground/Shadows.png");
    this.load.image("tiles4", "/Terrain/Water/Foam/Foam.png");
    this.load.image("tiles5", "/Terrain/Water/Water.png");
    this.load.image("tiles6", "/Terrain/Bridge/Bridge_All.png");

    this.load.aseprite(
      "player",
      "/Factions/Knights/Troops/Warrior/Blue/Warrior_Blue.png",
      "/Factions/Knights/Troops/Warrior/Blue/Warrior_Blue.json"
    );
  }
  create() {
    this.scene.start("game");
  }
}