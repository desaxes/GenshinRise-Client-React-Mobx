import { $authHost, $host } from ".";

export const getStandartRolls = async (query) => {
    try {
        const res = await $host.get('rolls/standart?limit=10&' + query)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const createRoll = async (data, bannerType) => {
    try {
        const res = await $authHost.post('rolls/' + bannerType, data)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const getEventRolls = async (query) => {
    try {
        const res = await $host.get('rolls/event?limit=10&' + query)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const getWeaponRolls = async (query) => {
    try {
        const res = await $host.get('rolls/weapon?limit=10&' + query)
        return res
    }
    catch (e) {
        console.log(e)
    }
}