import constant from "../base/constant";
import gameManager from "../logic/gameManager";

export default class chess{
    get canMoveList() {
        return this._canMoveList;
    }

    set canMoveList(value) {
        this._canMoveList = value;
    }
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

    _x = 0;

    _y = 0;

    _canMoveX = 0;

    _canMoveY = 0;

    _canMoveList = [];

    _camp = gameManager.constant.camp.red;

    constructor(){

    }

    checkMoveRange(){
        return ( x < 9 && x >= 0 && y >= 0 && y < 10);
    }

}