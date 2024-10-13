import { $authHost, $host } from ".";

export const createEnemyWeaponMaterial = async (formData) => {
    try {
        const res = await $authHost.post('genshin/weaponlvlup/ewmat', formData)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const getEnemyWeaponMaterials = async () => {
    try {
        const res = await $host.get('genshin/weaponlvlup/ewmat')
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const getEnemyWeaponMaterialById = async (id) => {
    try {
        const res = await $host.get('genshin/weaponlvlup/ewmat/' + id)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const createWeaponMaterial = async (formdata) => {
    try {
        const res = await $authHost.post('genshin/weaponlvlup/wmat', formdata)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const getWeaponMaterials = async () => {
    try {
        const res = await $host.get('genshin/weaponlvlup/wmat')
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const getWeaponMaterialById = async (id) => {
    try {
        const res = await $host.get('genshin/weaponlvlup/wmat/' + id)
        return res
    }
    catch (e) {
        console.log(e)
    }
}