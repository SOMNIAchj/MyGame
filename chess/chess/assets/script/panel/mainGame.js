import gameManager from "../logic/gameManager";

cc.Class({
    extends: cc.Component,

    properties: {
        checkerboard:cc.Node,
        item:cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        window.GameMgr =  new gameManager(this);
        poolMgr.creatPoolNode(this.item,32);
        this.setfield();
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

    // update (dt) {},
});
