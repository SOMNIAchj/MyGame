import Chess from "./Chess";

export default class Shi extends Chess{

    _y = 0;

    _canMoveX = 1;

    _canMoveY = 1;

    _id = 1;

    init(data){
        this.x = data.index ? 5 :3;
    }

    checkPositionALL(x,y){
        return this.checkMoveRange(x,y) && this.checkMoveRule(x,y) && this.checkMovePosition(x,y)
    }

    checkMoveRange(x,y){
            return ( x <= 6 && x >= 4 && y >= 0 && y <= 2);
    }

    checkMoveRule(x,y){
        return (x = this.x && Math.abs(y - this.y) === 1)|| (y = this.y && Math.abs(x - this.x) === 1)
    }

    checkMovePosition(x,y){
            return true
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