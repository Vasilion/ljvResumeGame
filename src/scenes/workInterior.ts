import Player from "../player";
export default class WorkInterior extends Phaser.Scene {
  private player: Player;
  constructor() {
    super("workInterior");
  }

  create(): void {
    const map = this.make.tilemap({ key: "workInterior" });
    const tileSet = [
      map.addTilesetImage("Elevation", "tiles"),
      map.addTilesetImage("exit", "tiles3"),
      map.addTilesetImage("G_Idle", "tiles12"),
      map.addTilesetImage("interiors", "tiles10"),
      map.addTilesetImage("Props", "tiles11"),
    ];

    const layerBase = map.createLayer("base", tileSet);
    layerBase.setCollisionByProperty({ collides: true });

    const layerProps = map.createLayer("props", tileSet);
    layerProps.setCollisionByProperty({ collides: true });

    const layerOverProps = map.createLayer("overProps", tileSet);
    layerOverProps.setCollisionByProperty({ collides: true });

    // Use this to animate certain tiles after interaction

    // const layerActiveProps = map.createLayer("activeProps", tileSet);
    // layerActiveProps.setCollisionByProperty({ collides: true });

    const layerTrigger = map.createLayer("trigger", tileSet);
    layerTrigger.setCollisionByProperty({ collides: true });

    this.player = new Player(this, 640, 600);
    this.physics.add.collider(this.player, [layerBase, layerProps]);
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
  }

  private loadWorkGameScene(): void {
    this.scene.start("game", {
      isFirstLoad: false,
      playerX: 610,
      playerY: 1020,
    });
  }
}
