import constants from "../base/constants";

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

    onLoad () {
        clievent.registerEvent(constant.EventName.unSelectChess,this.setUnSelect.bind(this))
    },

    init(entity){
        if(!entity)return;
        this.entity = entity;
        entity.event.registerEvent(constant.EntityEventName.selectChess,this.setSelect.bind(this));
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
        this.entity.State = constant.ChessState.Die;
    }

    // update (dt) {},
});
