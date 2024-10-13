import { $authHost, $host } from ".";

export const getStandartRolls = async (query) => {
    try {
        const res = await $host.get('genshin/rolls/standart?limit=10&' + query)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const getAllStandartRolls = async (query) => {
    try {
        const res = await $host.get('genshin/rolls/standart?limit=1000&' + query)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const createRoll = async (data, bannerType) => {
    try {
        const res = await $authHost.post('genshin/rolls/' + bannerType, data)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const getEventRolls = async (query) => {
    try {
        const res = await $host.get('genshin/rolls/event?limit=10&' + query)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const getEventRollsForBanner = async (year, lmonth, lday, hmonth, hday) => {
    try {
        const res = await $host.get('genshin/rolls/event/banner?limit=1000&year=' + year + '&lmonth=' + lmonth + '&lday=' + lday + '&hmonth=' + hmonth + '&hday=' + hday)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const getAllEventRolls = async (query) => {
    try {
        const res = await $host.get('genshin/rolls/event?limit=1000&' + query)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const getWeaponRolls = async (query) => {
    try {
        const res = await $host.get('genshin/rolls/weapon?limit=10&' + query)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const getAllWeaponRolls = async (query) => {
    try {
        const res = await $host.get('genshin/rolls/weapon?limit=1000&' + query)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const getStandartStatistic = async () => {
    try {
        const res = await $host.get('genshin/rolls/standart/stat')
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const getEventStatistic = async () => {
    try {
        const res = await $host.get('genshin/rolls/event/stat')
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const getWeaponStatistic = async () => {
    try {
        const res = await $host.get('genshin/rolls/weapon/stat')
        return res
    }
    catch (e) {
        console.log(e)
    }
}