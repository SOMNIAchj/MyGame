import Chess from "./Chess";

export default class Shi extends Chess{

    _canMoveX = 1;

    _canMoveY = 1;

    _id = 1;

    constructor(data){
        super(data);
        this.x = data.index ? 5 :3;
    }

    //检查所有
    checkPositionALL(x,y){
        return this.checkMoveRange(x,y) && this.checkMoveRule(x,y) && this.checkMovePosition(x,y)
    }

    checkMoveRange(x,y){
            return ( x <= 5 && x >= 3 && y >= 0 && y <= 2);
    }

    checkMoveRule(x,y){
        return (Math.abs(y - this.y) === 1 && Math.abs(x - this.x) === 1)
    }

    checkMovePosition(x,y){
        let chess = GameMgr.AllChess[x][y].chess;
        var flag = true;
        if(chess&&chess.camp === this.camp){
            flag = false;
        }
        return flag
    }

    getNextListPosition(){
        this.canMoveList = [];
        for (let h = 0; h < 2 ; h++) {
            for (let v = 0; v < 2; v++) {
                this.moveOneWay();
            }
        }
    }

    moveOneWay(h,v){
        let list = [];
        let canMove = h ? this._canMoveX:this._canMoveY; //横竖
        let det = v ? -1:1; //上下 或 左右
        let pos = {
            x:this.x,
            y:this.y
        };
        for (let i = 0; i < canMove; i++) {
             pos = {
                x: h ? pos.x + det : pos.x,

                y: h ? pos.y : pos.y + det,
            };
            if(this.checkPositionALL(pos.x,pos.y)){
                list.push(pos)
            }
        }
        return list
    }


}
