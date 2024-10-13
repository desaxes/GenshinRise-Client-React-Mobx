import { makeAutoObservable } from 'mobx'
export default class AppStore {
    constructor() {
        this._init = false
        this._updated = false
        this._game = 'Genshin'
        makeAutoObservable(this)
    }
    setInit(init) {
        this._init = init
    }
    setUpdated(updated) {
        this._updated = updated
    }
    setGame(game) {
        this._game = game
    }
    get init() {
        return this._init
    }
    get updated() {
        return this._updated
    }
    get game() {
        return this._game
    }
}