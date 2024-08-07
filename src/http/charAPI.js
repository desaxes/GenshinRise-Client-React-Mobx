import { $authHost, $host } from ".";

export const createChar = async (formdata) => {
    try {
        const res = await $authHost.post('characters', formdata)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const getChars = async (query) => {
    try {
        const res = await $host.get('characters?limit=100&' + query)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const getCharById = async (id) => {
    try {
        const res = await $host.get('characters/' + id)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const addCharToCol = async (data) => {
    try {
        const res = await $authHost.post('collection', data)
        return res
    }
    catch (e) {
        console.log('character already exists')
    }
}
export const getCharsFromCol = async () => {
    try {
        const res = await $host.get('collection?limit=100')
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const getCharFromColById = async (id) => {
    try {
        const res = await $host.get('collection/' + id)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const addCharToRise = async (data) => {
    try {
        const res = await $authHost.post('rise', data)
        return res
    }
    catch (e) {
        console.log('character already exists')
    }
}
export const addMaxValues = async (data) => {
    try {
        const res = await $authHost.post('rise/max', data)
        return res
    }
    catch (e) {
        console.log('character already exists')
    }
}
export const getMaxValues = async () => {
    try {
        const res = await $host.get('rise/max')
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const getCharsFromRise = async () => {
    try {
        const res = await $host.get('rise?limit=100')
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const getCharFromRiseById = async (id) => {
    try {
        const res = await $host.get('rise/' + id)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const updateCharFromRise = async (data) => {
    try {
        const res = await $host.put('rise', data)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const removeCharFromCol = async (id) => {
    try {
        const res = await $host.delete('collection/' + id)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const removeCharFromRise = async (id) => {
    try {
        const res = await $host.delete('rise/' + id)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const removeMaxValues = async (id) => {
    try {
        const res = await $host.delete('rise/max/' + id)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const getCharStatistic = async () => {
    try {
        const res = await $host.get('stat/chars/')
        return res
    }
    catch (e) {
        console.log(e)
    }
}
