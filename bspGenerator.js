class BSPGenerator extends Generator {
  constructor(map, config = {}) {
    super(map, config);

    this.minH = 10;
    this.minW = 10;
    this.depth = 10;
    this.ratio = 0.55;
    this.padding = isNaN(config.padding) ? 2 : config.padding;
  }
  makeTree(node, level) {
    if (node && level < this.depth) {
      this.split(node);
      this.makeTree(node.l, level + 1);
      this.makeTree(node.r, level + 1);
    }
  }
  split(node) {
    const tooSmall = node.h < this.minH * 2 || node.w < this.minW * 2;
    if (tooSmall) {
      return;
    }

    let splitHeight = Math.random() > 0.5;
    if(node.w >= node.h * this.ratio) {
      splitHeight = false;
    } else if(node.h >= node.w * this.ratio) {
      splitHeight = true;
    } else {
      return;
    }

    if (splitHeight) {
      let splitAt = Math.floor(Math.random() * (node.h - this.minH * 2 + 1)) + this.minH;
      let rHeight = node.h - splitAt;
      node.l = this.makeNode(node.x, node.y, node.w, splitAt);
      node.r = this.makeNode(node.x, node.y + splitAt, node.w, rHeight);
    } else {
      let splitAt = Math.floor(Math.random() * (node.w - this.minW * 2 + 1)) + this.minW;
      let rWidth = node.w - splitAt;
      node.l = this.makeNode(node.x, node.y, splitAt, node.h);
      node.r = this.makeNode(node.x + splitAt, node.y, rWidth, node.h);
    }
  }
  makeNode(x, y, w, h, l, r) {
    return {x, y, h, w, l, r};
  }
  getLeafs(node) {
    if (node.l && node.r) {
      return [].concat(this.getLeafs(node.l), this.getLeafs(node.r));
    } else {
      return [node];
    }
  }
  buildCorridors(node) {
    const hasChildren = node.l && node.r;
    if (hasChildren) {
      var leftXcenter = Math.round(node.l.x + node.l.w / 2);
      var leftYcenter = Math.round(node.l.y + node.l.h / 2);
      var rightXcenter = Math.round(node.r.x + node.r.w / 2);
      var rightYcenter = Math.round(node.r.y + node.r.h / 2);

      var startX = leftXcenter <= rightXcenter ? leftXcenter : rightXcenter;
      var endX = leftXcenter >= rightXcenter ? leftXcenter : rightXcenter;
      var startY = leftYcenter <= rightYcenter ? leftYcenter : rightYcenter;
      var endY = leftYcenter >= rightYcenter ? leftYcenter : rightYcenter;

      for (var x = startX; x < endX; x++) {
        this.map.set(x, startY, this.floor);
      }
      for (var y = startY; y < endY; y++) {
        this.map.set(startX, y, this.floor);
      }

      this.buildCorridors(node.l);
      this.buildCorridors(node.r);
    }
  }
  buildRooms() {
    this.getLeafs(this.root).forEach(node => {
      for (var x = this.padding; x < node.w - this.padding; x++) {
        for (var y = this.padding; y < node.h - this.padding; y++) {
          this.map.set(node.x + x, node.y + y, this.floor);
        }
      }
    });
  }
  generate() {
    this.root = this.makeNode(0, 0, map.w, map.h);
    this.makeTree(this.root, 0);
    this.color = 0;
    this.buildRooms(this.root);
    this.buildCorridors(this.root);
  }
}

module.exports = BSPGenerator;
