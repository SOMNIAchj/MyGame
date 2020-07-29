import constants from "../base/constants";
import poolManager from "../base/poolManager";
import Jiang from "../item/Jiang";
import Bin from "../item/Bin";
import Pao from "../item/Pao";
import Ma from "../item/Ma";
import Ju from "../item/Ju";
import Xiang from "../item/Xiang";
import Shi from "../item/Shi";
export default class gameManager{
    get pole() {
        return this._pole;
    }

    set pole(value) {
        this._pole = value;
    }

    get AllChessList() {
        return this._AllChessList;
    }

    set AllChessList(value) {
        this._AllChessList = value;
    }

    _AllChessList = [];

    _pole = true;

    constructor(game){
        this.gameScene = game;
        window.constant = new constants();
        window.poolMgr = new poolManager();
    }

    createAllChessClass = function(){
        this.setOneCamp(constant.camp.Red);
        this.setOneCamp(constant.camp.Black);
    }

    setOneCamp = function(camp){
        let cont = constant.chessCont;
        for (let i = 0; i <cont.length; i++) {
            this.setOneClass(i,cont,camp)
        }
    }

    setOneClass = function(id,cont,camp){
        for (let i = 0; i < cont[id]; i++) {
            let entity = this.getOneChess(i,id,camp);
            if(entity){
                this.AllChessList.push(entity)
            }
        }
    }

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
    }

}

