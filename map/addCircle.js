/**
 * Add a circle into a map.
 *
 * @param {Map} map The map to add a circle to.
 * @param {Object} config
 * @param {Number} config.x The x of the circle center.
 * @param {Number} config.y The x of the circle center.
 * @param {Number} config.radius The radius of the circle.
 * @param {Number} config.value The value to fill the circle with.
 */
const addCircle = (map, {x = 0, y = 0, radius = 2, value = 1} = {}) => {
  map.set(x, y, value);
  const dist = (x1, y1, x2, y2) => {
    return Math.sqrt(Math.pow(x2-x1, 2) + Math.pow(y2-y1, 2));
  };

  map
    .getNeighbors(x, y, {dist: radius})
    .filter(n => dist(x, y, n.x, n.y) <= (radius * 1.2))
    .forEach(n => map.set(n.x, n.y, value));

  return map;
};

module.exports = addCircle;
