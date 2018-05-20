class DrunkWalkGenerator extends Generator {
  constructor(map, config = {}) {
    super(map, config);
    this.reset();
    this.max = config.max || 20;
  }
  reset() {
    this.walkerPos = {
      x: Math.floor(Math.random() * this.map.w),
      y: Math.floor(Math.random() * this.map.h)
    };
  }
  generate() {
    let count = 0;
    let filled = 0;

    while (filled < this.max && count < this.max * 2) {
      if (this.map.get(this.walkerPos.x, this.walkerPos.y) == this.wall) {
        filled++;
        this.map.set(this.walkerPos.x, this.walkerPos.y, this.floor);
      }
      let dir = Math.floor(Math.random() * 4);
      this.walkerPos.x += dir == 0 ? 1 : dir == 1 ? -1 : 0;
      this.walkerPos.y += dir == 2 ? 1 : dir == 3 ? -1 : 0;

      this.walkerPos.x = this.walkerPos.x <= 0 ? 0 : this.walkerPos.x;
      this.walkerPos.x =
        this.walkerPos.x >= this.map.w - 1 ? this.map.w - 1 : this.walkerPos.x;

      this.walkerPos.y = this.walkerPos.y <= 0 ? 0 : this.walkerPos.y;
      this.walkerPos.y =
        this.walkerPos.y >= this.map.h - 1 ? this.map.h - 1 : this.walkerPos.y;

      count++;
    }
  }
}

module.exports = DrunkWalkGenerator;
