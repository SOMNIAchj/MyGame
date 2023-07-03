import { _decorator, Component, Node } from 'cc';
import { battleMgr } from '../script/battleMgr';
import { actionType } from '../script/constant';
import resMgr from '../script/resMgr';
const { ccclass, property } = _decorator;

@ccclass('gameScene')
export class gameScene extends Component {

    @property(Node)
    cellParent:Node
    // @property(Node)
    // cellParent:Node

    start() {
        battleMgr.initBattle(actionType.red);
        this.refreshCell();
    }
    /**刷新棋盘 */
    refreshCell(){
        let map = battleMgr.getMap();
        for (var i = 0; i < map.length; i++) {
           if(map[i] > 1){
                let cell = resMgr.getItemByName('itemCell',this.cellParent)
                cell.getComponent(cell.name)['init'](map[i] ,i)
           }
        }
    }

    update(deltaTime: number) {
        
    }
}


