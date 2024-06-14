import { makeAutoObservable } from 'mobx'
export default class RollStore {
    constructor() {
        this._standartRolls = {
            rolls: [],
            total: 0
        }
        this._eventRolls = {
            rolls: [],
            total: 0
        }
        this._weaponRolls = {
            rolls: [],
            total: 0
        }
        makeAutoObservable(this)
    }
    setStandartRolls(rolls) {
        this._standartRolls = rolls
    }
    get standartRolls() {
        return this._standartRolls
    }
    setEventRolls(rolls) {
        this._eventRolls = rolls
    }
    get eventRolls() {
        return this._eventRolls
    }
    setWeaponRolls(rolls) {
        this._weaponRolls = rolls
    }
    get weaponRolls() {
        return this._weaponRolls
    }
}