/**
 * Generator
 */
class Generator {
  /**
   * constructor
   *
   * @param {} map
   * @param {} [config={}]
   * @return {undefined}
   */
  constructor(map, config = {}) {
    this.map = map;
    this.floor = isNaN(config.floor) ? 1 : config.floor;
    this.wall = isNaN(config.wall) ? 0 : config.wall;
  }
}

module.exports = Generator;
