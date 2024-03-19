import Phaser from "phaser";
export default class Player extends Phaser.Physics.Arcade.Sprite {
  public player!: Phaser.Physics.Arcade.Sprite;
  public scene: Phaser.Scene;
  private startX: number;
  private startY: number;
  private isAttacking: boolean;
  private downKey: Phaser.Input.Keyboard.Key;
  private upKey: Phaser.Input.Keyboard.Key;
  private rightKey: Phaser.Input.Keyboard.Key;
  private leftKey: Phaser.Input.Keyboard.Key;
  private spaceKey: Phaser.Input.Keyboard.Key;
  private aKey: Phaser.Input.Keyboard.Key;
  private sKey: Phaser.Input.Keyboard.Key;
  private wKey: Phaser.Input.Keyboard.Key;
  private dKey: Phaser.Input.Keyboard.Key;
  private eKey: Phaser.Input.Keyboard.Key;

  constructor(scene: Phaser.Scene, x, y) {
    super(scene, x, y, "player");
    this.scene = scene;
    this.startX = x;
    this.startY = y;
    this.buildPlayer();
    this.setupAnimationsAndMovement();
  }

  private setKeyBinds(): void {
    this.downKey = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.DOWN
    );
    this.upKey = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.UP
    );
    this.rightKey = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.RIGHT
    );
    this.leftKey = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.LEFT
    );
    this.spaceKey = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    this.aKey = this.scene.input.keyboard.addKey("A");
    this.sKey = this.scene.input.keyboard.addKey("S");
    this.wKey = this.scene.input.keyboard.addKey("W");
    this.dKey = this.scene.input.keyboard.addKey("D");
    this.eKey = this.scene.input.keyboard.addKey("E");
  }

  private buildPlayer(): void {
    this.scene.anims.createFromAseprite("player");
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    this.play({ key: "Idle", repeat: -1 });

    // set hit box to feet for now, until i learn better way to deal with collisions.
    this.setSize(this.width * 0.05, this.height * 0.1);
  }

  public setupAnimationsAndMovement(): void {
    const speed = 300;
    this.setKeyBinds();

    // Movement
    if (this.leftKey.isDown || this.aKey.isDown) {
      this.playMoveAnimation();
      this.setVelocity(-speed, 0);
      this.scaleX = -1;
      this.setOffset(115, 110);
    } else if (this.rightKey.isDown || this.dKey.isDown) {
      this.playMoveAnimation();
      this.setVelocity(speed, 0);
      this.scaleX = 1;
      this.setOffset(105, 110);
    } else if (this.upKey.isDown || this.wKey.isDown) {
      this.playMoveAnimation();
      this.setVelocity(0, -speed);
    } else if (this.downKey.isDown || this.sKey.isDown) {
      this.playMoveAnimation();
      this.setVelocity(0, speed);
    } else {
      this.anims.chain("Idle");
      this.setVelocity(0, 0);
    }

    // Attack
    if (this.spaceKey.isDown) {
      this.attack();
    }

    // handle clicks
    this.scene.input.on("pointerdown", () => {
      this.attack();
    });
  }

  private attack(): void {
    if (!this.isAttacking) {
      this.isAttacking = true;
      if (this.downKey.isDown || this.sKey.isDown) {
        this.anims.play({ key: "Attack_3", frameRate: 30 });
      } else if (this.upKey.isDown || this.wKey.isDown) {
        this.anims.play({ key: "Attack_5", frameRate: 30 });
      } else {
        this.anims.play({ key: "Attack_2", frameRate: 30 });
      }

      this.once("animationcomplete", () => {
        this.isAttacking = false;
        this.playMoveAnimation();
      });
    }
  }

  private playMoveAnimation(): void {
    if (!this.isAttacking) {
      this.anims.play("Run", true);
    }
  }
}
