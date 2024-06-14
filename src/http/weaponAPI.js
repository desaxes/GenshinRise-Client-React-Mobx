import { $authHost, $host } from ".";

export const createWeapon = async (formdata) => {
    try {
        const res = await $authHost.post('weapons', formdata)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const getWeapons = async (query) => {
    try {
        const res = await $host.get('weapons?limit=500&' + query)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const getWeaponById = async (id) => {
    try {
        const res = await $host.get('weapons/' + id)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const addWeaponToCol = async (data) => {
    try {
        const res = await $authHost.post('weaponcollection', data)
        return res
    }
    catch (e) {
        console.log('character already exists')
    }
}
export const getWeaponsFromCol = async () => {
    try {
        const res = await $host.get('weaponcollection?limit=500')
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const getWeaponFromColById = async (id) => {
    try {
        const res = await $host.get('weaponcollection/' + id)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const addWeaponToRise = async (data) => {
    try {
        const res = await $authHost.post('weaponrise', data)
        return res
    }
    catch (e) {
        console.log('weapon already exists')
    }
}
export const addMaxValuesForWeapon = async (data) => {
    try {
        const res = await $authHost.post('weaponrise/max', data)
        return res
    }
    catch (e) {
        console.log('weapon already exists')
    }
}
export const getMaxValuesForWeapon = async () => {
    try {
        const res = await $host.get('weaponrise/max')
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const getWeaponsFromRise = async () => {
    try {
        const res = await $host.get('weaponrise?limit=500')
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const getWeaponFromRiseById = async (id) => {
    try {
        const res = await $host.get('weaponrise/' + id)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const updateWeaponFromRise = async (data) => {
    try {
        const res = await $host.put('weaponrise', data)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const removeWeaponFromCol = async (id) => {
    try {
        const res = await $host.delete('weaponcollection/' + id)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const removeWeaponFromRise = async (id) => {
    try {
        const res = await $host.delete('weaponrise/' + id)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const removeMaxValuesForWeapon = async (id) => {
    try {
        const res = await $host.delete('weaponrise/max/' + id)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
