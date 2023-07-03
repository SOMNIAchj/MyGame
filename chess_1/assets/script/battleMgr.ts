import { actionType, constant } from "./constant";

class BattleMgr{
    /**棋盘 */
    boardMap
    action:actionType

    initBattle(actionType:actionType){
        this.action = actionType
        this.initMap()
    }

    /**初始化空棋盘 */
    initMap(){
        this.boardMap = new Array(16*16).fill(0)
        for (var i = 0; i < 16; i++) {
           for (var j = 0; j < 16; j++) {
              if((i > 2 && i < 12)  &&   (j> 2 && j < 13)){
                this.boardMap[i+j*16] = 1;
              }
           }
        }
        this.spawnCell(this.action == actionType.red)
        this.logMap()
    }
    /**打印棋盘 */
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

    /**
     * 生成棋子
     * @param 先手 红色方在下
     */
    spawnCell(first){
        for (var i = 0; i < constant.redList.length; i++) {
            this.boardMap[constant.downPos[i]] = first ?  constant.redList[i]:constant.blackList[i]
            this.boardMap[constant.upPos[i]] = first ? constant.blackList[i]:constant.redList[i]
        }
    }
    /**获取棋盘 */
    getMap(){
        return this.boardMap
    }

}
export const battleMgr = new BattleMgr()
