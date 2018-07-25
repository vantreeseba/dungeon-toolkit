const assert = require('chai').assert;
const Fill = require('../fill');
const Map = require('../map');

module.exports = {
  'FloodFill': {
    'should return all neighbors with same value and connected': () => {
      const map = new Map(4, 4);
      map.set(0, 0, 1);
      map.set(1, 0, 1);
      map.set(3, 0, 1);
      let flooded = Fill.flood(map, 0, 0, 1);

      assert.equal(2, flooded.length);
    },
    'should return all neighbors with same value': () => {
      const map = new Map(4, 4);
      map.set(0, 0, 1);
      map.set(1, 0, 1);
      map.set(0, 1, 1);
      let flooded = Fill.flood(map, 0, 0, 1);

      assert.equal(3, flooded.length);
    },
  }
};
