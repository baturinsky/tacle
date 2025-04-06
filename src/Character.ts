import { Color, drawRect, drawText, drawTile, EngineObject, vec2, Vector2 } from './littlejs.esm.js'
import { scramble, setLevel, spriteAtlas, tentaclers } from './main.js';
import { Tentacler } from './Tentacler.js';

export class Character extends EngineObject {
  moveInput: Vector2
  frame = 0
  direction = 1
  caughtBy: Tentacler | null;

  constructor(pos: Vector2) {
    super(pos, vec2(.7, .7))
    this.drawSize = vec2(.7, .7);
    this.setCollision(true, false);
    this.renderOrder = 1;
  }

  update() {
    if (this.caughtBy)
      return;
    const moveInput = this.moveInput.copy();

    if (moveInput.length() > 0) {
      this.frame++;
      if (this.direction * moveInput.x < 0) {
        this.direction = Math.sign(moveInput.x)
        this.mirror = this.direction < 0;
      }
    }

    let a = .5, b = .025;
    this.velocity = this.velocity.multiply(vec2(a)).add(vec2(b * moveInput.x, b * moveInput.y));

    this.caughtBy = null;

    for (let t of tentaclers) {
      for (let i = 0; i < t.tacleLength; i++) {
        let p = t.tacle[i]
        if (p?.distance(this.pos) < 0.7) {
          if (!this.caughtBy) {
            setTimeout(() => setLevel(), 1000)
          }
          this.caughtBy = t;
        }
      }
    }

    super.update();
  }

  render() {
    this.tileInfo = spriteAtlas.player.frame(~~((this.frame % 20) / 10));
    //this.color = this.caughtBy ? new Color(1, 0, 0) : new Color(1, 1, 1);    
    drawTile(this.pos, this.drawSize, this.tileInfo, this.color, this.angle, this.mirror);
    if (this.caughtBy) {
      drawRect(this.pos.add(scramble(vec2(-0.5, 0), 0.3)), scramble(vec2(3, 2), 0.3), new Color(0, 0, 0));
    }
  }

  collideWithObject(object: EngineObject): boolean {
    if (object instanceof Tentacler) {
      //debugger
    }
    return super.collideWithObject(object)
  }
}