import constants from "../base/constants";
import poolManager from "../base/poolManager";
import Jiang from "../item/Jiang";
import Bin from "../item/Bin";
import Pao from "../item/Pao";
import Ma from "../item/Ma";
import Ju from "../item/Ju";
import Xiang from "../item/Xiang";
import Shi from "../item/Shi";
import cell from "../base/cell";
export default class gameManager{
    get AllChessList() {
        return this._AllChessList;
    }

    set AllChessList(value) {
        this._AllChessList = value;
    }
    get AllChess() {
        return this._AllChess;
    }

    set AllChess(value) {
        this._AllChess = value;
    }
    get pole() {
        return this._pole;
    }

    set pole(value) {
        this._pole = value;
    }

    _AllChessList = [];

    _AllChess = {};

    _pole = true;

    constructor(game){
        this.gameScene = game;
        window.constant = new constants();
        window.poolMgr = new poolManager();
        this.initAllChess()
    }

    //初始化棋格子管理类
    initAllChess(){
        for (let i = 0; i < 9; i++) {
            this.AllChess[i] = {};
            for (let j = 0; j < 10; j++) {
                this.AllChess[i][j] = new cell()
            }
        }
    }

    createAllChessClass = function(){
        this.setOneCamp(constant.camp.Red);
        this.setOneCamp(constant.camp.Black);
    };

    setOneCamp = function(camp){
        let cont = constant.chessCont;
        for (let i = 0; i <cont.length; i++) {
            this.setOneClass(i,cont,camp)
        }
    };

    setOneClass = function(id,cont,camp){
        for (let i = 0; i < cont[id]; i++) {
            let entity = this.getOneChess(i,id,camp);
            if(entity){
                this.AllChessList.push(entity);
                this.addChessToMgr(entity)
            }
        }
    };

    getOneChess(index,id,camp){
        let data = {
            index:index,
            camp:camp,
            state:constant.ChessState.Live,
        };
        let entity = null;
        switch (id){
            case constant.chessId.Jiang:
                entity = new Jiang(data);
                break;
            case constant.chessId.Shi:
                entity = new Shi(data);
                break;
            case constant.chessId.Xiang:
                entity = new Xiang(data);
                break;
            case constant.chessId.Ju:
                entity = new Ju(data);
                break;
            case constant.chessId.Ma:
                entity = new Ma(data);
                break;
            case constant.chessId.Pao:
                entity = new Pao(data);
                break;
            case constant.chessId.Bin:
                entity = new Bin(data);
                break;
        }
        return entity;
    };

    addChessToMgr(enyity){
        this.AllChess[enyity.x][enyity.y].chess = enyity;
    }

    getChessByPosition(x,y){
        const pos = this.getPosByPosition(x,y);
        return this.AllChess[pos.x][pos.y].chess ;

    };

    getPosByPosition(x,y){
        let pos = {
            x:0,
            y:0
        };
        const horizontal = constant.horizontal;
        const vertical = constant.vertical;
        let minX = 0;
        let minY = 0;
        for (let i = 0; i < horizontal.length; i++) {
            const tempX = horizontal[i];
            let tempDeltX = Math.abs(x - tempX);
            if(!minX){
                minX = tempDeltX
            }
            if( tempDeltX < minX){
                minX = tempDeltX;
                pos.x = i
            }
        }
        for (let n = 0; n < vertical.length; n++) {
            const tempY = vertical[n];
            let tempDeltY = Math.abs(y - tempY);
            if(!minY){
                minY = tempDeltY
            }
            if( tempDeltY < minY){
                minY = tempDeltY;
                pos.y = n
            }
        }
        return pos
    }

}

