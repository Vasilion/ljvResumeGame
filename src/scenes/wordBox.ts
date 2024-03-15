export default class WordBox extends Phaser.Scene {
  private message: string = "Hello";
  constructor() {
    super("wordBox");
  }

  create(data): void {
    const graphics = this.add.graphics();
    const rectX = 430; // Adjust X position as needed
    const rectY = window.innerHeight / 2; // Adjust Y position as needed
    const rectWidth = window.innerWidth / 1.5; // Width of the background rectangle
    const rectHeight = 100;

    // Set the fill style for the background rectangle
    graphics.fillStyle(0x000000, 0.7); // Black color with 70% opacity

    // Draw the background rectangle behind the text
    graphics.fillRect(rectX, rectY, rectWidth, rectHeight);

    // Text Setup
    this.message = data.text;
    const text = this.add.text(
      window.innerWidth / 2,
      window.innerHeight / 2 + 50,
      "",
      {
        fontFamily: "Arial", // Example font family
        fontSize: "24px",
        color: "#ffffff",
      }
    );
    this.time.addEvent({
      delay: 20000,
      callback: this.endScene,
      callbackScope: this,
    });

    text.setOrigin(0.5);

    this.animateText(text, this.message);
  }

  // Function to end the scene
  private endScene(): void {
    // Stop this scene and return to the previous scene (if any)
    this.scene.stop("wordBox");
  }

  private animateText(text: Phaser.GameObjects.Text, msg: string): void {
    let index = 0;
    const interval = 50; // Time between each letter (in milliseconds)

    this.time.addEvent({
      delay: interval,
      repeat: msg.length - 1,
      callback: () => {
        text.text += msg[index];
        index++;
      },
    });
  }
}
