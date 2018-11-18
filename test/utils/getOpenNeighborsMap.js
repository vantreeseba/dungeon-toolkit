const assert = require('chai').assert;
const addRectangle = require('../../map/addRectangle');
const getOpenNeighborMap = require('../../utils/getOpenNeighborMap');
const printMap = require('../../utils/print-map.js');
const Map = require('../../map');

module.exports = {
  'GetOpenNeighborMap': {
    'should return map with number of open neighbors': () => {
      const map = new Map(8, 8);

      addRectangle(map, {x: 2, y:2, width: 3, height: 3});

      map.set(3, 1, 1);
      let openNeighborMap = getOpenNeighborMap(map, {diagonals: false});

      // printMap(map);
      // printMap(openNeighborMap);

      assert.equal(openNeighborMap.get(3, 1), 1);

      assert.equal(openNeighborMap.get(2, 2), 2);
      assert.equal(openNeighborMap.get(3, 2), 4);
      assert.equal(openNeighborMap.get(4, 2), 2);
      assert.equal(openNeighborMap.get(2, 3), 3);
      assert.equal(openNeighborMap.get(3, 3), 4);
      assert.equal(openNeighborMap.get(4, 3), 3);
      assert.equal(openNeighborMap.get(2, 4), 2);
      assert.equal(openNeighborMap.get(3, 4), 3);
      assert.equal(openNeighborMap.get(4, 4), 2);
    },
  }
};
