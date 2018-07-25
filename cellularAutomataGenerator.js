class CellularAutomataGenerator extends Generator {
  constructor(map, config = {}) {
    super(map, config);
    this.steps = [
      {
        reps: 4,
        r1Cutoff: 5,
        r2Cutoff: 2
      },
      {
        reps: 2,
        r1Cutoff: 5,
        r2Cutoff: -1
      }
    ];

    this.currentStep = 0;
    this.currentRep = 0;
  }
  runStep() {
    const s = this.steps[this.currentStep];
    if (!s) {
      return true;
    }

    this.map.values
      .map((v, i) => {
        const {x, y} = this.map.indexToXY(i);
        const nCount = this.map.getNeighborCount(x, y, this.wall);
        const nCount2 = this.map.getNeighborCount(x, y, this.wall, 2);

        const setWall = nCount >= s.r1Cutoff || nCount2 <= s.r2Cutoff;
        return {x, y, val: setWall ? this.wall : this.floor};
      })
      .forEach(c => this.map.set(c.x, c.y, c.val));

    this.currentRep++;
    if (this.currentRep >= s.reps) {
      this.currentRep = 0;
      this.currentStep++;
    }

    return false;
  }
  reset() {
    this.currentStep = 0;
    this.currentRep = 0;
  }
  generate(steps = 1) {
    let done;
    for (let i = 0; i < steps; i++) {
      done = this.runStep();
    }

    return done;
  }
}

module.exports = CellularAutomataGenerator;
