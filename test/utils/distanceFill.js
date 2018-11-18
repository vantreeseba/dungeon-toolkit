const assert = require('chai').assert;
const addRectangle = require('../../map/addRectangle');
const distanceFill = require('../../utils/distanceFill');
const printMap = require('../../utils/print-map');
const Map = require('../../map');

module.exports = {
  'Distance': {
    'should return map with distance to walls': () => {
      const map = new Map(8, 8);
      addRectangle(map, {x: 2, y:2, width: 5, height: 6});
      map.set(3, 1, 1);

      let distanceMap = distanceFill(map, 0, 3);

      printMap(map);
      printMap(distanceMap);

      // assert.equal(openNeighborMap.get(2, 2), 2);
      // assert.equal(openNeighborMap.get(3, 2), 4);
      // assert.equal(openNeighborMap.get(4, 2), 2);
      // assert.equal(openNeighborMap.get(2, 3), 3);
      // assert.equal(openNeighborMap.get(3, 3), 4);
      // assert.equal(openNeighborMap.get(4, 3), 3);
      // assert.equal(openNeighborMap.get(2, 4), 2);
      // assert.equal(openNeighborMap.get(3, 4), 3);
      // assert.equal(openNeighborMap.get(4, 4), 2);

    },
  }
};
