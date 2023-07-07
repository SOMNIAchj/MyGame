import { actionType, constant } from "./constant";

class BattleMgr{
    /**棋盘 */
    boardMap
    action:actionType
    /**索引 */
    sellectIndex
    sdPlayer = 0







    initBattle(actionType:actionType){
        this.action = actionType
        this.initMap()
    }

    /**初始化 */
    initMap(){
        this.boardMap = new Array(16*16).fill(0)
        this.logMap()
    }
    /**赋值初始化地图 */
    copyInitMap(){
        for (var i = 0; i < constant.InitBoard.length; i++) {
            this.boardMap[i] = constant.InitBoard[i];
        }
    }

    /**打印 */
    logMap(){
        let str = ''
        for (var i = 0; i < this.boardMap.length; i++) {
            if(i&&i%16 == 0){
                str +='\n'
            }
            str += this.boardMap[i] >= 10 ? ' '+this.boardMap[i] : '  ' +this.boardMap[i]
        }
        console.log(str)
    }

    /**获得地图 */
    getMap(){
        return this.boardMap
    }

    /**判断棋子是否在棋盘中*/
    IN_BOARD(sq) {
        return constant.InBoard[sq] != 0;
    }
  
  /**判断棋子是否在九宫中*/
  IN_FORT(sq) {
    return constant.InFort[sq] != 0;
  }
  
  /**获得格子的横坐标*/
  RANK_Y(sq) {
    return sq >> 4;
  }
  
  /**获得格子的纵坐标*/
    FILE_X(sq) {
    return sq & 15;
  }
  
  /**根据纵坐标和横坐标获得格子*/
  COORD_XY(x,y) {
    return x + (y << 4);
  }
  
  /**翻转格子*/
  SQUARE_FLIP(sq) {
    return 254 - sq;
  }
  
  /**纵坐标水平镜像*/
  FILE_FLIP(x) {
    return 14 - x;
  }
  
  /**横坐标垂直镜像*/
  RANK_FLIP(y) {
    return 15 - y;
  }
  
  /**格子水平镜像*/
  MIRROR_SQUARE(sq) {
    return this.COORD_XY(this.FILE_FLIP(this.FILE_X(sq)), this.RANK_Y(sq));
  }
  
  /**格子水平镜像*/
  SQUARE_FORWARD(sq, sd) {
    return sq - 16 + (sd << 5);
  }
  
  /**走法是否符合帅(将)的步长*/
  KING_SPAN(sqSrc, sqDst) {
    return constant.LegalSpan[sqDst - sqSrc + 256] == 1;
  }
  
  /**走法是否符合仕(士)的步长*/
  ADVISOR_SPAN(sqSrc, sqDst) {
    return constant.LegalSpan[sqDst - sqSrc + 256] == 2;
  }
  
  /**走法是否符合相(象)的步长*/
  BISHOP_SPAN(sqSrc,sqDst) {
    return constant.LegalSpan[sqDst - sqSrc + 256] == 3;
  }
  
  /**相(象)眼的位置*/
  BISHOP_PIN(sqSrc, sqDst) {
    return (sqSrc + sqDst) >> 1;
  }
  
  /**马腿的位置*/
  KNIGHT_PIN(sqSrc,sqDst) {
    return sqSrc + constant.KnightPin[sqDst - sqSrc + 256];
  }
  
  /**是否未过河*/
  HOME_HALF(sq, sd) {
    return (sq & 0x80) != (sd << 7);
  }
  
  /**是否已过河*/
  AWAY_HALF(sq, sd) {
    return (sq & 0x80) == (sd << 7);
  }
  
  /**是否在河的同一边*/
  SAME_HALF(sqSrc, sqDst) {
    return ((sqSrc ^ sqDst) & 0x80) == 0;
  }
  
  /**是否在同一行*/
  SAME_RANK(sqSrc, sqDst) {
    return ((sqSrc ^ sqDst) & 0xf0) == 0;
  }
  
  /**是否在同一列*/
  SAME_FILE(sqSrc, sqDst) {
    return ((sqSrc ^ sqDst) & 0x0f) == 0;
  }
  
  /**获得红黑标记(红子是8，黑子是16)*/
  SIDE_TAG(sd) {
    return 8 + (sd << 3);
  }
  
  /**获得对方红黑标记*/
  OPP_SIDE_TAG(sd) {
    return 16 - (sd << 3);
  }
  
  /**获得走法的起点*/
  SRC(mv) {
    return mv & 255;
  }
  
  /**获得走法的终点*/
  DST(mv) {
    return mv >> 8;
  }
  
  /**根据起点和终点获得走法*/
  MOVE(sqSrc,sqDst) {
    return sqSrc + sqDst * 256;
  }
  
  /**走法水平镜像*/
  MIRROR_MOVE(mv) {
    return this.MOVE(this.MIRROR_SQUARE(this.SRC(mv)), this.MIRROR_SQUARE(this.DST(mv)));
  }
    /**交换走子方*/
    ChangeSide() {        
        this.sdPlayer = 1 - this.sdPlayer;
    }
    /**在棋盘上放一枚棋子 */
    AddPiece(sq, pc) {
        this.boardMap[sq] = pc;
    }
    /**从棋盘上拿走一枚棋子 */
    DelPiece(sq) {
        this.boardMap[sq] = 0;
    }

    /**选择棋子 */
    sellectCell(index){
        let flag = this.isSellect(index);
        if(flag){
            this.sellectIndex = index
        }
        return flag
    }

    /**
     * 是否选中棋子
     * @param index 
     * @returns 
     */
    isSellect(index){
        if(this.action == actionType.red){
            return (this.boardMap[index]&8) !== 0
        }else{
            return (this.boardMap[index]&16) != 0
        }
    }
    /**
     * 判断是否是选中的棋子
     * @param index 
     */
    judgeIsSelect(index){
        if(this.sellectIndex == index){
            this.sellectIndex  = null
            return true
        }else{
            return false
        }
      
    }
    /**
     * 获取坐标
     */
    judgePosByLoc(loc){
        return{
            x:Math.round(loc.x/73),
            y:Math.round(-loc.y/73)
        }
    }
    /**点击棋盘  */
    clickBoard(pos){
        let index = pos.y * 26 + pos.x
        if(this.sellectIndex){
            let target = this.boardMap[index];
            if(target){
                let type = this.boardMap[this.sellectIndex];
                switch(type){
                     /**�� */
                    case 8||16:{
                        
                        let list = []
                       
                       
                        
                        return list
                    }
                }


            }else{
                console.log('��������')
            }
        }
    }

}
export const battleMgr = new BattleMgr()
