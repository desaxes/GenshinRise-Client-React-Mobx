import { makeAutoObservable } from 'mobx'
export default class ArtsStore {
    constructor() {
        this._art = ''
        this._arts = []
        makeAutoObservable(this)
    }
    setArt(art) {
        this._art = art
    }
    setArts(arts) {
        this._arts = arts
    }
    get art() {
        return this._art
    }
    get arts() {
        return this._arts
    }
}