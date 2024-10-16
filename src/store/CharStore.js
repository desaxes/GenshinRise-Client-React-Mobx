import { makeAutoObservable } from 'mobx'
export default class CharStore {
    constructor() {
        this._element = ''
        this._weapon = ''
        this._region = ''
        this._stars = ''
        this._sex = ''
        this._size = ''
        this._talent = ''
        this._material = ''
        this._path = ''
        this._chars = {
            chars: [],
            total: 0
        }
        this._searchBy = ''
        makeAutoObservable(this)
    }

    setElement(element) {
        this._element = element
    }
    setWeapon(weapon) {
        this._weapon = weapon
    }
    
    setRegion(region) {
        this._region = region
    }
    setStars(stars) {
        this._stars = stars
    }
    
    setSex(sex) {
        this._sex = sex
    }
    setSize(size) {
        this._size = size
    }
    setTalent(talent) {
        this._talent = talent
    }
    setMaterial(material) {
        this._material = material
    }
    setPath(path) {
        this._path = path
    }
    setChars(chars) {
        this._chars = chars
    }
    setSearchBy(name) {
        this._searchBy = name
    }
    get element() {
        return this._element
    }
    get weapon() {
        return this._weapon
    }
    get region() {
        return this._region
    }
    get stars() {
        return this._stars
    }
    get sex() {
        return this._sex
    }
    get size() {
        return this._size
    }
    get talent() {
        return this._talent
    }
    get material() {
        return this._material
    }
    get path() {
        return this._path
    }
    get chars() {
        return this._chars
    }
    get searchBy() {
        return this._searchBy
    }
}