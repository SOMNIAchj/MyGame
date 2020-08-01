
export default class constants{

    constructor(){

    }

    chessCont = [1,2,2,2,2,2,5];

    horizontal = [ -292, -219, -146, -73, 0, 73, 146, 219, 292]; //横

    vertical   = [-330, -255, -182, -109, -36, 36, 109, 182, 255, 330];//竖

    chessId = {
        Jiang:0,
        Shi:1,
        Xiang:2,
        Ju:3,
        Ma:4,
        Pao:5,
        Bin:6,
    };

    chessName = {
        [this.chessId.Jiang]:"Jiang",
        [this.chessId.Shi]:"Shi",
        [this.chessId.Xiang]:"Xiang",
        [this.chessId.Ju]:"Ju",
        [this.chessId.Ma]:"Ma",
        [this.chessId.Pao]:"Pao",
        [this.chessId.Bin]:"Bin",
    };

    ChessState = {
        Live:0,
        Die:1
    };

    camp = {
        Red:0,
        Black:1,
    };
    //实例事件
    EntityEventName = {
        selectChess:"selectChess",//选着棋子
        setPosition:"setPosition",//设置位置
        dead:"dead"//被吃
    };
    //全局事件
    EventName = {
        unSelectChess:"unSelectChess"
    }
}
