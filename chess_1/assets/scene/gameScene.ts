import { _decorator, Component, EventInfo, EventTouch,screen, input, Input, Node, view, Vec3 } from 'cc';
import { battleMgr } from '../script/battleMgr';
import { actionType } from '../script/constant';
import resMgr from '../script/resMgr';
import { itemCell } from '../prefabs/items/itemCell';
const { ccclass, property } = _decorator;

@ccclass('gameScene')
export class gameScene extends Component {

    @property(Node)
    cellParent:Node

    sellectNode:itemCell
    // @property(Node)
    // cellParent:Node
    /**设计分辨率 */
    screenSzie
    /**实际分辨率 */
    viewSzie
    scaleX
    scaleY

    start() {
        this.screenSzie = view.getDesignResolutionSize()
        this.viewSzie = screen.windowSize
        this.scaleX = this.screenSzie.width / this.viewSzie.width
        this.scaleY = this.screenSzie.height / this.viewSzie.height
        console.log(this.scaleX,this.scaleY)
        input.on(Input.EventType.TOUCH_START,this.click,this)
        input.on(Input.EventType.TOUCH_MOVE,this.click,this)

        battleMgr.initBattle(actionType.red);
        this.refreshCell();
    }
    /**刷新棋盘 */
    refreshCell(){
        let map = battleMgr.getMap();
        for (var i = 0; i < map.length; i++) {
           if(map[i] > 1){
                let cell = resMgr.getItemByName('itemCell',this.cellParent)
                cell.getComponent(cell.name)['init'](this,map[i] ,i)
           }
        }
    }

    /**设置选中的棋子 */
    setSellectNode(com:itemCell){
        this.setUnSellectNode()
        this.sellectNode = com;
        this.sellectNode.sellect();
    }

    /**设置取消选中的棋子 */
    setUnSellectNode(){  
        if(this.sellectNode){
            this.sellectNode.unSellect()
        }
    }

    /**点击棋盘 */
    click(event:EventTouch){
        // console.log(event.getLocation())
        let loc = event.getLocation();
        let pos = new Vec3(loc.x * this.scaleX - this.screenSzie.width/2 - this.cellParent.position.x, loc.y * this.scaleX - this.screenSzie.height/2 - this.cellParent.position.y)
        let data =  battleMgr.judgePosByLoc(pos)
        console.log(data)
    }


    
    update(deltaTime: number) {
        
    }
}


