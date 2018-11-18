const assert = require('chai').assert;
const getChokepoints = require('../../utils/getChokepoints.js');
const printMap = require('../../utils/print-map');
const Map = require('../../map');

module.exports = {
  'getChokepoints': {
    // 'should return list of chokepoints': () => {
    //   const map = new Map(4, 4);

    //   // Make room in corner of map.
    //   map.set(0, 0, 1);
    //   map.set(1, 0, 1);
    //   map.set(0, 1, 1);
    //   map.set(1, 1, 1);

    //   // Make hallway
    //   map.set(2, 0, 1);
    //   map.set(3, 0, 1);

    //   let {chokepoints, openMap} = getChokepoints(map, {diagonals: false});

    //   printMap(map);
    //   printMap(openMap);

    //   assert.equal(chokepoints.length, 1);
    //   assert.equal(chokepoints[0].x, 2);
    //   assert.equal(chokepoints[0].y, 0);
    // },
    // 'should return list of chokepoints for more complex map': () => {
    //   const map = new Map(8, 8);

    //   // Make room in corner of map.
    //   map.set(1, 1, 1);
    //   map.set(2, 1, 1);
    //   map.set(1, 2, 1);
    //   map.set(2, 2, 1);

    //   // Make hallway
    //   map.set(3, 1, 1);
    //   map.set(4, 1, 1);

    //   let {chokepoints, openMap} = getChokepoints(map, {diagonals: false});

    //   printMap(map);
    //   printMap(openMap);

    //   assert.equal(chokepoints.length, 1);
    //   assert.equal(chokepoints[0].x, 2);
    //   assert.equal(chokepoints[0].y, 0);
    // },
  }
};
