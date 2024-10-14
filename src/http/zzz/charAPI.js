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
export const addZzzCharToCol = async (data) => {
    try {
        const res = await $authHost.post('zzz/collection', data)
        return res
    }
    catch (e) {
        console.log('character already exists')
    }
}
export const getZzzCharsFromCol = async () => {
    try {
        const res = await $host.get('zzz/collection?limit=100')
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const getZzzCharFromColById = async (id) => {
    try {
        const res = await $host.get('zzz/collection/' + id)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const addZzzCharToRise = async (data) => {
    try {
        const res = await $authHost.post('zzz/rise', data)
        return res
    }
    catch (e) {
        console.log('character already exists')
    }
}

export const getZzzCharsFromRise = async () => {
    try {
        const res = await $host.get('zzz/rise?limit=100')
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const getZzzCharFromRiseById = async (id) => {
    try {
        const res = await $host.get('zzz/rise/' + id)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const updateZzzCharFromRise = async (data) => {
    try {
        const res = await $host.put('zzz/rise', data)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const removeZzzCharFromCol = async (id) => {
    try {
        const res = await $host.delete('zzz/collection/' + id)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const removeZzzCharFromRise = async (id) => {
    try {
        const res = await $host.delete('zzz/rise/' + id)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const getZzzCharStatistic = async () => {
    try {
        const res = await $host.get('zzz/stat/chars/')
        return res
    }
    catch (e) {
        console.log(e)
    }
}
