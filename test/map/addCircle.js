const assert = require('chai').assert;
const addCircle = require('../../map/addCircle');
const printMap = require('../../utils/print-map');
const Map = require('../../map');

module.exports = {
  'addCircle': {
    'should add a circle to the map': () => {
      const map = new Map(8, 8);

      addCircle(map, {x: 4, y:4, radius: 3});
    },
  }
};
