export default class poolManager{

    constructor(){

    }

    _pool = {}

    creatPoolNode(prefab,num){
        if(!this._pool[prefab.name]){
            this._pool[prefab.name] = new cc.NodePool();
            for (let i = 0; i < num; i++) {
                const node = cc.instantiate(prefab);
                this._pool[prefab.name].put(node)
            }
        }
    }

    getNodeFromPool(name){
        if(this._pool[name]&&this._pool[name].size()>0){
            return this._pool[name].get();
        }
    }

    putNodeIntoPool(node){
        if(this._pool[name]){
            return this._pool[name].put(node);
        }else {

        }
    }

}
