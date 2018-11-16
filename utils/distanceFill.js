/**
 * Create a map that has a value in each tile that represents distance from a wall.
 * @return {Map} The map with distance values.
 */
const distance = (map, wall = 0, passes = 1) => {
  const copy = map.copy(false);

  copy.values = map.values.map(v => v = v === wall ? v : -1);

  copy.values.forEach((v, i) => {
    for(let dist = 1; dist <= passes; dist++) {
      if(v === wall) {
        break;
      }

      const {x, y} = copy.indexToXY(i);
      const isTouchingWall = copy.getNeighbors(x, y, dist).some(n => n.v === wall);

      if(isTouchingWall) {
        copy.set(x, y, dist);
        break;
      }
    }
  });

  return copy;
};

module.exports = distance;
