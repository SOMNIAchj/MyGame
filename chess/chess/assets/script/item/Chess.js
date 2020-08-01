import EventManager from "../logic/EventManager";

export default class Chess{
    get node() {
        return this._node;
    }

    set node(value) {
        this._node = value;
    }
    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }
    get camp() {
        return this._camp;
    }

    set camp(value) {
        this._camp = value;
    }
    get State() {
        return this._State;
    }

    set State(value) {
        this._State = value;
    }
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

    _id = null;

    _x = 0;

    _y = 0;

    _canMoveX = 0;

    _canMoveY = 0;

    _canMoveList = [];

    _camp = null;

    _State = null;

    _node = null;

    constructor(data){
        this.event = new EventManager()
        this.State = data.state;
        this.camp = data.camp;
        this.y = (this.camp === constant.camp.Red && GameMgr.pole || this.camp === constant.camp.Black && !GameMgr.pole) ? 0 : 9;
    }

    checkMoveRange(){
        return ( x < 9 && x >= 0 && y >= 0 && y < 10);
    }

    getBoardPosition(){
        var postion = {
          x:0,
          y:0
        };
        // if(this.camp === constant.camp.Red && GameMgr.pole || this.camp === constant.camp.Black && !GameMgr.pole){
            postion.x = constant.horizontal[this.x];
            postion.y = constant.vertical[this.y];
        // }else {
        //     postion.x = constant.horizontal[ 8 - this.x];
        //     postion.y = constant.vertical[ 9 - this.y];
        // }
        return postion;
    }

    getRotation(){
        var rotation = 0;
        if(this.camp === constant.camp.Red && GameMgr.pole || this.camp === constant.camp.Black && !GameMgr.pole){
            rotation = 0;
        }else {
            rotation = 180;
        }
        return rotation;
    }

    click(){
        this.unSelfAll();
        this.selectSelf();
    }

    selectSelf(){
        this.event.dispatchEvent(constant.EntityEventName.selectChess)
    }

    unSelfAll(){
        clievent.dispatchEvent(constant.EventName.unSelectChess)
    }
}