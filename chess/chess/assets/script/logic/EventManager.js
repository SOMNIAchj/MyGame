export default class EventManager {

    _eventHandler = {}

    /**
     * 注册事件
     * @param eventId
     * @param handler
     */
    registerEvent(eventId, handler, target) {
        let handlers = this._eventHandler[eventId]
        if (!handlers) {
            handlers = []
        }
        handlers.push(handler)
        this._eventHandler[eventId] = handlers;
        if (target) {
            this._bindClearFunc(eventId, handler, target);
        }
    }

    _bindClearFunc(eventId, handler, target) {
        this.reBindFuc(target, 'onDestroy', () => {
            this.unregisterEvent(eventId, handler);
        });
    };

    /**
     * 通知事件
     * @param eventId
     * @param params
     */
    dispatchEvent(eventId, ...params) {
        let handlers = this._eventHandler[eventId]
        if (handlers) {
            for (let i = 0; i<handlers.length; i ++) {
                handlers[i](...params)
            }
        }
    }

    /**
     * 注销事件
     * @param eventId
     * @param handler
     */
    unregisterEvent(eventId, handler) {
        let handlers = this._eventHandler[eventId]
        if (!handlers) {
            return;
        }

        for (let i = 0; i < handlers.length; i++) {
            const oldHandler = handlers[i];
            if (oldHandler === handler) {
                handlers.splice(i, 1);
                break;
            }
        }
    }

    /**
     * 重定向方法
     * @param  {Object} obj      指定对象
     * @param  {String} funcName 方法名
     * @param  {function} callBack 执行回调
     */
    reBindFuc = function (obj, funcName, callBack) {
        const oldFunc = !obj[funcName] ? function () {
        } : obj[funcName].bind(obj);
        obj[funcName] = function () {
            oldFunc();
            callBack();
        };
    };
}