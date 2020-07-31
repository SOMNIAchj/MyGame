
export default class cell{
    get x() {
        return this._x;
    }

    set x(value) {
        this._x = value;
    }

    get y() {
        return this._y;
    }

    set y(value) {
        this._y = value;
    }

    get chess() {
        return this._chess;
    }

    set chess(value) {
        this._chess = value;
    }

    _x = 0;

    _y = 0;

    _chess = null;

    constructor(){

   }

}