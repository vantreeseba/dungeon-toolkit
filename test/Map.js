const assert = require('chai').assert;
const Map = require('../map');

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
    },
    // 'fill': {
    //   'should fill map with wall when given 1': () => {
    //     const map = new Map(16, 16);
    //     map.fill(0, 1, 1);

    //     const wallTiles = map.values.filter(x => x === 0);
    //     assert.equal(map.values.length, wallTiles.length);
    //   },
    //   'should fill map with floor when given 0': () => {
    //     const map = new Map(16, 16);
    //     map.fill();

    //     const wallTiles = map.values.filter(x => x === 1);
    //     assert.equal(map.values.length, wallTiles.length);
    //   },
    //   'should fill map with about half floor when given 0.5': () => {
    //     const map = new Map(16, 16);
    //     map.fill(0, 1, 0.5);

    //     const wallTiles = map.values.filter(x => x === 1);
    //     assert.closeTo(wallTiles.length, map.values.length/2, 20);
    //   }
    // },
    'indexToXY' : {
      'should return correct index': () => {
        const map = new Map(16, 16);
        const pos = map.indexToXY(0);

        assert.deepEqual({x:0, y:0}, pos);
      }
    }
  }
};
