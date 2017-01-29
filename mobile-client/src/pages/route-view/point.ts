export class Point{
    private _x: number;
    private _y: number;

    constructor(x: number, y: number ) {
        this._x = x;
        this._y = y;    
    }

    get x() { return this._x; }
    get y() { return this.y; }
    set x(x: number) { this._x = x }
    set y(y: number) { this.y - y }
}