/**
 * A class representing a grid map.
 */
class Map {
  /**
   * Construct a map.
   *
   * @param {Number} w The width of the map.
   * @param {Number} h The height of the map.
   */
  constructor(w, h) {
    this.w = w;
    this.h = h;
    this.values = Array(w * h).fill(0);
  }

  /**
   * Make a copy of this map.
   * @return {Map} The copy of this map.
   */
  copy(copyValues = true) {
    const copy = new Map(this.w, this.h);

    if(copyValues) {
      copy.values = this.values.slice();
    }

    return copy;
  }

  /**
   * Returns an x,y coord for a index in the array representing the map.
   * @param {Number} i The index to turn into an x,y coord.
   * @return {Object} x,y coord.
   */
  indexToXY(i) {
    return {
      x: i % this.w,
      y: (i - i % this.w) / this.w
    };
  }

  /**
   * Turns an x,y coord into an index into the values array.
   * @param {Number} x The x coord.
   * @param {Number} y The y coord.
   * @return {Number} The index.
   */
  xyToIndex(x, y) {
    return x + this.w * y;
  }

  /**
   * Set a value in the values array by x,y.
   * @param {Number} x The x coord of the tile to set.
   * @param {Number} y The y coord of the tile to set.
   * @param {Number} val The value to set for the tile.
   */
  set(x, y, val) {
    this.values[this.xyToIndex(x, y)] = val;
  }

  /**
   * Get a tiles value from the map by x,y.
   * @param {Number} x The x coord.
   * @param {Number} y The y coord.
   * @return {Number} The tile value at x,y.
   */
  get(x, y) {
    return this.values[this.xyToIndex(x, y)];
  }

  /**
   * Get all neighbors for the tile within dist.
   * @param {Number} x The x coord.
   * @param {Number} y The y coord.
   * @param {Number} [dist=1] The distance to find neighbors within.
   * @return {Array} An array of tile objects.
   */
  getNeighbors(x, y, {dist = 1, diagonals = true} = {}) {
    const neighbors = [];
    for (let i = -dist; i <= dist; i++) {
      for (let j = -dist; j <= dist; j++) {
        if(!diagonals && (i !== 0 && j !== 0)) {
          continue;
        }
        let xi = x + i;
        let yj = y + j;

        const outsideMap = xi < 0 || xi > this.w || yj < 0 || yj > this.h;
        const isSelf = i === 0 && j === 0;

        if(outsideMap || isSelf) {
          continue;
        }

        neighbors.push({x: xi, y: yj, v: this.get(xi, yj)});
      }
    }

    return neighbors;
  }
}

module.exports = Map;
