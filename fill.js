/**
 * A collection of kinds of flood fills.
 */
class Fill {
  /**
   * Fill the map with two values, randomly.
   *
   * @param {Map} map The map to get tiles from.
   * @param {Number} [wall=0] The first (wall) value.
   * @param {Number} [floor=1] The second (floor) value.
   * @param {Number} [percent=0] The percent of map that should be walls.
   */
  static random(map, wall = 0, floor = 1, percent = 0) {
    map.values = map.values.map(
      () => (Math.random() <= percent ? wall : floor)
    );
  }

  /**
   * Random utils for supporting module.
   */
  static distance(map, wall = 0, passes) {
    for (var i = 0; i < passes; i++) {
      map.values.forEach((v, vi) => {
        const {x, y} = map.indexToXY(vi);
        const values = map.getNeighbors(x, y);
        const isTouchingWall = values.some(n => n.v === wall);
        const maxValue = values.reduce((max, val) => Math.min(max, val), v);

        if (isTouchingWall || v === wall) {
          map.set(x, y, v);
        } else {
          map.set(x, y, maxValue + 1);
        }
      });
    }
  }
  /**
   * Return a list of tiles that recursively
   * touch the given tile and have the given value.
   *
   * @param {Map} map The map to get tiles from.
   * @param {Number} x The x coord of the tile.
   * @param {Number} y The y coord of the tile.
   * @param {Number} value The tile value/number to match.
   * @return {Array} The list of points and their values.
   */
  static flood(map, x, y) {
    const value = map.get(x, y);
    let neighbors = [{x, y, v: value}];
    let flooded = [];

    while(neighbors.length) {
      const cur = neighbors.pop();
      if(!flooded.find(f => f.x === cur.x && f.y === cur.y)) {
        let n = map.getNeighbors(cur.x, cur.y)
          .filter(x => x.v === value)
          .filter(x => !flooded.find(f => f.x === x.x && f.y === x.y));

        neighbors = neighbors.concat(n);

        flooded.push(cur);
      }
    }

    return flooded;
  }
}

module.exports = Fill;
