const assert = require('chai').assert;
const Map = require('../Map');

module.exports = {
  'Map': {
    'getNeighbors' : {
      'on edge': () => {
        const map = new Map(4, 4);
        map.set(0, 0, 1);
        map.set(1, 0, 1);

        const neighbors = map.getNeighbors(0, 0);

        assert.equal(3, neighbors.length);
      },
      'in center': () => {
        const map = new Map(4, 4);
        map.set(0, 0, 1);
        map.set(1, 1, 1);

        const neighbors = map.getNeighbors(1, 1);

        assert.equal(8, neighbors.length);
      },
    }
  }
};
