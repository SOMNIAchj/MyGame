import gameManager from "../logic/gameManager";

cc.Class({
    extends: cc.Component,

    properties: {
        checkerboard:cc.Node,
        item:cc.Prefab,
        clickNode:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.screenSize = cc.view.getVisibleSize();
        window.GameMgr =  new gameManager(this);
        poolMgr.creatPoolNode(this.item,32);
        this.setfield();
        this.register()
    },

    register(){
      this.clickNode.on(cc.Node.EventType.TOUCH_START,this.touchStart,this)
      this.clickNode.on(cc.Node.EventType.TOUCH_MOVE,this.touchMove,this)
      this.clickNode.on(cc.Node.EventType.TOUCH_END,this.touchEnd,this)
    },

    setfield(){
        GameMgr.createAllChessClass();
        for (let i = 0; i < GameMgr.AllChessList.length; i++) {
            var node = poolMgr.getNodeFromPool("item")
                node.parent = this.checkerboard;
                node.getComponent("item").init(GameMgr.AllChessList[i])
        }
    },
    start () {

    },

    touchStart(event){
        let location = event.getLocation();
        let posS = this.worldConvertLocalPoint(this.clickNode,cc.v2(location.x,location.y));
        let chess = GameMgr.getChessByPosition(posS.x,posS.y);
        if(!chess)return;
        chess.click()
    },

    touchMove(){

    },

    touchEnd(){

    },

    worldConvertLocalPoint(node, worldPoint){
        let nodePos = null;
        if (node) {
            nodePos =  node.convertToNodeSpaceAR(worldPoint);
        }
        return nodePos;
    }
    // update (dt) {},
});
