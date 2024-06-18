import { $authHost, $host } from ".";

export const createBossMaterial = async (formdata) => {
    try {
        const res = await $authHost.post('lvlup/bmat', formdata)
        return res
    }
    catch (e) { console.log(e) }
}
export const getBossMaterials = async () => {
    try {
        const res = await $host.get('lvlup/bmat')
        return res
    }
    catch (e) { console.log(e) }
}
export const getBossMaterialById = async (id) => {
    try {
        const res = await $host.get('lvlup/bmat/' + id)
        return res
    }
    catch (e) { console.log(e) }
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
    try {
        const res = await $host.get('lvlup/stone')
        return res
    }
    catch (e) { console.log(e) }
}
export const getStoneById = async (id) => {
    try {
        const res = await $host.get('lvlup/stone/' + id)
        return res
    }
    catch (e) { console.log(e) }
}
export const createEnemyMaterials = async (formdata) => {
    try {
        const res = await $authHost.post('lvlup/emat', formdata)
        return res
    }
    catch (e) { console.log(e) }
}
export const getEnemyMaterials = async () => {
    try {
        const res = await $host.get('lvlup/emat')
        return res
    }
    catch (e) { console.log(e) }
}
export const getEnemyMaterialById = async (id) => {
    try {
        const res = await $host.get('lvlup/emat/' + id)
        return res
    }
    catch (e) { console.log(e) }
}
export const createLocalSpecialtys = async (formdata) => {
    try {
        const res = await $authHost.post('lvlup/ls', formdata)
        return res
    }
    catch (e) { console.log(e) }
}
export const getLocalSpecialtys = async () => {
    try {
        const res = await $host.get('lvlup/ls')
        return res
    }
    catch (e) { console.log(e) }
}
export const getLocalSpecialtyById = async (id) => {
    try {
        const res = await $host.get('lvlup/ls/' + id)
        return res
    }
    catch (e) { console.log(e) }
}
export const createTalents = async (formdata) => {
    try {
        const res = await $authHost.post('talent/book', formdata)
        return res
    }
    catch (e) { console.log(e) }
}
export const getTalents = async () => {
    try {
        const res = await $host.get('talent/book')
        return res
    }
    catch (e) { console.log(e) }
}
export const getTalentById = async (id) => {
    try {
        const res = await $host.get('talent/book/' + id)
        return res
    }
    catch (e) { console.log(e) }
}
export const createWBMaterials = async (formdata) => {
    try {
        const res = await $authHost.post('talent/wbmat', formdata)
        return res
    }
    catch (e) { console.log(e) }
}
export const getWBMaterials = async () => {
    try {
        const res = await $host.get('talent/wbmat')
        return res
    }
    catch (e) { console.log(e) }
}
export const getWBMaterialById = async (id) => {
    try {
        const res = await $host.get('talent/wbmat/' + id)
        return res
    }
    catch (e) { console.log(e) }
}


export const getTimers = async () => {
    try {
        const res = await $host.get('lvlup/timers')
        return res
    }
    catch (e) { console.log(e) }
}
export const createTimer = async (id) => {
    try {
        const res = await $authHost.post('lvlup/timers', { id })
        return res
    }
    catch (e) { console.log(e) }
}
export const deleteTimer = async (id) => {
    try {
        const res = await $authHost.delete('lvlup/timers/' + id)
        return res
    }
    catch (e) { console.log(e) }
}