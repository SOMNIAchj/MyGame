import Chess from "./Chess";

export default class Jiang extends Chess{

    _x = 4;

    _id = 0;

    checkMoveRule(x,y){
        return (x === this.x && Math.abs(y - this.y) === 1)|| (y === this.y && Math.abs(x - this.x) === 1)
    }

    checkMoveRange(x,y){
        if(this.isDown()){
            return ( x <= 5 && x >= 3 && y >= 0 && y <= 2)&&super.checkMoveRange(x,y);
        }else {
            return ( x <= 5 && x >= 3 && y >= 7 && y <= 9)&&super.checkMoveRange(x,y);
        }
    }

    getNextListPosition(){
        this.canMoveList = [];
        for (let h = 0; h < 2 ; h++) {
            for (let v = 0; v < 2; v++) {
                this.moveOneWay(h,v);
            }
        }
    }

    moveOneWay(h,v){
        let det = v ? -1:1; //上下 或 左右
        let pos = {
            x:this.x,
            y:this.y
        };
        pos = {
            x: h ? pos.x + det : pos.x,

            y: h ? pos.y : pos.y + det,
        };
        this.addInCanMoveList(pos);
    }


}
