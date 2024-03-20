import Phaser from "phaser";
import Player from "./player";
export default class Game extends Phaser.Scene {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private player!: Player;
  private isFirstLoad: boolean;
  private playerX: number;
  private playerY: number;

  constructor() {
    super("game");
  }
  preload(): void {}

  init(data) {
    this.isFirstLoad = data.isFirstLoad;
    this.playerX = data.playerX;
    this.playerY = data.playerY;
  }

  create(): void {
    // Set up game objects and logic here
    this.buildMap();

    //Launch UI Scenes
    this.createOpeningTextBox(
      "Hi, Welcome to Luke Vasilion's interactive resume. Pick up all 3 power-ups to unlock and defeat the 'Interview' boss."
    );
  }

  update(time: number, delta: number): void {
    // Camera
    this.cameras.main.startFollow(this.player, true, 1, 1, 20, -150);
    if (!this.cursors || !this.player) {
      return;
    }
    this.player.setupAnimationsAndMovement();
  }

  private createOpeningTextBox(msg: string): void {
    if (this.isFirstLoad) {
      this.player.setVelocity(0, 0);
      this.scene.launch("wordBox", { text: msg, time: 7000 });
      this.time.addEvent({
        delay: 7000,
        callback: this.standBy,
        callbackScope: this,
      });
    }
  }

  private loadWorkInteriorScene(): void {
    this.scene.start("workInterior");
  }

  private standBy(): void {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  private buildMap(): void {
    const map = this.make.tilemap({ key: "level" });
    const tileSet = [
      map.addTilesetImage("Elevation", "tiles"),
      map.addTilesetImage("ground", "tiles2"),
      map.addTilesetImage("Shadows", "tiles3"),
      map.addTilesetImage("water-Foam", "tiles4"),
      map.addTilesetImage("water", "tiles5"),
      map.addTilesetImage("Bridges", "tiles6"),
      map.addTilesetImage("Castle_Blue", "tiles7"),
      map.addTilesetImage("Dead", "tiles8"),
      map.addTilesetImage("Goblin_House", "tiles9"),
      map.addTilesetImage("boss_sign", "boss_sign"),
    ];

    const layerUnder = map.createLayer("under", tileSet);
    layerUnder.setCollisionByProperty({ collides: true });

    const layerShadow = map.createLayer("shadows", tileSet);
    layerShadow.setCollisionByProperty({ collides: true });

    const layerBase = map.createLayer("base", tileSet);
    layerBase.setCollisionByProperty({ collides: true });

    const layerAbove = map.createLayer("above", tileSet);
    layerAbove.setCollisionByProperty({ collides: true });

    const layerWalls = map.createLayer("walls", tileSet);
    layerWalls.setCollisionByProperty({ collides: true });

    const layertrigger = map.createLayer("trigger", tileSet);
    layertrigger.setCollisionByProperty({ collides: true });

    const layerbossWarn = map.createLayer("bossWarn", tileSet);
    layerbossWarn.setCollisionByProperty({ collides: true });
    layerbossWarn.setInteractive();

    this.interactWithBossSign(layerbossWarn, map);

    // This has to happen here due to positioning
    this.player = new Player(this, this.playerX, this.playerY);

    // Wall Collisions
    this.physics.add.collider(this.player, [
      layerWalls,
      layerUnder,
      layerAbove,
      layerBase,
      layerbossWarn,
    ]);

    // Trigger Collisions
    this.physics.add.collider(
      this.player,
      layertrigger,
      this.loadWorkInteriorScene,
      null,
      this
    );
  }

  private interactWithBossSign(
    tileMapLayer: Phaser.Tilemaps.TilemapLayer,
    map: Phaser.Tilemaps.Tilemap
  ): void {
    this.input.keyboard.on("keydown-E", () => {
      // Convert player's position to tile coordinates
      const playerTileX = tileMapLayer.worldToTileX(this.player.x);
      const playerTileY = tileMapLayer.worldToTileY(this.player.y);

      // Get the tile at the player's position
      const clickedTile = map.getTileAt(
        playerTileX,
        playerTileY,
        true,
        tileMapLayer
      );

      // Check if the clicked tile exists and is clickable
      if (clickedTile && clickedTile.properties.clickable) {
        // Perform actions based on the clicked tile
        this.cursors = null;
        this.scene.launch("wordBox", {
          text: "The Interview Awaits Within.",
          time: 3000,
        });
        this.time.addEvent({
          delay: 3000,
          callback: this.standBy,
          callbackScope: this,
        });
      }
    });
  }
}
