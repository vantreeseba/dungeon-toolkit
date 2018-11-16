const assert = require('chai').assert;
const printMap = require('../../utils/print-map.js');
const Map = require('../../map');

module.exports = {
  'print-map': {
    'should print the map': () => {
      const map = new Map(8, 8);
      map.set(0, 0, 1);
      map.set(1, 0, 1);
      map.set(3, 0, 1);

      // printMap(map);
    },
  }
};
