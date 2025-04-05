import { levelsString } from 'easystarjs/levels.js';
import { tile, vec2, hsl, setShowSplashScreen, EngineObject, randColor, drawTextScreen, engineInit, mainCanvasSize, setCanvasFixedSize, cameraPos, Color, drawRect, setCameraPos, mousePos, clamp, canvasFixedSize, max, min, mouseWasPressed, ParticleEmitter, PI, Sound, setObjectDefaultDamping, Vector2, engineObjects, setCameraScale, TileInfo, debug } from './littlejs.esm.js'
import { Player } from './Player.js';
import { Tentacler } from './Tentacler.js';

export function xy({ x, y }: { x: number, y: number }) {
  return vec2(x, y);
}

export function scramble(p: Vector2, v: number) {
  return vec2(p.x + Math.random() * v - 0.5 * v, p.y + Math.random() * v - 0.5 * v)
}

const levelSize = vec2(38, 20);

const sound_bounce = new Sound([, , 1e3, , .03, .02, 1, 2, , , 940, .03, , , , , .2, .6, , .06], 0);
const sound_break = new Sound([, , 90, , .01, .03, 4, , , , , , , 9, 50, .2, , .2, .01], 0);
const sound_start = new Sound([, 0, 500, , .04, .3, 1, 2, , , 570, .02, .02, , , , .04]);

export let tentaclers:Tentacler[] = []

class Brick extends EngineObject {
  constructor(pos, size) {
    super(pos, size);

    this.setCollision();
    this.mass = 0;
    this.friction = 0;
    this.renderOrder = 0;
    this.tileInfo = spriteAtlas.crate;
  }


}

export let player: Player, levelObjects: EngineObject[] = [], spriteAtlas: { [id: string]: TileInfo };

///////////////////////////////////////////////////////////////////////////////
function gameInit() {

  // create a table of all sprites
  const gameTile = (i, size = 16) => tile(i, size, 0, 1);
  spriteAtlas =
  {
    // large tiles
    circle: gameTile(0),
    crate: gameTile(1),
    player: gameTile(2),
    enemy: gameTile(4),
    coin: gameTile(5),

    // small tiles
    gun: gameTile(vec2(0, 2), 8),
    grenade: gameTile(vec2(1, 2), 8),
  };

  initLevel(0)
  initLevel(1)
}

export let grid: number[][] = [];
export let playerPos;

export function setPlayerPos(p: Vector2) {
  playerPos = p;
}

function initLevel(n: number) {
  let level = levels[n];
  tentaclers = [];

  for (let o of [...engineObjects]) {
    o.destroy();
  }

  levelSize.x = level[0].length;
  levelSize.y = level.length;

  for (let x = 0; x < levelSize.x; x++)
    for (let y = 0; y < levelSize.y; y++) {
      let c = level[levelSize.y - y - 1][x];
      let at = vec2(x, y);
      let cost = 0
      if (c == "#" || c == "*") {
        new Brick(at, vec2(1, 1));
        cost = 1;
      }
      if (c == "@") {
        player = new Player(at);
        playerPos = at;
      }
      if (c == "T") {
        tentaclers.push(new Tentacler(at, 15, new Color(0.5,0.5,0)))
      }
      if (c == "t") {
        tentaclers.push(new Tentacler(at, 8, new Color(1,0,0)))
      }
      grid[y] ||= [];
      grid[y][x] = cost;
    }

  setCameraPos(levelSize.scale(.5));
  setCameraScale(50);
}

///////////////////////////////////////////////////////////////////////////////
function gameUpdate() {

}

///////////////////////////////////////////////////////////////////////////////
function gameUpdatePost() {
}

///////////////////////////////////////////////////////////////////////////////
function gameRender() {
  drawRect(cameraPos.add(new Vector2(-0.5, -0.5)), levelSize, new Color(.0, .2, .2)); // draw level boundary
}

///////////////////////////////////////////////////////////////////////////////
function gameRenderPost() {
  //drawTextScreen("Score " + score, vec2(mainCanvasSize.x / 2, 70), 50); // show score
}

///////////////////////////////////////////////////////////////////////////////
// Startup LittleJS Engine

let levels: string[][] = [];

window.onload = () => {
  let l1 = levelsString.split("=");
  for (let level of l1) {
    let lines = level.trim().split("\n");
    levels.push(lines);
  }

  engineInit(gameInit, gameUpdate, gameUpdatePost, gameRender, gameRenderPost, ['tiles.png']);
}