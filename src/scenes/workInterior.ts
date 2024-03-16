export default class WorkInterior extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite;
  constructor() {
    super("workInterior");
  }

  create(): void {
    // Build Player
    this.anims.createFromAseprite("player");
    this.player = this.physics.add
      .sprite(980, 1820, "player")
      .play({ key: "Idle", repeat: -1 });
    // set hit box to feet for now, until i learn better way to deal with collisions.
    this.player.setSize(this.player.width * 0.05, this.player.height * 0.1);
  }
}
