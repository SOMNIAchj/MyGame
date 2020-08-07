import Chess from "./Chess";


export default class Xiang extends Chess{

    _id = 2;

    constructor(data){
        super(data);
        this.x = data.index ? 6:2;
    }

    checkMoveRange(x,y){
        if(this.isDown()){
            return y <= 4&&super.checkMoveRange(x,y);
        }else {
            return y >= 5&&super.checkMoveRange(x,y);
        }
    }

    checkMoveRule(x,y){
        return (Math.abs(y - this.y) === 2&& Math.abs(x - this.x) === 2)
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
        let detY = h ? -2:2; //左右
        let detX = v ? -2:2; //上下
        let pos = {
            x:this.x,
            y:this.y
        };
        pos = {
            x: pos.x + detX,

            y: pos.y + detY,
        };
        if(this.checkPositionALL(pos.x,pos.y)&&!GameMgr.AllChess[(pos.x+this.x)/2][(pos.y+this.y)/2].chess){
            this.canMoveList.push(pos)
        }
    }
}
