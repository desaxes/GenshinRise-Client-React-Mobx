import { $authHost, $host } from "../";

export const createHonkaiChar = async (formdata) => {
    try {
        const res = await $authHost.post('honkai/characters', formdata)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const getHonkaiChars = async (query) => {
    try {
        const res = await $host.get('honkai/characters?limit=100&' + query)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const getHonkaiCharById = async (id) => {
    try {
        const res = await $host.get('honkai/characters/' + id)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const addHonkaiCharToCol = async (data) => {
    try {
        const res = await $authHost.post('honkai/collection', data)
        return res
    }
    catch (e) {
        console.log('character already exists')
    }
}
export const getHonkaiCharsFromCol = async () => {
    try {
        const res = await $host.get('honkai/collection?limit=100')
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const getHonkaiCharFromColById = async (id) => {
    try {
        const res = await $host.get('honkai/collection/' + id)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const addHonkaiCharToRise = async (data) => {
    try {
        const res = await $authHost.post('honkai/rise', data)
        return res
    }
    catch (e) {
        console.log('character already exists')
    }
}

export const getHonkaiCharsFromRise = async () => {
    try {
        const res = await $host.get('honkai/rise?limit=100')
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const getHonkaiCharFromRiseById = async (id) => {
    try {
        const res = await $host.get('honkai/rise/' + id)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const updateHonkaiCharFromRise = async (data) => {
    try {
        const res = await $host.put('honkai/rise', data)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const removeHonkaiCharFromCol = async (id) => {
    try {
        const res = await $host.delete('honkai/collection/' + id)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const removeHonkaiCharFromRise = async (id) => {
    try {
        const res = await $host.delete('honkai/rise/' + id)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const getHonkaiCharStatistic = async () => {
    try {
        const res = await $host.get('honkai/stat/chars/')
        return res
    }
    catch (e) {
        console.log(e)
    }
}
