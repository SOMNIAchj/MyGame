import Chess from "./Chess";

export default class Bin extends Chess{

    _id = 6;

    constructor(data){
        super(data);
        switch(data.index){
            case 0:
                this.x = 0;
                break;
            case 1:
                this.x = 2;
                break;
            case 2:
                this.x = 4;
                break;
            case 3:
                this.x = 6;
                break;
            case 4:
                this.x = 8;
                break;
        }
        this.y = this.isDown() ? 3 : 6;
    }


    checkMoveRange(x,y){
        if(this.isDown()){
            return this.y <= y&&super.checkMoveRange(x,y)
        }else {
            return this.y >= y&&super.checkMoveRange(x,y)
        }
    }

    checkMoveRule(x,y){
        if(this.isDown()){
            return (this.y > 4&&(Math.abs(x - this.x) === 1)||(Math.abs(y - this.y) === 1))
        }else {
            return (this.y < 5&&(Math.abs(x - this.x) === 1)||(Math.abs(y - this.y) === 1))
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
        let list = this.canMoveList;
        let detX = v ? -1:1; //左右
        let detY = v ? -1:1; //上下
        if(h){
            detY = 0;
        }else {
            detX = 0;
        }
        let pos = {
            x:this.x,
            y:this.y
        };
        pos = {
            x: pos.x + detX,

            y: pos.y + detY,
        };
        if(this.checkPositionALL(pos.x,pos.y)){
            list.push(pos)
        }
    }


}
