import { AudioSource, director, _decorator,Node, AudioClip, sys } from 'cc';
import resMgr from './resMgr';
const { ccclass, property } = _decorator;

@ccclass('audioMgr')
class AudioMgr{
    public bgmSource :AudioSource;
    public effectSource :AudioSource;
    public effectSourceList :Array<AudioSource> = [];

    public effectVolume:number = 1;
    public BGMVolume:number = 1;
    private curBgVolume:number = 1;

    effextIndex = 0;
    public getBGMVolume(){
        return this.BGMVolume
    }
    public getEffectVolume(){
        return this.effectVolume
    }
    public setEffectVolume(num){
        num = Number(num)
        if(typeof num != 'number'){
            num = 1
        }
        this.effectVolume = num
    }
    public setBGMVolume(num){
        num = Number(num)
        if(typeof num != 'number'){
            num = 1
        }
        this.BGMVolume = num
        if( this.bgmSource){
            this.bgmSource.volume = this.curBgVolume * this.BGMVolume;
        }
    }

    init(){
        let bgm//:any= localStorageMgr.getItem('BGMVolume')
        if(bgm == undefined){
            bgm = 1
        }
        this.setBGMVolume(bgm)
        let effect//:any= localStorageMgr.getItem('effectVolume')
        if(effect == undefined){
            effect = 1
        }
        this.setEffectVolume(effect)
        if(!this.bgmSource ){
         //@en create a node as audioMgr
        //@zh 创建一个节点作为 audioMgr
        let bgmNode = new Node();
        bgmNode.name = '__audioMgr__';
        director.getScene().addChild(bgmNode);
        director.addPersistRootNode(bgmNode);
        this.bgmSource = bgmNode.addComponent(AudioSource);
        }
        if(! this.effectSource){
            for (let i = 0; i < 3; i++) {
                let effectNode = new Node();
                effectNode.name = '__audioMgr__';
                director.getScene().addChild(effectNode);
                director.addPersistRootNode(effectNode);
                this.effectSourceList.push(effectNode.addComponent(AudioSource))
                this.effectSource = effectNode.addComponent(AudioSource);
            }
        }
    }

    /**游戏战斗音效 */
    playSkillShot(soundName: string,loop : boolean = false, volume: number = 0.7,speed = 1) {
        if(!soundName)return
        let sound = resMgr.getAudioByName(soundName)
        if (sound instanceof AudioClip) {
            this.effextIndex++
            // this.effectSource.stop();
            this.effectSource.loop = loop;
            this.effectSourceList[this.effextIndex%3].playOneShot(sound, volume * this.effectVolume)
            // this.effectSource.playOneShot(sound, volume * this.effectVolume);
        }
    }

    /**
     * @en
     * play short audio, such as strikes,explosions
     * @zh
     * 播放短音频,比如 打击音效，爆炸音效等
     * audioMgr.playOneShot('',false)
     * @param sound clip or url for the audio
     * @param volume 
     */
    playOneShot(soundName: string,loop : boolean = false, volume: number = 1,) {
        if(!soundName)return
        let sound = resMgr.getAudioByName(soundName)
        if (sound instanceof AudioClip) {
            this.effectSource.loop = loop;
            this.effectSource.playOneShot(sound, volume * this.effectVolume);
        }
    }

    /**
     * @en
     * play long audio, such as the bg music
     * @zh
     * 播放长音频，比如 背景音乐
     * audioMgr.play('',false)
     * @param sound clip or url for the sound
     * @param volume 
     */
    play(soundName:string,loop:boolean = false, volume: number = 1) {
        if(!soundName)return
        if(this.bgmSource.clip&&this.bgmSource.clip.name == soundName) return
        this.curBgVolume = volume;
        let sound = resMgr.getAudioByName(soundName)
        if (sound instanceof AudioClip) {
            this.bgmSource.stop();
            this.bgmSource.clip = sound;
            this.bgmSource.loop = loop;
            this.bgmSource.volume = this.curBgVolume * this.BGMVolume;
            this.bgmSource.play();
        }
    }

    /**
     * stop the audio play
     */
    stop() {
        if(this.bgmSource){
            this.bgmSource.stop();
        }
        if(this.effectSource){
            this.effectSource.stop();
        }
    }

    /**
     * pause the audio play
     */
    pause() {
        if(this.bgmSource){
            this.bgmSource.pause();
        }
        if(this.effectSource){
            this.effectSource.pause();
        }
    }

    /**
     * resume the audio play
     */
    resume(){
        if(this.bgmSource){
            this.bgmSource.play();
        }
        if(this.effectSource){
            this.effectSource.play();
        }
    }
}
const audioMgr = new AudioMgr();
export default audioMgr;

