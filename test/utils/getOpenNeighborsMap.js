const assert = require('chai').assert;
const getOpenNeighborMap = require('../../utils/getOpenNeighborMap');
const printMap = require('../../utils/print-map.js');
const Map = require('../../map');

module.exports = {
  'GetOpenNeighborMap': {
    'should return map with number of open neighbors': () => {
      const map = new Map(4, 4);
      map.set(0, 0, 1);
      map.set(1, 0, 1);
      map.set(2, 0, 1);
      map.set(2, 1, 1);
      map.set(3, 0, 1);

      let openNeighborMap = getOpenNeighborMap(map, {diagonals: false});

      assert.equal(openNeighborMap.values[0], 1);
      assert.equal(openNeighborMap.values[1], 2);
      assert.equal(openNeighborMap.values[2], 3);
      assert.equal(openNeighborMap.values[3], 1);

      assert.equal(openNeighborMap.values[6], 1);
    },
  }
};
