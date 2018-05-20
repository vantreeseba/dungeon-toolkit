class Map {
  constructor(w, h) {
    this.w = w;
    this.h = h;
    this.values = Array(w * h).fill(0);

    this.xScale = renderer.w / this.w;
    this.yScale = renderer.h / this.h;
  }
  fill(wall = 0, floor = 1, percent = 0) {
    this.values = this.values.map(
      () => (Math.random() <= percent ? wall : floor)
    );
  }
  randomize(percentFloor = 0.5) {
    this.values = this.values.map(() => (Math.random() > percentFloor ? 1 : 0));
  }
  indexToXY(i) {
    return {
      x: i % this.w,
      y: (i - i % this.w) / this.w
    };
  }
  xyToIndex(x, y) {
    return x + this.w * y;
  }
  set(x, y, val) {
    this.values[this.xyToIndex(x, y)] = val;
  }
  get(x, y) {
    return this.values[this.xyToIndex(x, y)];
  }
  draw(renderer) {
    this.values.forEach((v, i) => {
      // if (v === 0) {
      //   return;
      // }
      const {x, y} = this.indexToXY(i);
      renderer.drawRect(
        x * this.xScale,
        y * this.yScale,
        this.xScale,
        this.yScale,
        numberToColor[v]
      );
    });
  }

  getNeighborValues(x, y, dist = 1) {
    const values = [];
    for (let i = -dist; i <= dist; i++) {
      for (let j = -dist; j <= dist; j++) {
        if (i !== 0 || j !== 0) {
          values.push(this.get(x + i, y + j));
        }
      }
    }

    return values.map(v => (isNaN(v) ? 0 : v));
  }

  getNeighborCount(x, y, val, dist = 1) {
    return this.getNeighborValues(x, y, dist).filter(x => x === val).length;
  }
}

module.exports = Map;
