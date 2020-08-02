import Chess from "./Chess";

export default class Ma extends Chess{

    _id = 4;

    constructor(data){
        super(data);
        this.x = data.index ? 7 :1;
    }

    checkMoveRule(x,y){
        return ((Math.abs(x - this.x) === 2&& Math.abs(y - this.y) === 1)|| (Math.abs(x - this.x) === 1&& Math.abs(y - this.y) === 2))
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
        let detX = 0; //左右
        let detY = 0; //上下
        let detIX = 0;
        let detIY = 0;
        let judgeX = 0;
        let judgeY = 0;
        if(h){
            detY = 0;
            detX = v ? 2 : -2;
            judgeX = v ? 1 : -1;
        }else {
            detY = v ? 2 : -2;
            detX = 0;
            judgeY = v ? 1 : -1
        }
        let pos = {
            x:this.x,
            y:this.y
        };
        for (let i = 0; i < 2; i++) {
            if(h){
                detIY = i ? -1:1;
            }else {
                detIX = i ? -1:1;
            }
            pos = {
                x: this.x + detX + detIX,
                y: this.y + detY + detIY,
            };
            if(this.checkPositionALL(pos.x,pos.y)&&!GameMgr.AllChess[this.x +judgeX][this.y +judgeY].chess){
                this.canMoveList.push(pos)
            }
        }
    }
}
