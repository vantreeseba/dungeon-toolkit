/**
 * Get a new map with each tile value representing the count of surrounding walkable tiles.
 * @param {Map} map The map to get tiles from.
 * @param {Number} [wall=0] The value representing non-walkable tiles.
 * @return {Map} The map filled with open neighbors.
 */
const getOpenNeighborMap = (map, {wall = 0, diagonals = true} = {}) => {
  const copy = map.copy();
  const values = copy.values;

  const isOpen = (n => n.v !== wall);

  for(let i = 0; i < values.length; i++) {
    if(values[i] !== wall) {
      const {x, y} = map.indexToXY(i);
      const openNeighbors = map.getNeighbors(x, y, {diagonals}).filter(isOpen);
      copy.values[i] = openNeighbors.length;
    }
  }

  return copy;
};

module.exports = getOpenNeighborMap;
