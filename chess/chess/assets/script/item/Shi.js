import Chess from "./Chess";

export default class Shi extends Chess{

    _id = 1;

    constructor(data){
        super(data);
        this.x = data.index ? 5 :3;
    }

    checkMoveRange(x,y){
            return ( x <= 5 && x >= 3 && y >= 0 && y <= 2);
    }

    checkMoveRule(x,y){
        return (Math.abs(y - this.y) === 1 && Math.abs(x - this.x) === 1)
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
        let detY = h ? -1:1; //左右
        let detX = v ? -1:1; //上下
        let pos = {
            x:this.x,
            y:this.y
        };
        pos = {
            x: pos.x + detX,

            y: pos.y + detY,
        };
        this.addInCanMoveList(pos);
    }

}
