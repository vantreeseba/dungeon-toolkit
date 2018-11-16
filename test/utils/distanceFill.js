const assert = require('chai').assert;
const distanceFill = require('../../utils/distanceFill');
const printMap = require('../../utils/print-map');
const Map = require('../../map');

module.exports = {
  'Distance': {
    'should return map with distance to walls': () => {
      const map = new Map(2, 2);
      map.set(0, 0, 1);
      let distanceMap = distanceFill(map, 0, 1);

      assert.equal(distanceMap.get(0, 0), 1);
      assert.equal(distanceMap.get(1, 0), 0);
    },
  }
};
