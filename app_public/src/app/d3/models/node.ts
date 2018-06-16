import RACE_CONFIG from '../../race-info/race-info.config';


// Implementing SimulationNodeDatum interface into our custom Node class
export class Node implements d3.SimulationNodeDatum {
    // Optional - defining optional implementation properties - required for relevant typing assistance
    index?: number;
    x?: number;
    y?: number;
    vx?: number;
    vy?: number;
    fx?: number | null;
    fy?: number | null;
    
    id: string;
    linkCount: number = 0;
    
    constructor(id) {
        this.id = id;
    }

  
    normal = () => {
      return Math.sqrt(this.linkCount / RACE_CONFIG.N);
    }
  
    get r() {
      return 50 * this.normal() + 10;
    }
  
    get fontSize() {
      return (30 * this.normal() + 10) + 'px';
    }
  
    get color() {
      let index = Math.floor(RACE_CONFIG.SPECTRUM.length * ((this.linkCount - 1) / RACE_CONFIG.N));
      return RACE_CONFIG.SPECTRUM[index];
    }
}
