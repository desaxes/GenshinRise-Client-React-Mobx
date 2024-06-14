import { makeAutoObservable } from 'mobx'
export default class MaterialStore {
    constructor() {
        this._bossMaterials = [
        ]
        this._stones = [
        ]
        this._enemyMaterials = [
        ]
        this._localSpecialtys = [
        ]
        this._weekBossMaterials = [
        ]
        this._talents = [
        ]
        this._enemyWeaponMaterials = [
        ]
        this._weaponMaterials = [
        ]
        this._todayTalents = [

        ]
        this._timers = [

        ]
        this._region = ''
        makeAutoObservable(this)
    }

    setBossMaterials(bossMaterials) {
        this._bossMaterials = bossMaterials
    }
    setStones(stones) {
        this._stones = stones
    }
    setEnemyMaterials(enemyMaterials) {
        this._enemyMaterials = enemyMaterials
    }
    setLocalSpecialtys(localSpecialtys) {
        this._localSpecialtys = localSpecialtys
    }
    setWeekBossMaterials(weekBossMaterials) {
        this._weekBossMaterials = weekBossMaterials
    }
    setTalents(talents) {
        this._talents = talents
    }
    setEnemyWeaponMaterials(ewmat) {
        this._enemyWeaponMaterials = ewmat
    }
    setWeaponMaterials(wmat) {
        this._weaponMaterials = wmat
    }
    setTodayTalents(todayTalents) {
        this._todayTalents = todayTalents
    }
    setRegion(region) {
        this._region = region
    }
    setTimers(timers) {
        this._timers = timers
    }
    get bossMaterials() {
        return this._bossMaterials
    }
    get stones() {
        return this._stones
    }
    get enemyMaterials() {
        return this._enemyMaterials
    }
    get localSpecialtys() {
        return this._localSpecialtys
    }
    get weekBossMaterials() {
        return this._weekBossMaterials
    }
    get talents() {
        return this._talents
    }
    get enemyWeaponMaterials() {
        return this._enemyWeaponMaterials
    }
    get weaponMaterials() {
        return this._weaponMaterials
    }
    get todayTalents() {
        return this._todayTalents
    }
    get region() {
        return this._region
    }
    get timers() {
        return this._timers
    }
}