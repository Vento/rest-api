import { Point } from './point';
export class Route{

    constructor(public name: string, public points: Point[] ) {  
    }

    getName() {
        return this.name;
    }

    setName(name) {
        this.name = name;
    }

    addPoint(point: Point) {
        this.points.push(point)   
    }

    removePoint(point) {
        for (let i = 0; i < this.points.length; i++){
            if (this.points[i] == point) {
                this.points.splice(i, 1);
            }
        }
    }    
}