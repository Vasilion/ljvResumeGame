import Phaser from "phaser";
export default class Preloader extends Phaser.Scene {
  constructor() {
    super("preloader");
  }

  preload() {
    this.load.tilemapTiledJSON("level", "src/Levels/level01.json");
    this.load.tilemapTiledJSON("workInterior", "src/Levels/workInterior.json");
    this.load.image("tiles", "/Terrain/Ground/Tilemap_Elevation.png");
    this.load.image("tiles2", "/Terrain/Ground/Tilemap_Flat.png");
    this.load.image("tiles3", "/Terrain/Ground/Shadows.png");
    this.load.image("tiles4", "/Terrain/Water/Foam/Foam.png");
    this.load.image("tiles5", "/Terrain/Water/Water.png");
    this.load.image("tiles6", "/Terrain/Bridge/Bridge_All.png");
    this.load.image(
      "tiles7",
      "/Factions/Knights/Buildings/Castle/Castle_Blue.png"
    );
    this.load.image("tiles8", "/Factions/Knights/Troops/Dead/Dead.png");
    this.load.image(
      "tiles9",
      "/Factions/Goblins/Buildings/Wood_Tower/Wood_Tower_Red.png"
    );
    this.load.image("boss_sign", "/Deco/16.png");
    this.load.image("tiles10", "/Interrior/Floors_furnitures2x.png");
    this.load.image("tiles11", "/Texture/TX Props2x.png");
    this.load.image("tiles12", "/Resources/Resources/G_idle.png");

    this.load.aseprite(
      "player",
      "/Factions/Knights/Troops/Warrior/Blue/Warrior_Blue.png",
      "/Factions/Knights/Troops/Warrior/Blue/Warrior_Blue.json"
    );
  }
  create() {
    this.scene.start("game", {
      isFirstLoad: true,
      playerX: 980,
      playerY: 1820,
    });
  }
}
