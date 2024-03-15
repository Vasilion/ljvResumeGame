import Phaser from "phaser";
import WordBox from "./scenes/wordBox";
export default class Game extends Phaser.Scene {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private player!: Phaser.Physics.Arcade.Sprite;
  private isAttacking: boolean;

  constructor() {
    super("game");
  }
  preload(): void {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  create(): void {
    // Set up game objects and logic here
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

    map.setCollisionByProperty({ collides: true });

    // Layer Debug

    // const debugGraphics = this.add.graphics().setAlpha(0.7);
    // layerWalls.renderDebug(debugGraphics, {
    //   tileColor: null,
    //   collidingTileColor: new Phaser.Display.Color(243, 243, 48),
    //   faceColor: new Phaser.Display.Color(40, 39, 37, 255),
    // });

    // Build Player
    this.anims.createFromAseprite("player");
    this.player = this.physics.add
      .sprite(980, 1820, "player")
      .play({ key: "Idle", repeat: -1 });
    // set hit box to feet for now, until i learn better way to deal with collisions.
    this.player.setSize(this.player.width * 0.05, this.player.height * 0.1);

    this.physics.add.collider(this.player, [
      layerWalls,
      layerUnder,
      layerAbove,
      layerBase,
    ]);

    //Launch UI Scenes
    this.createTextBox(
      "Hi, Welcome to Luke Vasilion's interactive resume. Pick up all 3 power-ups to unlock and defeat the 'Interview' boss."
    );
  }

  update(time: number, delta: number): void {
    const speed = 300;
    if (!this.cursors || !this.player) {
      return;
    }

    // Movement
    if (this.cursors.left?.isDown) {
      this.playMoveAnimation();
      this.player.setVelocity(-speed, 0);
      this.player.scaleX = -1;
      this.player.setOffset(115, 110);
    } else if (this.cursors.right?.isDown) {
      this.playMoveAnimation();
      this.player.setVelocity(speed, 0);
      this.player.scaleX = 1;
      this.player.setOffset(105, 110);
    } else if (this.cursors.up?.isDown) {
      this.playMoveAnimation();
      this.player.setVelocity(0, -speed);
    } else if (this.cursors.down?.isDown) {
      this.playMoveAnimation();
      this.player.setVelocity(0, speed);
    } else {
      this.player.anims.chain("Idle");
      this.player.setVelocity(0, 0);
    }

    // Attack
    if (this.cursors.space?.isDown) {
      this.attack();
    }

    // Camera
    this.cameras.main.startFollow(this.player, true, 1, 1, 20, -150);
  }

  private attack(): void {
    if (!this.isAttacking) {
      this.isAttacking = true;
      if (this.cursors.down?.isDown) {
        this.player.anims.play({ key: "Attack_3", frameRate: 30 });
      } else if (this.cursors.up?.isDown) {
        this.player.anims.play({ key: "Attack_5", frameRate: 30 });
      } else {
        this.player.anims.play({ key: "Attack_2", frameRate: 30 });
      }

      this.player.once("animationcomplete", () => {
        this.isAttacking = false;
        this.playMoveAnimation();
      });
    }
  }

  private playMoveAnimation(): void {
    if (!this.isAttacking) {
      this.player.anims.play("Run", true);
    }
  }

  private createTextBox(msg: string): void {
    this.scene.launch("wordBox", { text: msg });
  }
}
