import { $authHost, $host } from "../";

export const createHonkaiWeapon = async (formdata) => {
    try {
        const res = await $authHost.post('honkai/weapons', formdata)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const getHonkaiWeapons = async (query) => {
    try {
        const res = await $host.get('honkai/weapons?limit=500&' + query)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const getHonkaiWeaponById = async (id) => {
    try {
        const res = await $host.get('honkai/weapons/' + id)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const addHonkaiWeaponToCol = async (data) => {
    try {
        const res = await $authHost.post('honkai/weaponcollection', data)
        return res
    }
    catch (e) {
        console.log('character already exists')
    }
}
export const getHonkaiWeaponsFromCol = async (query) => {
    try {
        const res = await $host.get('honkai/weaponcollection?limit=500&'+query)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const getHonkaiWeaponFromColById = async (id) => {
    try {
        const res = await $host.get('honkai/weaponcollection/' + id)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const addHonkaiWeaponToRise = async (data) => {
    try {
        const res = await $authHost.post('honkai/weaponrise', data)
        return res
    }
    catch (e) {
        console.log('weapon already exists')
    }
}
export const getHonkaiWeaponsFromRise = async () => {
    try {
        const res = await $host.get('honkai/weaponrise?limit=500')
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const getHonkaiWeaponFromRiseById = async (id) => {
    try {
        const res = await $host.get('honkai/weaponrise/' + id)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const updateHonkaiWeaponFromRise = async (data) => {
    try {
        const res = await $host.put('honkai/weaponrise', data)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const removeHonkaiWeaponFromCol = async (id) => {
    try {
        const res = await $host.delete('honkai/weaponcollection/' + id)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const removeHonkaiWeaponFromRise = async (id) => {
    try {
        const res = await $host.delete('honkai/weaponrise/' + id)
        return res
    }
    catch (e) {
        console.log(e)
    }
}

export const updateHonkaiWeaponInfo = async (data) => {
    try {
        const res = await $host.put('honkai/weapons/update', data)
        return res
    }
    catch (e) {
        console.log(e)
    }
}