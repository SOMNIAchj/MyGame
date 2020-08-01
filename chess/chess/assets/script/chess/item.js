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
        entity.event.registerEvent(constant.EntityEventName.setPosition,this.setPosition.bind(this));
        entity.event.registerEvent(constant.EntityEventName.dead,this.Death.bind(this));
        this.setPosition();
        this.node.angle = entity.getRotation();
        this.content.spriteFrame = entity.camp === constant.camp.Red ? this.redSprite[entity.id] : this.blackSprite[entity.id]
    },

    setPosition(){
        var pos = this.entity.getBoardPosition();
        this.node.setPosition(cc.v2(pos.x,pos.y))
    },

    setSelect(){
        this.kuang.active = true;
    },

    setUnSelect(){
        this.kuang.active = false;
    },

    Death(){
        this.entity.State = constant.ChessState.Die;
        poolMgr.putNodeIntoPool(this.node)
    }

    // update (dt) {},
});
