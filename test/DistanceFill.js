const assert = require('chai').assert;
const FloodFill = require('../FloodFill');
const Map = require('../Map');

module.exports = {
  'Distance': {
    'should return all neighbors with same value': () => {
      const map = new Map(4, 4);
      map.set(0, 0, 1);
      map.set(1, 0, 1);
      map.set(3, 0, 1);
      let flooded = FloodFill(map, 0, 0, 1);

      assert.equal(2, flooded.length);
    },
  }
};