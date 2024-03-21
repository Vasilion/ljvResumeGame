import Player from "../player";
export default class WorkInterior extends Phaser.Scene {
  private player: Player;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private map: Phaser.Tilemaps.Tilemap;
  private tileSet: Phaser.Tilemaps.Tileset[];
  private baseLayer: Phaser.Tilemaps.TilemapLayer;
  private propsLayer: Phaser.Tilemaps.TilemapLayer;
  constructor() {
    super("workInterior");
  }

  create(): void {
    this.map = this.make.tilemap({ key: "workInterior" });
    this.tileSet = [
      this.map.addTilesetImage("Elevation", "tiles"),
      this.map.addTilesetImage("exit", "tiles3"),
      this.map.addTilesetImage("G_Idle", "tiles12"),
      this.map.addTilesetImage("interiors", "tiles10"),
      this.map.addTilesetImage("Props", "tiles11"),
    ];

    this.baseLayer = this.map.createLayer("base", this.tileSet);
    this.baseLayer.setCollisionByProperty({ collides: true });

    this.propsLayer = this.map.createLayer("props", this.tileSet);
    this.propsLayer.setCollisionByProperty({ collides: true });

    const layerOverProps = this.map.createLayer("overProps", this.tileSet);
    layerOverProps.setCollisionByProperty({ collides: true });

    // Use this to animate certain tiles after interaction

    const layerTrigger = this.map.createLayer("trigger", this.tileSet);
    layerTrigger.setCollisionByProperty({ collides: true });

    this.player = new Player(this, 640, 600);
    this.physics.add.collider(this.player, [this.baseLayer, this.propsLayer]);
    this.physics.add.collider(
      this.player,
      layerTrigger,
      this.loadWorkGameScene,
      null,
      this
    );
    this.cameras.main.startFollow(this.player, true, 1, 1, 20, -150);
  }

  update(time: number, delta: number): void {
    this.player.setupAnimationsAndMovement();
    this.interactWithObject(this.map);
  }

  private loadWorkGameScene(): void {
    this.scene.start("game", {
      isFirstLoad: false,
      playerX: 610,
      playerY: 1020,
    });
  }

  private standBy(): void {
    this.scene.resume("workInteior");
  }

  private interactWithObject(map: Phaser.Tilemaps.Tilemap): void {
    this.input.keyboard.on("keydown-E", () => {
      // Convert player's position to tile coordinates
      const playerTileX = this.propsLayer.worldToTileX(this.player.x);
      const playerTileY = this.propsLayer.worldToTileY(this.player.y);

      // Get the tile at the player's position
      const clickedTile = map.getTileAt(
        playerTileX,
        playerTileY,
        true,
        this.propsLayer
      );

      // Check if the clicked tile exists and is clickable
      if (clickedTile && clickedTile.properties.clickable) {
        console.log(clickedTile);
        // Perform actions based on the clicked tile
        const layerActiveProps = map.createLayer("activeProps", this.tileSet);
        this.cursors = null;
        this.scene
          .launch("wordBox", {
            text: "Resume Art Here.",
            time: 3000,
          })
          .bringToTop("wordBox");
        this.time.addEvent({
          delay: 5000,
          callback: this.standBy,
          callbackScope: this,
        });
      }
    });
  }
}
