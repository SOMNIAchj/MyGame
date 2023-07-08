import { _decorator, Component, director, Label, Node } from 'cc';
import { gameScene } from './gameScene';
import resMgr from '../script/resMgr';
import { battleMgr } from '../script/battleMgr';
import { GameState } from '../script/constant';
const { ccclass, property } = _decorator;

@ccclass('startScene')
export class startScene extends Component {
    @property(Node)
    startBtnNode:Node
    @property(Label)
    labelLoading:Label
    start() {
        // for (var i = 0; i < 256; i++) {
            console.log(0x80)
        // }
      
        this.labelLoading.string = '加载中。。。'
        this.startBtnNode.active  = false
        resMgr.init(()=>{
            this.startBtnNode.active  = true
            this.labelLoading.string = ''
        })
    }

    update(deltaTime: number) {
        
    }

    startgame(){
        battleMgr.setGameState(GameState.gaming)
        director.loadScene('gameScene')
    }
}


