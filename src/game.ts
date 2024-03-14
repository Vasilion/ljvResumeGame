import Phaser from "phaser";
export default class Game extends Phaser.Scene {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private player!: Phaser.Physics.Arcade.Sprite;
  constructor() {
    super("game");
  }
  preload() {
    this.cursors = this.input.keyboard.createCursorKeys();
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
    const layerWalls = map.createLayer("walls", tileSet);
    layerAbove.setCollisionByProperty({ collides: true });

    const debugGraphics = this.add.graphics().setAlpha(0.7);
    layerWalls.renderDebug(debugGraphics, {
      tileColor: null,
      collidingTileColor: new Phaser.Display.Color(243, 243, 48),
      faceColor: new Phaser.Display.Color(40, 39, 37, 255),
    });

    this.anims.createFromAseprite("player");
    this.player = this.physics.add
      .sprite(980, 820, "player")
      .play({ key: "Idle", repeat: -1 });

    this.physics.add.collider(this.player, layerWalls);
  }

  update(time: number, delta: number): void {
    const speed = 200;
    if (!this.cursors || !this.player) {
      return;
    }

    if (this.cursors.left?.isDown) {
      this.player.anims.play("Run", true);
      this.player.setVelocity(-speed, 0);
      this.player.scaleX = -1;
    } else if (this.cursors.right?.isDown) {
      this.player.anims.play("Run", true);
      this.player.setVelocity(speed, 0);
      this.player.scaleX = 1;
    } else if (this.cursors.up?.isDown) {
      this.player.anims.play("Run", true);
      this.player.setVelocity(0, -speed);
    } else if (this.cursors.down?.isDown) {
      this.player.anims.play("Run", true);
      this.player.setVelocity(0, speed);
    } else {
      this.player.anims.chain("Idle");
      this.player.setVelocity(0, 0);
    }
  }
}
