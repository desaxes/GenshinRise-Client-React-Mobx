import { $authHost, $host } from ".";

export const createBossMaterial = async (formdata) => {
    const res = await $authHost.post('lvlup/bmat', formdata)
    return res
}
export const getBossMaterials = async () => {
    const res = await $host.get('lvlup/bmat')
    return res
}
export const getBossMaterialById = async (id) => {
    const res = await $host.get('lvlup/bmat/' + id)
    return res
}
export const createStone = async (formData) => {
    try {
        const res = await $authHost.post('lvlup/stone', formData)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const getStones = async () => {
    const res = await $host.get('lvlup/stone')
    return res
}
export const getStoneById = async (id) => {
    const res = await $host.get('lvlup/stone/' + id)
    return res
}
export const createEnemyMaterials = async (formdata) => {
    const res = await $authHost.post('lvlup/emat', formdata)
    return res
}
export const getEnemyMaterials = async () => {
    const res = await $host.get('lvlup/emat')
    return res
}
export const getEnemyMaterialById = async (id) => {
    const res = await $host.get('lvlup/emat/' + id)
    return res
}
export const createLocalSpecialtys = async (formdata) => {
    const res = await $authHost.post('lvlup/ls', formdata)
    return res
}
export const getLocalSpecialtys = async () => {
    const res = await $host.get('lvlup/ls')
    return res
}
export const getLocalSpecialtyById = async (id) => {
    const res = await $host.get('lvlup/ls/' + id)
    return res
}
export const createTalents = async (formdata) => {
    const res = await $authHost.post('talent/book', formdata)
    return res
}
export const getTalents = async () => {
    const res = await $host.get('talent/book')
    return res
}
export const getTalentById = async (id) => {
    const res = await $host.get('talent/book/' + id)
    return res
}
export const createWBMaterials = async (formdata) => {
    const res = await $authHost.post('talent/wbmat', formdata)
    return res
}
export const getWBMaterials = async () => {
    const res = await $host.get('talent/wbmat')
    return res
}
export const getWBMaterialById = async (id) => {
    const res = await $host.get('talent/wbmat/' + id)
    return res
}


export const getTimers = async () => {
    const res = await $host.get('lvlup/timers')
    return res
}
export const createTimer = async (id) => {
    const res = await $authHost.post('lvlup/timers', {id})
    return res
}
export const deleteTimer = async (id) => {
    const res = await $authHost.delete('lvlup/timers/' + id)
    return res
}



export const createDevice = async (formData) => {
    const res = await $authHost.post('characters', formData)
    return res
}
export const getDevices = async (page, limit, brandId, typeId, name) => {
    const res = await $host.get('api/device?page=' + page + '&limit=' + limit + '&brandId=' + brandId + '&typeId=' + typeId + '&name=' + name)
    return res
}
export const getDeviceById = async (id) => {
    const res = await $host.get('api/device/' + id)
    return res
}
export const addDeviceToBasket = async (basketId, deviceId) => {
    try {
        const res = await $host.post('api/basket', { basketId, deviceId })
        return res
    }
    catch (e) {
        return e.message
    }
}
export const getBasketById = async (userId) => {
    try {
        const res = await $host.get('api/basket?userId=' + userId)
        return res
    }
    catch (e) {
        return e.message
    }
}
export const checkDevice = async (basketId, deviceId) => {
    try {
        const res = await $host.get('api/basket/check?basketId=' + basketId + '&deviceId=' + deviceId)
        return res
    }
    catch (e) {
        return e.message
    }
}
export const removeDevice = async (basketId, deviceId) => {
    try {
        const res = await $host.delete('api/basket/drop?basketId=' + basketId + '&deviceId=' + deviceId)
        return res
    }
    catch (e) {
        return e.message
    }
}
export const getDevicesFromBasket = async (basketId) => {
    try {
        const res = await $host.get('api/basket/devices?basketId=' + basketId)
        return res
    }
    catch (e) {
        return e.message
    }
}