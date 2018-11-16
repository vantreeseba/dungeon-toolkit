/**
 * An exporter for converting map objects into tiled json-format.
 */
class TiledExporter {
  /**
   * Create the base tiled object for exporting.
   *
   * @static
   * @param {Object} config The config for exporting to tiled json format.
   * @param {Object} map The map object to export.
   * @return {Object} The tiled "Map" object.
   */
  static _createBaseTiled(config, map) {
    return {
      backgroundcolor: '#000000',
      height: map.h,
      layers: [],
      nextobjectid: 1,
      orientation: 'orthogonal',
      properties: [],
      renderorder: 'right-down',
      tileheight: config.tileSize,
      tilesets: [],
      tilewidth: config.tileSize,
      version: 1,
      tiledversion: '1.0.3',
      width: map.w
    };
  }

  /**
   * Convert a map into a tile layer.
   *
   * @static
   * @param {Object} config The config for the exporter.
   * @param {Object} map The map object to convert into a tiled map.
   * @return {Object} The tilelayer to put into the tiled json object.
   */
  static _mapToTiledLayer(config, map) {
    return {
      data: map.values,
      height: map.h,
      name: config.name || 'map',
      opacity: 1,
      properties: [],
      type: 'tilelayer',
      visible: true,
      width: map.w,
      x: 0,
      y: 0
    };
  }

  /**
   * Convert a map to a tiled-json map.
   *
   * @static
   * @param {Object} config The configuration object for exporting to tiled.
   * @param {Object} map The map object to convert into a tiled map.
   * @return {Object} The tiled json.
   */
  static mapToTiled(config, map) {
    const base = _createBaseTiled(config, map);
    base.layers.push(_mapToTiledLayer(config, map));

    return base;
  }
}

module.exports = TiledExporter;
