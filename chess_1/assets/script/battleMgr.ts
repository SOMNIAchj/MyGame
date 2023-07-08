import audioMgr from "./audioMgr";
import { GameState, PIECEID, actionType, constant } from "./constant";

class BattleMgr{
    /**棋盘 */
    boardMap
    /**索引 */
    sellectIndex
    sdPlayer = 0
    /**棋盘反转 */
    isReversal
    gameScene
    gameState:GameState
    /**是否正在被将军 */
    isCheckIng
    /**获取棋盘是否反转 */
    getIsReversal(){
      return this.isReversal
    }

    getIsGaming(){
        return this.gameState == GameState.gaming
    }

    setGameState(gameState){
        this.gameState = gameState
    }

    initBattle(gameScene,type:actionType){
        this.gameScene = gameScene;
        this.isReversal = type == actionType.blk;
        this.isCheckIng = false
        this.initMap()
    }

    /**初始化 */
    initMap(){
        this.boardMap = new Array(16*16).fill(0)
        this.copyInitMap()
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


    /**
     * 是否选中棋子
     * @param index 
     * @returns 
     */
    isSellect(index){
        if(this.sdPlayer){
            return (this.boardMap[index]&16) !== 0
        }else{
            return (this.boardMap[index]&8) != 0
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
    /**搬一步棋的棋子*/
    MovePiece(mv) {
        let sqSrc, sqDst, pc, pcCaptured;
        sqSrc = this.SRC(mv);
        sqDst = this.DST(mv);
        pcCaptured = this.boardMap[sqDst];
        this.DelPiece(sqDst);
        pc = this.boardMap[sqSrc];
        this.DelPiece(sqSrc);
        this.AddPiece(sqDst, pc);
        return pcCaptured;
    }

/**撤消搬一步棋的棋子*/
UndoMovePiece(mv,pcCaptured) {
  let sqSrc, sqDst, pc;
  sqSrc = this.SRC(mv);
  sqDst = this.DST(mv);
  pc = this.boardMap[sqDst];
  this.DelPiece(sqDst);
  this.AddPiece(sqSrc, pc);
  this.AddPiece(sqDst, pcCaptured);
}

/**走一步棋*/
MakeMove(mv) {
  let pc;
  pc = this.MovePiece(mv);
  if (this.Checked()) {
    this.UndoMovePiece(mv, pc);
    return false;
  }
  this.ChangeSide();
  return true;
}

// 生成所有走法
GenerateMoves(mvs) {
  let i, j, nGenMoves, nDelta, sqSrc, sqDst;
  let pcSelfSide, pcOppSide, pcSrc, pcDst;
  // 生成所有走法，需要经过以下几个步骤：

  nGenMoves = 0;
  pcSelfSide = this.SIDE_TAG(this.sdPlayer);
  pcOppSide = this.OPP_SIDE_TAG(this.sdPlayer);
  for (sqSrc = 0; sqSrc < 256; sqSrc ++) {

    // 1. 找到一个本方棋子，再做以下判断：
    pcSrc = this.boardMap[sqSrc];
    if ((pcSrc & pcSelfSide) == 0) {
      continue;
    }

    // 2. 根据棋子确定走法
    switch (pcSrc - pcSelfSide) {
    case PIECEID.PIECE_KING:
      for (i = 0; i < 4; i ++) {
        sqDst = sqSrc + constant.KingDelta[i];
        if (!this.IN_FORT(sqDst)) {
          continue;
        }
        pcDst = this.boardMap[sqDst];
        if ((pcDst & pcSelfSide) == 0) {
          mvs[nGenMoves] = this.MOVE(sqSrc, sqDst);
          nGenMoves ++;
        }
      }
      break;
    case PIECEID.PIECE_ADVISOR:
      for (i = 0; i < 4; i ++) {
        sqDst = sqSrc + constant.AdvisorDelta[i];
        if (!this.IN_FORT(sqDst)) {
          continue;
        }
        pcDst = this.boardMap[sqDst];
        if ((pcDst & pcSelfSide) == 0) {
          mvs[nGenMoves] = this.MOVE(sqSrc, sqDst);
          nGenMoves ++;
        }
      }
      break;
    case PIECEID.PIECE_BISHOP:
      for (i = 0; i < 4; i ++) {
        sqDst = sqSrc + constant.AdvisorDelta[i];
        if (!(this.IN_BOARD(sqDst) && this.HOME_HALF(sqDst, this.sdPlayer) && this.boardMap[sqDst] == 0)) {
          continue;
        }
        sqDst += constant.AdvisorDelta[i];
        pcDst = this.boardMap[sqDst];
        if ((pcDst & pcSelfSide) == 0) {
          mvs[nGenMoves] = this.MOVE(sqSrc, sqDst);
          nGenMoves ++;
        }
      }
      break;
    case PIECEID.PIECE_KNIGHT:
      for (i = 0; i < 4; i ++) {
        sqDst = sqSrc + constant.KingDelta[i];
        if (this.boardMap[sqDst] != 0) {
          continue;
        }
        for (j = 0; j < 2; j ++) {
          sqDst = sqSrc + constant.KnightDelta[i][j];
          if (!this.IN_BOARD(sqDst)) {
            continue;
          }
          pcDst = this.boardMap[sqDst];
          if ((pcDst & pcSelfSide) == 0) {
            mvs[nGenMoves] = this.MOVE(sqSrc, sqDst);
            nGenMoves ++;
          }
        }
      }
      break;
    case PIECEID.PIECE_ROOK:
      for (i = 0; i < 4; i ++) {
        nDelta = constant.KingDelta[i];
        sqDst = sqSrc + nDelta;
        while (this.IN_BOARD(sqDst)) {
          pcDst = this.boardMap[sqDst];
          if (pcDst == 0) {
              mvs[nGenMoves] = this.MOVE(sqSrc, sqDst);
              nGenMoves ++;
          } else {
            if ((pcDst & pcOppSide) != 0) {
              mvs[nGenMoves] = this.MOVE(sqSrc, sqDst);
              nGenMoves ++;
            }
            break;
          }
          sqDst += nDelta;
        }
      }
      break;
    case PIECEID.PIECE_CANNON:
      for (i = 0; i < 4; i ++) {
        nDelta = constant.KingDelta[i];
        sqDst = sqSrc + nDelta;
        while (this.IN_BOARD(sqDst)) {
          pcDst = this.boardMap[sqDst];
          if (pcDst == 0) {
            mvs[nGenMoves] = this.MOVE(sqSrc, sqDst);
            nGenMoves ++;
          } else {
            break;
          }
          sqDst += nDelta;
        }
        sqDst += nDelta;
        while (this.IN_BOARD(sqDst)) {
          pcDst = this.boardMap[sqDst];
          if (pcDst != 0) {
            if ((pcDst & pcOppSide) != 0) {
              mvs[nGenMoves] = this.MOVE(sqSrc, sqDst);
              nGenMoves ++;
            }
            break;
          }
          sqDst += nDelta;
        }
      }
      break;
    case PIECEID.PIECE_PAWN:
      sqDst = this.SQUARE_FORWARD(sqSrc, this.sdPlayer);
      if (this.IN_BOARD(sqDst)) {
        pcDst = this.boardMap[sqDst];
        if ((pcDst & pcSelfSide) == 0) {
          mvs[nGenMoves] = this.MOVE(sqSrc, sqDst);
          nGenMoves ++;
        }
      }
      if (this.AWAY_HALF(sqSrc, this.sdPlayer)) {
        for (nDelta = -1; nDelta <= 1; nDelta += 2) {
          sqDst = sqSrc + nDelta;
          if (this.IN_BOARD(sqDst)) {
            pcDst = this.boardMap[sqDst];
            if ((pcDst & pcSelfSide) == 0) {
              mvs[nGenMoves] = this.MOVE(sqSrc, sqDst);
              nGenMoves ++;
            }
          }
        }
      }
      break;
    }
  }
  return nGenMoves;
}

// 判断走法是否合理
LegalMove(mv) :boolean{
  /**
   * @param sqSrc 起点
   * @param sqDst 终点
   */
  let sqSrc, sqDst, sqPin;
  let pcSelfSide, pcSrc, pcDst, nDelta;
  // 判断走法是否合法，需要经过以下的判断过程：

  // 1. 判断起始格是否有自己的棋子
  sqSrc = this.SRC(mv);
  pcSrc = this.boardMap[sqSrc];
  pcSelfSide = this.SIDE_TAG(this.sdPlayer);
  if ((pcSrc & pcSelfSide) == 0) {
    return false;
  }

  // 2. 判断目标格是否有自己的棋子
  sqDst = this.DST(mv);
  pcDst = this.boardMap[sqDst];
  if ((pcDst & pcSelfSide) != 0) {
    return false;
  }

  // 3. 根据棋子的类型检查走法是否合理
  switch (pcSrc - pcSelfSide) {
  case PIECEID.PIECE_KING:
    return this.IN_FORT(sqDst) && this.KING_SPAN(sqSrc, sqDst);
  case PIECEID.PIECE_ADVISOR:
    return this.IN_FORT(sqDst) && this.ADVISOR_SPAN(sqSrc, sqDst);
  case PIECEID.PIECE_BISHOP:
    return this.SAME_HALF(sqSrc, sqDst) && this.BISHOP_SPAN(sqSrc, sqDst) &&
        this.boardMap[this.BISHOP_PIN(sqSrc, sqDst)] == 0;
  case PIECEID.PIECE_KNIGHT:
    sqPin = this.KNIGHT_PIN(sqSrc, sqDst);
    return sqPin != sqSrc && this.boardMap[sqPin] == 0;
  case PIECEID.PIECE_ROOK:
  case PIECEID.PIECE_CANNON:
    if (this.SAME_RANK(sqSrc, sqDst)) {
      nDelta = (sqDst < sqSrc ? -1 : 1);
    } else if (this.SAME_FILE(sqSrc, sqDst)) {
      nDelta = (sqDst < sqSrc ? -16 : 16);
    } else {
      return false;
    }
    sqPin = sqSrc + nDelta;
    while (sqPin != sqDst && this.boardMap[sqPin] == 0) {
      sqPin += nDelta;
    }
    if (sqPin == sqDst) {
      return pcDst == 0 || pcSrc - pcSelfSide == PIECEID.PIECE_ROOK;
    } else if (pcDst != 0 && pcSrc - pcSelfSide == PIECEID.PIECE_CANNON) {
      sqPin += nDelta;
      while (sqPin != sqDst && this.boardMap[sqPin] == 0) {
        sqPin += nDelta;
      }
      return sqPin == sqDst;
    } else {
      return false;
    }
  case PIECEID.PIECE_PAWN:
    if (this.AWAY_HALF(sqDst,this.sdPlayer) && (sqDst == sqSrc - 1 || sqDst == sqSrc + 1)) {
      return true;
    }
    return sqDst == this.SQUARE_FORWARD(sqSrc, this.sdPlayer);
  default:
    return false;
  }
}

// 判断是否被将军
Checked():boolean {
  let i, j, sqSrc, sqDst;
  let pcSelfSide, pcOppSide, pcDst, nDelta;
  pcSelfSide = this.SIDE_TAG(this.sdPlayer);
  pcOppSide = this.OPP_SIDE_TAG(this.sdPlayer);
  // 找到棋盘上的帅(将)，再做以下判断：

  for (sqSrc = 0; sqSrc < 256; sqSrc ++) {
    if (this.boardMap[sqSrc] != pcSelfSide + PIECEID.PIECE_KING) {
      continue;
    }

    // 1. 判断是否被对方的兵(卒)将军
    if (this.boardMap[this.SQUARE_FORWARD(sqSrc, this.sdPlayer)] == pcOppSide + PIECEID.PIECE_PAWN) {
      return true;
    }
    for (nDelta = -1; nDelta <= 1; nDelta += 2) {
      if (this.boardMap[sqSrc + nDelta] == pcOppSide + PIECEID.PIECE_PAWN) {
        return true;
      }
    }

    // 2. 判断是否被对方的马将军(以仕(士)的步长当作马腿)
    for (i = 0; i < 4; i ++) {
      if (this.boardMap[sqSrc + constant.AdvisorDelta[i]] != 0) {
        continue;
      }
      for (j = 0; j < 2; j ++) {
        pcDst = this.boardMap[sqSrc + constant.KnightCheckDelta[i][j]];
        if (pcDst == pcOppSide + PIECEID.PIECE_KNIGHT) {
          return true;
        }
      }
    }

    // 3. 判断是否被对方的车或炮将军(包括将帅对脸)
    for (i = 0; i < 4; i ++) {
      nDelta = constant.KingDelta[i];
      sqDst = sqSrc + nDelta;
      while (this.IN_BOARD(sqDst)) {
        pcDst = this.boardMap[sqDst];
        if (pcDst != 0) {
          if (pcDst == pcOppSide + PIECEID.PIECE_ROOK || pcDst == pcOppSide + PIECEID.PIECE_KING) {
            return true;
          }
          break;
        }
        sqDst += nDelta;
      }
      sqDst += nDelta;
      while (this.IN_BOARD(sqDst)) {
        let pcDst = this.boardMap[sqDst];
        if (pcDst != 0) {
          if (pcDst == pcOppSide + PIECEID.PIECE_CANNON) {
            return true;
          }
          break;
        }
        sqDst += nDelta;
      }
    }
    return false;
  }
  return false;
}

  /**判断是否被杀*/
  IsMate() {
    let i, nGenMoveNum, pcCaptured;
    let mvs = [];

    nGenMoveNum = this.GenerateMoves(mvs);
    if(nGenMoveNum > constant.MAX_GEN_MOVES) return console.error('超过最大步数！')
    for (i = 0; i < nGenMoveNum; i ++) {
      pcCaptured = this.MovePiece(mvs[i]);
      if (!this.Checked()) {
        this.UndoMovePiece(mvs[i], pcCaptured);
        return false;
      } else {
        this.UndoMovePiece(mvs[i], pcCaptured);
      }
    }
    return true;
  }
    /**点击棋盘  */
    clickBoard(pos){
        if(!this.getIsGaming())return
        let sqDst = pos.y * 16 + pos.x;
        let isSellect  = this.isSellect(sqDst);
        if(isSellect){
          this.sellectIndex = sqDst;
          this.gameScene.refreshCell();
        }else if(this.sellectIndex){
          let mv = this.MOVE(this.sellectIndex,sqDst)
          let islegal = this.LegalMove(mv);
          if(islegal){
            this.MakeMove(mv)
            let isMate = this.IsMate();
            if(isMate){
                let name = this.sdPlayer ? 'WIN':'LOSS'
                audioMgr.playOneShot(name)
                this.setGameState(GameState.stop)
                this.gameScene.refreshCell();
                return
            }
            let isCheck = this.Checked();
            if(isCheck){
                console.log('将军!!')
            }
            this.sellectIndex = 0
            this.gameScene.refreshCell();
          }else{
            audioMgr.playOneShot('fobiden')
          }
        }else{
          audioMgr.playOneShot('click')
        }
    }

    getSellectIndex(){
        return this.sellectIndex
    }
}
export const battleMgr = new BattleMgr()
