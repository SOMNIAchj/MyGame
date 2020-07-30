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
        var location = event.getLocation();
        var pos = {
            x:location.x,
            y:location.y - this.clickNode.height/2,
        }
        console.log(pos)
    },

    touchMove(){

    },

    touchEnd(){

    }
    // update (dt) {},
});
