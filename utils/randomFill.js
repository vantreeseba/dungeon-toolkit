/**
  * Fill the map with two values, randomly.
  *
  * @param {Map} map The map to get tiles from.
  * @param {Number} [wall=0] The first (wall) value.
  * @param {Number} [floor=1] The second (floor) value.
  * @param {Number} [percent=0] The percent of map that should be walls.
  */
const random = (map, wall = 0, floor = 1, percent = 0) => {
  map.values = map.values.map(
    () => (Math.random() <= percent ? wall : floor)
  );
};

module.exports = random;
