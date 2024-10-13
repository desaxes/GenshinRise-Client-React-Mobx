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
export const addWeaponToCol = async (data) => {
    try {
        const res = await $authHost.post('genshin/weaponcollection', data)
        return res
    }
    catch (e) {
        console.log('character already exists')
    }
}
export const getWeaponsFromCol = async () => {
    try {
        const res = await $host.get('genshin/weaponcollection?limit=500')
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const getWeaponFromColById = async (id) => {
    try {
        const res = await $host.get('genshin/weaponcollection/' + id)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const addWeaponToRise = async (data) => {
    try {
        const res = await $authHost.post('genshin/weaponrise', data)
        return res
    }
    catch (e) {
        console.log('weapon already exists')
    }
}
export const addMaxValuesForWeapon = async (data) => {
    try {
        const res = await $authHost.post('genshin/weaponrise/max', data)
        return res
    }
    catch (e) {
        console.log('weapon already exists')
    }
}
export const getMaxValuesForWeapon = async () => {
    try {
        const res = await $host.get('genshin/weaponrise/max')
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const getWeaponsFromRise = async () => {
    try {
        const res = await $host.get('genshin/weaponrise?limit=500')
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const getWeaponFromRiseById = async (id) => {
    try {
        const res = await $host.get('genshin/weaponrise/' + id)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const updateWeaponFromRise = async (data) => {
    try {
        const res = await $host.put('genshin/weaponrise', data)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const removeWeaponFromCol = async (id) => {
    try {
        const res = await $host.delete('genshin/weaponcollection/' + id)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const removeWeaponFromRise = async (id) => {
    try {
        const res = await $host.delete('genshin/weaponrise/' + id)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const removeMaxValuesForWeapon = async (id) => {
    try {
        const res = await $host.delete('genshin/weaponrise/max/' + id)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
