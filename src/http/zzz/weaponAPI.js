import { $authHost, $host } from "../";

export const createZzzWeapon = async (formdata) => {
    try {
        const res = await $authHost.post('zzz/weapons', formdata)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const getZzzWeapons = async (query) => {
    try {
        const res = await $host.get('zzz/weapons?limit=500&' + query)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const getZzzWeaponById = async (id) => {
    try {
        const res = await $host.get('zzz/weapons/' + id)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const addZzzWeaponToCol = async (data) => {
    try {
        const res = await $authHost.post('zzz/weaponcollection', data)
        return res
    }
    catch (e) {
        console.log('character already exists')
    }
}
export const getZzzWeaponsFromCol = async (query) => {
    try {
        const res = await $host.get('zzz/weaponcollection?limit=500&'+query)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const getZzzWeaponFromColById = async (id) => {
    try {
        const res = await $host.get('zzz/weaponcollection/' + id)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const addZzzWeaponToRise = async (data) => {
    try {
        const res = await $authHost.post('zzz/weaponrise', data)
        return res
    }
    catch (e) {
        console.log('weapon already exists')
    }
}
export const getZzzWeaponsFromRise = async () => {
    try {
        const res = await $host.get('zzz/weaponrise?limit=500')
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const getZzzWeaponFromRiseById = async (id) => {
    try {
        const res = await $host.get('zzz/weaponrise/' + id)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const updateZzzWeaponFromRise = async (data) => {
    try {
        const res = await $host.put('zzz/weaponrise', data)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const removeZzzWeaponFromCol = async (id) => {
    try {
        const res = await $host.delete('zzz/weaponcollection/' + id)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const removeZzzWeaponFromRise = async (id) => {
    try {
        const res = await $host.delete('zzz/weaponrise/' + id)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const updateZzzWeaponInfo = async (data) => {
    try {
        const res = await $host.put('zzz/weapons/update', data)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
