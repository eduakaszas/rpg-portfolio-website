export class AnimationTicker {
  interval: any = null;
  horizontalTiles: number = 4;
  verticalTiles: number = 4;
  numberOfTiles: number = this.horizontalTiles * this.verticalTiles;
  currentTile: number = 0;
  texture: any;
  upKeyActive: boolean = false;
  rightKeyActive: boolean = false;
  downKeyActive: boolean = false;
  leftKeyActive: boolean = false;

  // constructor() {}

  SetUp(inTexture: any) {
    this.texture = inTexture;
    this.texture.repeat.set(1 / this.horizontalTiles, 1 / this.verticalTiles);
  }

  MoveSprite() {
    this.currentTile++;

    let currentRow = 1;
    if (this.upKeyActive) currentRow = 3;
    if (this.rightKeyActive) currentRow = 2;
    if (this.downKeyActive) currentRow = 1;
    if (this.leftKeyActive) currentRow = 4;

    if (this.currentTile === this.numberOfTiles) this.currentTile = 0;

    const currentColumn = this.currentTile % this.horizontalTiles;
    this.texture.offset.x = currentColumn / this.horizontalTiles;
    this.texture.offset.y =
      this.verticalTiles - currentRow / this.verticalTiles;
  }

  Tick() {
    this.MoveSprite();
  }

  Start() {
    if (this.interval) this.Stop();

    this.interval = setInterval(this.Tick.bind(this), 500);
    console.log(this.interval);
    this.Tick();
  }

  Stop() {
    clearInterval(this.interval);
  }
}
