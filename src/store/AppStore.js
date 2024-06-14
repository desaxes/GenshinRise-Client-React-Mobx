import { makeAutoObservable } from 'mobx'
export default class AppStore {
    constructor() {
        this._init = false
        this._updated = false
        makeAutoObservable(this)
    }
    setInit(init) {
        this._init = init
    }
    setUpdated(updated) {
        this._updated = updated
    }
    get init() {
        return this._init
    }
    get updated() {
        return this._updated
    }
}