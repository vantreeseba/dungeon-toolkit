const getOpenNeighborMap = require('./getOpenNeighborMap');
/**
 * Get list of checkpoints, and the distance map.
 * @param {Map} map The map to get tiles from.
 * @param {Number} [wall=0] The value representing non-walkable tiles.
 * @return {Map} The map filled with open neighbors.
 */
const getChokepoints = (map, {wall = 0, diagonals = true, threshold = 2, openMap = null} = {}) => {
  openMap = openMap || getOpenNeighborMap(map, {wall, diagonals});

  const toPotential = (t, i) => {
    if(t <= threshold && t !== wall) {
      const point = openMap.indexToXY(i);
      return {x: point.x, y: point.y, v: t};
    }

    return null;
  };

  const existing = p => p;

  const hasMoreOpenNeigbors = p => {
    const neighbors = openMap
      .getNeighbors(p.x, p.y, {diagonals});

    const totalCount = neighbors.length;

    const moreOpenCount = neighbors.filter(n => n.v > p.v).length;
    const sameOpenCount = neighbors.filter(n => n.v === p.v).length;
    const wallCount = neighbors.filter(n => n.v === wall).length;

    if(moreOpenCount + sameOpenCount === totalCount) {
      return false;
    }

    return moreOpenCount - wallCount === 0;
  };

  const chokepoints = openMap.values
    .map(toPotential)
    .filter(existing)
    .filter(hasMoreOpenNeigbors);


  return {chokepoints, openMap};
};

module.exports = getChokepoints;
