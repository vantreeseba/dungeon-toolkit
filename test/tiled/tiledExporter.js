const assert = require('chai').assert;
const TiledExporter = require('../../tiled/tiledExporter');
const Map = require('../../map');

let map, config;

module.exports = {
  'TiledExporter': {
    'beforeEach': () => {
      map = new Map(2, 2);
      config = {
        tileSize: 32
      };
    },
    '_createBaseTiled' : {
      'should export a valid json object': () => {
        const tiledMap = TiledExporter._createBaseTiled(config, map);
        assert.isOk(tiledMap);
      },
      'should match the tiled json format': () => {
        const tiledMap = TiledExporter._createBaseTiled(config, map);

        // Props for tiled.
        assert.isString(tiledMap.backgroundcolor);
        assert.isArray(tiledMap.layers);
        assert.isNumber(tiledMap.nextobjectid);
        assert.oneOf(tiledMap.orientation, ['orthogonal']);
        assert.isArray(tiledMap.properties);
        assert.oneOf(tiledMap.renderorder, ['right-down']);
        assert.isArray(tiledMap.tilesets);
        assert.equal(tiledMap.version, 1);
        assert.equal(tiledMap.tiledversion, '1.0.3');

        //Props from the exporter.
        assert.equal(tiledMap.height, map.h);
        assert.equal(tiledMap.width, map.w);
        assert.equal(tiledMap.tileheight, config.tileSize)
        assert.equal(tiledMap.tilewidth, config.tileSize);
      }
    },
  }
};
