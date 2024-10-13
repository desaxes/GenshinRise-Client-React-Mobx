import { $authHost, $host } from "../";


export const createZzzWeaponMaterial = async (formdata) => {
    try {
        const res = await $authHost.post('zzz/weaponlvlup/wmat', formdata)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const getZzzWeaponMaterials = async () => {
    try {
        const res = await $host.get('zzz/weaponlvlup/wmat')
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const getZzzWeaponMaterialById = async (id) => {
    try {
        const res = await $host.get('zzz/weaponlvlup/wmat/' + id)
        return res
    }
    catch (e) {
        console.log(e)
    }
}