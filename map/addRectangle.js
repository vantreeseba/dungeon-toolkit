/**
 * Add a rectangle into a map.
 *
 * @param {Map} map The map to add a rectangle to.
 * @param {Object} config
 * @param {Number} config.x The x of the top left coord.
 * @param {Number} config.y The y of the top left coord.
 * @param {Number} config.width
 * @param {Number} config.height
 * @param {Number} config.value The value to fill with.
 */
const addRectangle = (map, {x = 0, y = 0, width = 1, height = 1, value = 1} = {}) => {
  for(let i = x; i < x + width; i++) {
    for(let j = y; j < y + height; j++) {
      map.set(i, j, value);
    }
  }

  return map;
};

module.exports = addRectangle;
