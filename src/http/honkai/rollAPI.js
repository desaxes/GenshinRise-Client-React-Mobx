import { $authHost, $host } from "../";

export const getHonkaiStandartRolls = async (query) => {
    try {
        const res = await $host.get('honkai/rolls/standart?limit=10&' + query)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const getHonkaiAllStandartRolls = async (query) => {
    try {
        const res = await $host.get('honkai/rolls/standart?limit=1000&' + query)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const createHonkaiRoll = async (data, bannerType) => {
    try {
        const res = await $authHost.post('honkai/rolls/' + bannerType, data)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const getHonkaiEventRolls = async (query) => {
    try {
        const res = await $host.get('honkai/rolls/event?limit=10&' + query)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const getHonkaiEventRollsForBanner = async (year, lmonth, lday, hmonth, hday) => {
    try {
        const res = await $host.get('honkai/rolls/event/banner?limit=1000&year=' + year + '&lmonth=' + lmonth + '&lday=' + lday + '&hmonth=' + hmonth + '&hday=' + hday)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const getHonkaiAllEventRolls = async (query) => {
    try {
        const res = await $host.get('honkai/rolls/event?limit=1000&' + query)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const getHonkaiWeaponRolls = async (query) => {
    try {
        const res = await $host.get('honkai/rolls/weapon?limit=10&' + query)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const getHonkaiAllWeaponRolls = async (query) => {
    try {
        const res = await $host.get('honkai/rolls/weapon?limit=1000&' + query)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const getHonkaiStandartStatistic = async () => {
    try {
        const res = await $host.get('honkai/rolls/standart/stat')
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const getHonkaiEventStatistic = async () => {
    try {
        const res = await $host.get('honkai/rolls/event/stat')
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const getHonkaiWeaponStatistic = async () => {
    try {
        const res = await $host.get('honkai/rolls/weapon/stat')
        return res
    }
    catch (e) {
        console.log(e)
    }
}