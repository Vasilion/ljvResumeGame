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
    ];

    const layerBase = map.createLayer("base", tileSet);
    layerBase.setCollisionByProperty({ collides: true });

    const layerTrigger = map.createLayer("trigger", tileSet);
    layerTrigger.setCollisionByProperty({ collides: true });

    this.player = new Player(this, 1024, 1216);
    this.physics.add.collider(this.player, [layerBase]);
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
    this.scene.start("game");
  }
}
