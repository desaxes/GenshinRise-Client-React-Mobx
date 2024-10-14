import { $authHost, $host } from "../";

export const getZzzStandartRolls = async (query) => {
    try {
        const res = await $host.get('zzz/rolls/standart?limit=10&' + query)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const getZzzAllStandartRolls = async (query) => {
    try {
        const res = await $host.get('zzz/rolls/standart?limit=1000&' + query)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const createZzzRoll = async (data, bannerType) => {
    try {
        const res = await $authHost.post('zzz/rolls/' + bannerType, data)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const getZzzEventRolls = async (query) => {
    try {
        const res = await $host.get('zzz/rolls/event?limit=10&' + query)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const getZzzEventRollsForBanner = async (year, lmonth, lday, hmonth, hday) => {
    try {
        const res = await $host.get('zzz/rolls/event/banner?limit=1000&year=' + year + '&lmonth=' + lmonth + '&lday=' + lday + '&hmonth=' + hmonth + '&hday=' + hday)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const getZzzAllEventRolls = async (query) => {
    try {
        const res = await $host.get('zzz/rolls/event?limit=1000&' + query)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const getZzzWeaponRolls = async (query) => {
    try {
        const res = await $host.get('zzz/rolls/weapon?limit=10&' + query)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const getZzzAllWeaponRolls = async (query) => {
    try {
        const res = await $host.get('zzz/rolls/weapon?limit=1000&' + query)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const getZzzStandartStatistic = async () => {
    try {
        const res = await $host.get('zzz/rolls/standart/stat')
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const getZzzEventStatistic = async () => {
    try {
        const res = await $host.get('zzz/rolls/event/stat')
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const getZzzWeaponStatistic = async () => {
    try {
        const res = await $host.get('zzz/rolls/weapon/stat')
        return res
    }
    catch (e) {
        console.log(e)
    }
}