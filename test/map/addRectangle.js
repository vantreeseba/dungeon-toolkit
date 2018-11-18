const assert = require('chai').assert;
const addRectangle = require('../../map/addRectangle');
const printMap = require('../../utils/print-map');
const Map = require('../../map');

module.exports = {
  'addRectangle': {
    'should add a rectangle to the map': () => {
      const map = new Map(16, 16);

      addRectangle(map, {x: 2, y:2, width: 5, height: 5});
      addRectangle(map, {x: 8, y:8, width: 5, height: 5});
      addRectangle(map, {x: 10, y:4, width: 1, height: 5});
      addRectangle(map, {x: 7, y:4, width: 4, height: 1});

      // printMap(map);
    },
  }
};
