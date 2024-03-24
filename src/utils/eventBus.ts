export default class EventBus {
    private static _instance: EventBus
    private _eventMap: Map<string, Array<Function>>
    private constructor() {
        this._eventMap = new Map<string, Array<Function>>()
    }
    public on(eventName: string, callback: Function) {
        if (!this._eventMap.has(eventName)) {
            this._eventMap.set(eventName, [])
        }
        this._eventMap.get(eventName)?.push(callback)
        
    }
    // emit events.
    public emit(eventName: string, ...args: any[]) {
        if (this._eventMap.has(eventName)) {
            this._eventMap.get(eventName)?.forEach(callback => {
                callback(...args)
            })
        }
    }
    // singleton pattern.
    public static createBus(): EventBus{
        if (!EventBus._instance) {
            EventBus._instance = new EventBus()
        }
        return EventBus._instance
    }
}