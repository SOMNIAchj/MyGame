import Chess from "./Chess";

export default class Jiang extends Chess{

    _x = 5;

    _y = 0;

    _canMoveX = 1;

    _camMoveY = 1;

    CheckMoveRange(x,y){
        if( x <= 6 && x >= 4 && y >= 0 && y <= 2){
            return true;
        }
    }

    CheckMoveRule(x,y){
        return (x = this.x && Math.abs(y - this.y) === 1)|| (y = this.y && Math.abs(x - this.x) === 1)
    }

    CheckMovePosition(x,y){
            return true
    }

    getNextListPosition(){
        for (let i = 0; i < 4 ; i++) {

        }
    }

}
