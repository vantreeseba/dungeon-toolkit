class Utils {
  static get numberToColor() {
    return {
      0: '#000',
      1: '#444',
      2: '#555',
      3: '#666',
      4: '#777',
      5: '#888',
      6: '#999',
      7: '#aaa',
      8: '#bbb',
      9: '#ccc',
      10: '#ddd'
    };
  }

  static floodFill(map, wall = 0, passes) {
    for (var i = 0; i < passes; i++) {
      map.values.forEach((v, vi) => {
        const {x, y} = map.indexToXY(vi);
        const values = map.getNeighborValues(x, y);
        const isTouchingWall = values.some(n => n === 0);
        const maxValue = values.reduce((max, val) => Math.min(max, val), v);

        if (isTouchingWall || v === wall) {
          map.set(x, y, v);
        } else {
          map.set(x, y, maxValue + 1);
        }
      });
    }
  }
}

module.exports = Utils;
