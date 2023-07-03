import { _decorator, Node, assetManager, instantiate, NodePool, sp, Prefab, SpriteFrame, AudioClip, SpriteAtlas, Texture2D, JsonAsset, ImageAsset } from 'cc';
const { ccclass, property } = _decorator;


@ccclass('resMgr')
class ResMgr{
    _itemPrefabs : object = {};
    _audio:object = {};
    _spriteFrames : object = {};//英雄图标
    itemPools : object= {};

    /**获取对象池里或加载的节点 */
    public getItemByName(name:string,parent?:Node) : Node{
        let node: Node;
        if(this.itemPools[name]){
            if(this.itemPools[name].size() > 0 ){
                node =  this.itemPools[name].get();
            }else{
                node = instantiate(this._itemPrefabs[name]); 
            }
        }else{
            this.itemPools[name] = new NodePool(name);
            node =  instantiate(this._itemPrefabs[name]);
        }
        if(parent){
            node.parent = parent;
        }
        return node;
    }

    public getPrefabByName(name:string):Prefab{
        return this._itemPrefabs[name]
    }

    public putItem(node:Node){
        if(!node)return;
        let name = node.name;
        if(!this.itemPools[name]){
            this.itemPools[name] = new NodePool(name);
        }
        this.itemPools[name].put(node)
    }
    /**
     * 回收节点所有子节点
     */
    public recoverNodeChildern(node){
        if(!node)return
        let childrens = node.children;
        if(childrens){
            for (let i = childrens.length -1; i >= 0; i--) {
                let chi = childrens[i];
                if(chi){
                    this.putItem(chi);
                }
            }
        }
    }


    init(cb){
        this.loadItems(()=>{
            this._loadAssets('images/cell',cb,this._spriteFrames,SpriteFrame)
            // this._loadAssets('audio',cb,this._audio,AudioClip)
        })
    }



    loadItems(cb:Function){
        this._loadAssets('prefabs/items',cb,this._itemPrefabs)
    }

    _loadAssets(path:string,cb:Function = null,assetsObj:object,type?){
        let paths = path.split('/');
        var dirPath = path.slice(paths[0].length + 1,path.length)
        assetManager.loadBundle(paths[0],(err,bunld)=>{
            bunld.loadDir(dirPath,
            (err,assets)=>{
                if(err){
                    return false
                }
                for (let index = 0; index < assets.length; index++) {
                    const element = assets[index];
                    if(type){
                        if(element instanceof type){
                            assetsObj[element.name] = element;
                        }
                    }else{
                        assetsObj[element.name] = element;
                    }
                   
                }
                cb&&cb()
            })
        })
   }

   /**
    * 加载图片
    * @param name 
    * @returns 
    */
   getSpriteFrame(name){
        return this._spriteFrames[name];
   }
    
    /**
     * 音效文件
     * @param name 
     * @returns 
     */
    getAudioByName(name){
        return this._audio[name];

    }

}

const resMgr = new ResMgr();
globalThis.resMgr = resMgr;
export default resMgr

