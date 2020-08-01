import EventManager from "../logic/EventManager";

export default class Chess{
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

    constructor(data){
        this.event = new EventManager()
        this.State = data.state;
        this.camp = data.camp;
        this.y = this.isDown() ? 0 : 9;
    }

    //检查所有
    checkPositionALL(x,y){
        return this.checkMoveRange(x,y) && this.checkMoveRule(x,y) && this.checkMovePosition(x,y)
    }

    //移动规则
    checkMoveRule(x,y){
        return (x === this.x)|| (y ===this.y)
    }

    //移动范围
    checkMoveRange(x,y){
        return true;//( x < 9 && x >= 0 && y >= 0 && y < 10);
    }

    //目标点位
    checkMovePosition(x,y){
        return true
    }

    getBoardPosition(){
        var postion = {
            x:0,
            y:0
        };
        postion.x = constant.horizontal[this.x];
        postion.y = constant.vertical[this.y];
        return postion;
    }

    getRotation(){
        var rotation = 0;
        if(this.isDown()){
            rotation = 0;
        }else {
            rotation = 180;
        }
        return rotation;
    }

    isDown(){
        return this.camp === constant.camp.Red && GameMgr.pole || this.camp === constant.camp.Black && !GameMgr.pole
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

    setDead(){
        this.event.dispatchEvent(constant.EntityEventName.dead)
    }

    setPosition(x,y){
        this.x = x;
        this.y = y;
        this.event.dispatchEvent(constant.EntityEventName.setPosition)
    }
}