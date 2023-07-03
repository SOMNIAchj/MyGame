import { _decorator, Component, director, Label, Node } from 'cc';
import { gameScene } from './gameScene';
import resMgr from '../script/resMgr';
const { ccclass, property } = _decorator;

@ccclass('startScene')
export class startScene extends Component {
    @property(Node)
    startBtnNode:Node
    @property(Label)
    labelLoading:Label
    start() {
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
        director.loadScene('gameScene')
    }
}


