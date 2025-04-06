import { levelsString } from 'easystarjs/levels.js';
import { tile, vec2, hsl, setShowSplashScreen, EngineObject, randColor, drawTextScreen, engineInit, mainCanvasSize, setCanvasFixedSize, cameraPos, Color, drawRect, setCameraPos, mousePos, clamp, canvasFixedSize, max, min, mouseWasPressed, ParticleEmitter, PI, Sound, setObjectDefaultDamping, Vector2, engineObjects, setCameraScale, TileInfo, debug, setTilesPixelated, drawText, worldToScreen, frameRate, engineName, playSamples } from './littlejs.esm.js'
import { Player } from './Player.js';
import { Tentacler } from './Tentacler.js';


export function xy({ x, y }: { x: number, y: number }) {
  return vec2(x, y);
}

export function scramble(p: Vector2, v: number) {
  return vec2(p.x + Math.random() * v - 0.5 * v, p.y + Math.random() * v - 0.5 * v)
}

const levelSize = vec2(38, 20);

export let currentLevel = 0;

const sound_bounce = new Sound([, , 1e3, , .03, .02, 1, 2, , , 940, .03, , , , , .2, .6, , .06], 0);
const sound_break = new Sound([, , 90, , .01, .03, 4, , , , , , , 9, 50, .2, , .2, .01], 0);
const sound_start = new Sound([, 0, 500, , .04, .3, 1, 2, , , 570, .02, .02, , , , .04]);
export const blip = new Sound([2, , 569, .02, .01, .03, 3, 1.8, 10, 29, , , , .6, , , .06, , .01, .02]);
export const hum = new Sound([.5,0,97.99886,.18,.62,.16,,2.5,,,,,,.3,,.1,.03,.33,.19,,184]); 
export const sssh = new Sound([.1,,87,.09,.04,.53,4,3.2,1,1,,,.29,.4,15,.2,.21,.36,.26,.04,698]); // Explosion 20
export const step = new Sound([.5,,293.66,,.01,.07,4,3.5,,,,,,.2,-1,.4,.05,.73,.06,,-2497]); // Hit 44 - Mutation 3
export const step2 = new Sound([.1,,922,.01,,,,5,,,,,,9])

//setTilesPixelated(false)

export let tentaclers: Tentacler[] = []
export let unlocked = false;

class Brick extends EngineObject {
  constructor(pos, size) {
    super(pos, size);

    this.setCollision();
    this.mass = 0;
    this.friction = 0;
    this.tileInfo = spriteAtlas.crate;
    this.color = new Color(1, 0, 0)
  }
}

class Stairs extends EngineObject {
  constructor(pos, public entrance = false) {
    super(pos);

    this.tileInfo = spriteAtlas.ladder;
    this.color = entrance ? new Color(.2, .2, .2) : new Color(1.2, 1.2, 1.2)
    if (entrance) {
      this.mirror = true;
    }
    this.setCollision();
  }

  collideWithObject(object: EngineObject): boolean {
    if (!this.entrance && object instanceof Player) {
      setLevel(currentLevel + 1)
    }
    return false
  }

}

class Lever extends EngineObject {
  constructor(pos) {
    super(pos);

    this.setCollision();
    this.size = vec2(0.5, 0.5);
    this.drawSize = vec2(1, 1);
    this.tileInfo = spriteAtlas.lever;
  }

  collideWithObject(object: EngineObject): boolean {
    if (object instanceof Player) {
      unlocked = true;
    }
    this.color = unlocked ? new Color(0, 1, 0) : new Color(1, 0, 0);
    return false
  }

  render() {
    this.mirror = unlocked;
    super.render();
  }

}

class Door extends EngineObject {
  constructor(pos) {
    super(pos);

    this.setCollision();
    this.mass = 0;
    this.tileInfo = spriteAtlas.door;
  }

  update(): void {
    this.setCollision(!unlocked, !unlocked);
  }

  render() {
    this.tileInfo = spriteAtlas.door.frame(unlocked ? 1 : 0);
    super.render();
  }
}



export let player: Player, levelObjects: EngineObject[] = [], spriteAtlas: { [id: string]: TileInfo };

///////////////////////////////////////////////////////////////////////////////
function gameInit() {

  setCanvasFixedSize(vec2(1280, 800));
  // create a table of all sprites
  const gameTile = (i, size = 16) => tile(i, size, 0, 1);
  spriteAtlas =
  {
    // large tiles
    circle: gameTile(0),
    crate: gameTile(1),
    player: gameTile(2),
    enemy: gameTile(4),
    door: gameTile(6),
    key: gameTile(8),
    ladder: gameTile(9),
    lever: gameTile(10),


    // small tiles
    gun: gameTile(vec2(0, 2), 8),
    grenade: gameTile(vec2(1, 2), 8),
  };

  //initLevel(0)
  //initLevel(1)
  setLevel(1)
}

export let grid: number[][] = [];
export let playerPos;

export function setPlayerPos(p: Vector2) {
  playerPos = p;
}

document.onkeydown = (e => {
  let n = Number(e.key);
  if (levels[n])
    setLevel(n)
  //console.log(e);
  if (e.code == "KeyR")
    setLevel()
})

export function setLevel(n?: number) {
  if (!n)
    n = currentLevel;

  sound_start.play();

  if (n >= levels.length) {
    n = 1;
  }
  currentLevel = n;
  let level = levels[n];
  tentaclers = [];
  unlocked = false;

  for (let o of [...engineObjects]) {
    o.destroy();
  }

  levelSize.x = level[0].length;
  levelSize.y = level.length;

  for (let x = 0; x < levelSize.x; x++)
    for (let y = 0; y < levelSize.y; y++) {
      let c = level[levelSize.y - y - 1][x];
      let at = vec2(x, y);
      let pathType = 0
      if (c == "#" || c == "*") {
        new Brick(at, vec2(1, 1));
        pathType = 1;
      }
      if (c == "@") {
        player = new Player(at);
        playerPos = at;
        new Stairs(at, true)
      }
      if (c == "T") {
        tentaclers.push(new Tentacler(at, 15, new Color(1, 0, 0)))
      }
      if (c == "t") {
        tentaclers.push(new Tentacler(at, 8, new Color(0.5, 0.5, 0)))
      }
      if (c == "F") {
        tentaclers.push(new Tentacler(at, 70, new Color(0.5, 0, 0.5)))
      }
      if (c == ">") {
        new Stairs(at)
      }

      if (c == "/") {
        new Lever(at)
      }

      if (c == "W") {
        new Door(at)
        pathType = 3
      }


      grid[y] ||= [];
      grid[y][x] = pathType;
    }

  setCameraPos(levelSize.scale(.5));
  setCameraScale(30);
}

///////////////////////////////////////////////////////////////////////////////
function gameUpdate() {

}

///////////////////////////////////////////////////////////////////////////////
function gameUpdatePost() {
}

///////////////////////////////////////////////////////////////////////////////
function gameRender() {
  if (player)
    setCameraPos(player.pos);
  drawRect(cameraPos.add(new Vector2(-0.5, -0.5)), mainCanvasSize.scale(2), new Color(.1, .0, .0)); // draw level boundary
}

///////////////////////////////////////////////////////////////////////////////
function gameRenderPost() {
  //drawRect(vec2(0,0), mainCanvasSize, new Color(0.1,0.1,0.1))
  drawTextScreen("Level " + currentLevel, vec2(mainCanvasSize.x / 2, 20), 50); // show score
  if (player?.caughtBy)
    drawTextScreen("censored", worldToScreen(player.pos.add(vec2(-0.5, 0))), 20)
}

///////////////////////////////////////////////////////////////////////////////
// Startup LittleJS Engine

let levels: string[][] = [];

function untiled(t) {
  let s = ""
  for (let d of t.layers.reverse()) {
    s += "=\n";
    let { width, height, data } = d;
    data.forEach((v, i) => {
      s += "  *@ TtWwK>/F"[v];
      if ((i + 1) % width == 0)
        s += "\n";
    })
  }
  return s;
}


window.onload = () => {
  let ut = untiled(window["TileMaps"].l);

  let ls = ut;

  //console.log(ls);

  let l1 = ls.split("=");
  for (let level of l1) {
    let lines = level.trim().split("\n");
    levels.push(lines);
  }

  engineInit(gameInit, gameUpdate, gameUpdatePost, gameRender, gameRenderPost, ['tiles.png']);
}
