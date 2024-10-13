import { $authHost, $host } from "../";

export const createZzzChar = async (formdata) => {
    try {
        const res = await $authHost.post('zzz/characters', formdata)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const getZzzChars = async (query) => {
    try {
        const res = await $host.get('zzz/characters?limit=100&' + query)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const getZzzCharById = async (id) => {
    try {
        const res = await $host.get('zzz/characters/' + id)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const addCharToCol = async (data) => {
    try {
        const res = await $authHost.post('genshin/collection', data)
        return res
    }
    catch (e) {
        console.log('character already exists')
    }
}
export const getCharsFromCol = async () => {
    try {
        const res = await $host.get('genshin/collection?limit=100')
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const getCharFromColById = async (id) => {
    try {
        const res = await $host.get('genshin/collection/' + id)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const addCharToRise = async (data) => {
    try {
        const res = await $authHost.post('genshin/rise', data)
        return res
    }
    catch (e) {
        console.log('character already exists')
    }
}
export const addMaxValues = async (data) => {
    try {
        const res = await $authHost.post('genshin/rise/max', data)
        return res
    }
    catch (e) {
        console.log('character already exists')
    }
}
export const getMaxValues = async () => {
    try {
        const res = await $host.get('genshin/rise/max')
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const getCharsFromRise = async () => {
    try {
        const res = await $host.get('genshin/rise?limit=100')
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const getCharFromRiseById = async (id) => {
    try {
        const res = await $host.get('genshin/rise/' + id)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const updateCharFromRise = async (data) => {
    try {
        const res = await $host.put('genshin/rise', data)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const removeCharFromCol = async (id) => {
    try {
        const res = await $host.delete('genshin/collection/' + id)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const removeCharFromRise = async (id) => {
    try {
        const res = await $host.delete('genshin/rise/' + id)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const removeMaxValues = async (id) => {
    try {
        const res = await $host.delete('genshin/rise/max/' + id)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const getCharStatistic = async () => {
    try {
        const res = await $host.get('genshin/stat/chars/')
        return res
    }
    catch (e) {
        console.log(e)
    }
}
