import Chess from "./Chess";

export default class Pao extends Chess{

    _canMoveX = 1;

    _canMoveY = 1;

    _id = 5;

    constructor(data){
        super(data);
        this.x = data.index ? 7:1;
        this.y = (this.camp === constant.camp.Red && GameMgr.pole || this.camp === constant.camp.Black && !GameMgr.pole) ? 2 : 7;
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
        let bridge = false;
        let canMove = 0;
        let detX = v ? 1 : -1;
        let detY = v ? 1 : -1;
        if(h){
            canMove = v ? 8 - this.x : this.x;
            detY = 0;
        }else {
            detX = 0;
            canMove = v ? 9 - this.y : this.y;
        }
        let pos = {
            x:this.x,
            y:this.y
        };
        for (let i = 0; i < canMove; i++) {
             pos = {
                x: pos.x + detX,
                y: pos.y + detY
            };
             let cell = GameMgr.AllChess[pos.x][pos.y];
            if(cell&&cell.chess){
                if(!bridge){
                    bridge = true;
                    continue
                }else {
                    this.addInCanMoveList(pos);
                    break;
                }
            }else {
                if(bridge){
                    continue
                }
            }
            this.addInCanMoveList(pos);
        }
    }

}
