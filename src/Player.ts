import { EngineObject, gamepadStick, isUsingGamepad, keyIsDown, vec2, Vector2 } from './littlejs.esm.js'
import { Character } from "./Character";
import { setPlayerPos } from './main.js';

export class Player extends Character{  

  update()
  {
      this.moveInput = isUsingGamepad ? gamepadStick(0) : 
          vec2((keyIsDown('ArrowRight')?1:0) - (keyIsDown('ArrowLeft')?1:0), 
          (keyIsDown('ArrowUp')?1:0) - (keyIsDown('ArrowDown')?1:0));

      super.update();
      setPlayerPos(this.pos);
  }
}