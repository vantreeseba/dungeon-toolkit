/**
 * Random utils for supporting module.
 */
function distanceFill(map, wall = 0, passes) {
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

module.exports = distanceFill;
