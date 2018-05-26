/**
 * Return a list of tiles that recursively
 * touch the given tile and have the given value.
 * @param {Map} map The map to get tiles from.
 * @param {Number} x The x coord of the tile.
 * @param {Number} y The y coord of the tile.
 * @param {Number} value The tile value/number to match.
 * @return {Array} The list of points and their values.
 */
function floodFill(map, x, y) {
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

module.exports = floodFill;
