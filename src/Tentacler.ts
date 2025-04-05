import { Color, drawLine, drawTile, enablePhysicsSolver, EngineObject, vec2, Vector2 } from "./littlejs.esm";
import { grid, playerPos, scramble, spriteAtlas, tentaclers, xy } from "./main";
import * as EasyStar from 'easystarjs'

let est = new EasyStar.js();
est.enableSync();

export class Tentacler extends EngineObject {
  tacleLength = 0;
  maxLength = 6;

  pathToPlayer: Vector2[] = [];
  tacle: Vector2[] = [];
  color: Color

  constructor(pos: Vector2, maxLength:number = 6, color=new Color(1, 0, 0)) {
    super(pos, vec2(1, 1))
    this.maxLength = maxLength;
    this.setCollision();
    this.color = color;
    this.mass = 0;
    est.setTileCost(0, 1)
    est.setTileCost(2, 0.5)
    est.setAcceptableTiles([0, 2])
  }

  calculatePath() {
    let myGrid: number[][] = [];

    for (let y = 0; y < grid.length; y++) {
      myGrid[y] = [...grid[y]]
    }

    for (let t of tentaclers) {
      for (let i = 0; i < t.tacleLength; i++) {
        let p = t.tacle[i]
        if (!p)
          continue;
        myGrid[p.y][p.x] = t == this ? 2 : 1;
      }
    }

    est.setGrid(myGrid);

    est.enableDiagonals();
    est.disableCornerCutting();

    est.findPath(this.pos.x, this.pos.y, Math.round(playerPos.x), Math.round(playerPos.y), path => {
      if (!path) {
        this.pathToPlayer = []
        return
      }
      this.pathToPlayer = path.map(p => xy(p)) || [];
    })
    est.calculate();
  }

  update(): void {
    this.calculatePath();
    let commonLength = this.pathToPlayer.length;
    for (let i = 0; i < this.pathToPlayer.length; i++) {
      if (!this.tacle[i] || !this.pathToPlayer[i] ||
        this.pathToPlayer[i].distance(this.tacle[i]) > 0.1) {
        commonLength = i;
        break;
      }
    }

    if (commonLength < this.tacleLength) {
      this.reduceTacle();
    } else if(this.tacleLength < this.maxLength){
      this.expandTacle();
    }

  }

  reduceTacle() {
    this.tacleLength -= 0.1;
  }

  expandTacle() {
    this.tacle = this.pathToPlayer;
    this.tacleLength += 0.05;
  }

  render() {
    this.tileInfo = spriteAtlas.enemy;

    let vpath = this.tacle.map(v => scramble(v, 0.1));

    let remaining = this.tacleLength;
    vpath.forEach((v, i) => {
      if (i == 0 || remaining < 0)
        return;
      let a = v;
      if (remaining < 1) {
        if(remaining<0.1)
          return
        a = a.copy().subtract(vpath[i - 1]).scale(remaining).add(vpath[i - 1]);
      }
      let width = Math.min(0.3, 0.1 + 0.3 * (this.tacleLength - i) / this.tacleLength);
      drawLine(a, vpath[i - 1], width, this.color)
      remaining--;
    })

    drawTile(this.pos, this.drawSize, this.tileInfo, this.color, this.angle, this.mirror);

  }

}