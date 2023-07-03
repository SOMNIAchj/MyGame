import { _decorator, Component, Node, Sprite, Vec3 } from 'cc';
import resMgr from '../../script/resMgr';
const { ccclass, property } = _decorator;

@ccclass('itemCell')
export class itemCell extends Component {
    
    type

    start() {

    }

    init(type,index){
        this.type = type
        this.node.getComponent(Sprite).spriteFrame = resMgr.getSpriteFrame(this.type)
        
        let x = index%16 * 73
        let y = Math.floor(index/16) * 73
        this.node.setPosition(new Vec3(x,-y,0))
    }

    update(deltaTime: number) {
        
    }
}


