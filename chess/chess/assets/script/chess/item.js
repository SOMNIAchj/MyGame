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
        if(!entity)return;
        var pos = entity.getBoardPosition();
        this.setPosition(cc.v2(pos.x,pos.y));
        this.node.angle = entity.getRotation();
        this.content.spriteFrame = entity.camp === constant.camp.Red ? this.redSprite[entity.id] : this.blackSprite[entity.id]
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
