import { _decorator, Component, Input, input, Node, Sprite, Vec3 } from 'cc';
import resMgr from '../../script/resMgr';
import { battleMgr } from '../../script/battleMgr';
import { gameScene } from '../../scene/gameScene';
const { ccclass, property } = _decorator;

@ccclass('itemCell')
export class itemCell extends Component {
    @property(Node)
    choose:Node
    type
    index;
    gameScene:gameScene
    start() {
        this.node.on(Input.EventType.TOUCH_START,this.click,this)
    }

    init(gameScene:gameScene,type,index){
        this.gameScene = gameScene
        this.type = type
        this.index = index
        let side = type >= 16 ? 16:8;
        let selfType = type - side;
        let t;
        if(battleMgr.getIsReversal()){
            t = side == 16 ? 'R':'B'
        }else{
            t = side == 8 ? 'R':'B'
        }
      
        this.node.getComponent(Sprite).spriteFrame = resMgr.getSpriteFrame( t+ selfType)
        let x = index%16 * 73
        let y = Math.floor(index/16) * 73
        this.node.setPosition(new Vec3(x,-y,0))
        this.choose.active  = false
    }

    /**点击 */
    click(){
        if(!battleMgr.getIsGaming())return
        /**已经选择 */
        let readySellect = battleMgr.judgeIsSelect(this.index);
        if(readySellect){
            this.gameScene.setUnSellectNode()
            return
        }
        let isSellect = battleMgr.sellectCell(this.index);
        if(isSellect){
            this.gameScene.setSellectNode(this)
        }
    }
    sellect(){
        this.choose.active  = true
    }
    unSellect(){
        this.choose.active  = false
    }
    update(deltaTime: number) {
        
    }
}


