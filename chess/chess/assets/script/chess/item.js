cc.Class({
    extends: cc.Component,

    properties: {
        content:cc.Sprite,
        kuang:cc.Node,
        redSprite:[cc.SpriteFrame],
        blackSprite:[cc.SpriteFrame],
        DeathRedKing:cc.SpriteFrame,
        DeathBlackKing:cc.SpriteFrame,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    init(entity){

    },

    setPosition(pos){
        this.node.setPosition(pos)
    },

    setSelect(){
        this.kuang.active = true;
    },

    setUnSelect(){
        this.kuang.active = false;
    },

    Death(){

    }
    // update (dt) {},
});
