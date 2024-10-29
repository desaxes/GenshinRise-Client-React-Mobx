import { makeAutoObservable } from 'mobx'
export default class WeaponStore {
    constructor() {
        this._weapon = ''
        this._stars = ''
        this._material = ''
        this._pathId = ''
        this._weapons = {
            weapons: [],
            total: 0
        }
        this._todayMaterials = [

        ]
        this._searchBy = ''
        makeAutoObservable(this)
        this._maxOptions = [
            {
                stars: 3,
                weaponMat1Count: 2,
                weaponMat2Count: 6,
                weaponMat3Count: 6,
                weaponMat4Count: 3,
                enemyWMat1Count: 10,
                enemyWMat2Count: 12,
                enemyWMat3Count: 18,
                enemyMat1Count: 6,
                enemyMat2Count: 10,
                enemyMat3Count: 12
            }, {
                stars: 4,
                weaponMat1Count: 3,
                weaponMat2Count: 9,
                weaponMat3Count: 9,
                weaponMat4Count: 4,
                enemyWMat1Count: 15,
                enemyWMat2Count: 18,
                enemyWMat3Count: 27,
                enemyMat1Count: 10,
                enemyMat2Count: 15,
                enemyMat3Count: 18
            }, {
                stars: 5,
                weaponMat1Count: 5,
                weaponMat2Count: 14,
                weaponMat3Count: 14,
                weaponMat4Count: 6,
                enemyWMat1Count: 23,
                enemyWMat2Count: 27,
                enemyWMat3Count: 41,
                enemyMat1Count: 15,
                enemyMat2Count: 23,
                enemyMat3Count: 27
            }
        ]
    }
    setWeapon(weapon) {
        this._weapon = weapon
    }
    setMaterial(material) {
        this._material = material
    }
    setPathId(pathId) {
        this._pathId = pathId
    }
    setStars(stars) {
        this._stars = stars
    }
    setWeapons(weapons) {
        this._weapons = weapons
    }
    setSearchBy(name) {
        this._searchBy = name
    }
    setTodayMaterials(todayMats) {
        this._todayMaterials = todayMats
    }
    get weapon() {
        return this._weapon
    }
    get material() {
        return this._material
    }
    get stars() {
        return this._stars
    }
    get weapons() {
        return this._weapons
    }
    get pathId() {
        return this._pathId
    }
    get searchBy() {
        return this._searchBy
    }
    get todayMaterials() {
        return this._todayMaterials
    }
    get maxOptions() {
        return this._maxOptions
    }
}