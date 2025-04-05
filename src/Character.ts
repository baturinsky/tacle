import { drawTile, EngineObject, vec2, Vector2 } from './littlejs.esm.js'
import { spriteAtlas } from './main.js';
import { Tentacler } from './Tentacler.js';

export class Character extends EngineObject {
  moveInput: Vector2
  frame = 0
  direction = 1

  constructor(pos: Vector2) {
    super(pos, vec2(.7, .7))
    this.drawSize = this.size;
    this.setCollision(true, false);
    this.renderOrder = 1;
  }

  update() {
    const moveInput = this.moveInput.copy();

    if (moveInput.length() > 0) {
      this.frame++;
      if (this.direction * moveInput.x < 0) {
        this.direction = Math.sign(moveInput.x)
        this.mirror = this.direction < 0;
      }
    }

    this.velocity = this.velocity.multiply(vec2(.5)).add(vec2(.05 * moveInput.x, .05 * moveInput.y));

    /*let dx = this.pos.x - Math.floor(this.pos.x);
    if (dx < 0.03 && dx > 0.97) {
    } else {
      if (dx < 0.1)
        this.velocity.x -= 0.01;
      else if (dx > 0.9)
        this.velocity.x += 0.01;
    }*/

    super.update();
  }

  render() {
    this.tileInfo = spriteAtlas.player.frame(~~((this.frame % 20) / 10));
    drawTile(this.pos, this.drawSize, this.tileInfo, this.color, this.angle, this.mirror);
  }

  collideWithObject(object: EngineObject): boolean {
    if(object instanceof Tentacler){
      //debugger
    }
    return super.collideWithObject(object)
  }
}