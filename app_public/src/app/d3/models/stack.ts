import RACE_CONFIG from '../../race-info/race-info.config';

// Implementing SimulationNodeDatum interface into our custom Node class
export class Stack implements d3.SimulationNodeDatum {
    // Optional - defining optional implementation properties - required for relevant typing assistance
    index?: number;

    id: string;

    constructor(id) {
        this.id = id;
    }
    get color() {
      let index = Math.floor(RACE_CONFIG.SPECTRUM.length * ((1) / RACE_CONFIG.N));
      return RACE_CONFIG.SPECTRUM[index];
    }
}
