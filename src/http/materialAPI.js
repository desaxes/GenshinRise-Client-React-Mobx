import { $authHost, $host } from ".";

export const createBossMaterial = async (formdata) => {
    try {
        const res = await $authHost.post('genshin/lvlup/bmat', formdata)
        return res
    }
    catch (e) { console.log(e) }
}
export const getBossMaterials = async () => {
    try {
        const res = await $host.get('genshin/lvlup/bmat')
        return res
    }
    catch (e) { console.log(e) }
}
export const getBossMaterialById = async (id) => {
    try {
        const res = await $host.get('genshin/lvlup/bmat/' + id)
        return res
    }
    catch (e) { console.log(e) }
}
export const createStone = async (formData) => {
    try {
        const res = await $authHost.post('genshin/lvlup/stone', formData)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const getStones = async () => {
    try {
        const res = await $host.get('genshin/lvlup/stone')
        return res
    }
    catch (e) { console.log(e) }
}
export const getStoneById = async (id) => {
    try {
        const res = await $host.get('genshin/lvlup/stone/' + id)
        return res
    }
    catch (e) { console.log(e) }
}
export const createEnemyMaterials = async (formdata) => {
    try {
        const res = await $authHost.post('genshin/lvlup/emat', formdata)
        return res
    }
    catch (e) { console.log(e) }
}
export const getEnemyMaterials = async () => {
    try {
        const res = await $host.get('genshin/lvlup/emat')
        return res
    }
    catch (e) { console.log(e) }
}
export const getEnemyMaterialById = async (id) => {
    try {
        const res = await $host.get('genshin/lvlup/emat/' + id)
        return res
    }
    catch (e) { console.log(e) }
}
export const createLocalSpecialtys = async (formdata) => {
    try {
        const res = await $authHost.post('genshin/lvlup/ls', formdata)
        return res
    }
    catch (e) { console.log(e) }
}
export const getLocalSpecialtys = async () => {
    try {
        const res = await $host.get('genshin/lvlup/ls')
        return res
    }
    catch (e) { console.log(e) }
}
export const getLocalSpecialtyById = async (id) => {
    try {
        const res = await $host.get('genshin/lvlup/ls/' + id)
        return res
    }
    catch (e) { console.log(e) }
}
export const createTalents = async (formdata) => {
    try {
        const res = await $authHost.post('genshin/talent/book', formdata)
        return res
    }
    catch (e) { console.log(e) }
}
export const getTalents = async () => {
    try {
        const res = await $host.get('genshin/talent/book')
        return res
    }
    catch (e) { console.log(e) }
}
export const getTalentById = async (id) => {
    try {
        const res = await $host.get('genshin/talent/book/' + id)
        return res
    }
    catch (e) { console.log(e) }
}
export const createWBMaterials = async (formdata) => {
    try {
        const res = await $authHost.post('genshin/talent/wbmat', formdata)
        return res
    }
    catch (e) { console.log(e) }
}
export const getWBMaterials = async () => {
    try {
        const res = await $host.get('genshin/talent/wbmat')
        return res
    }
    catch (e) { console.log(e) }
}
export const getWBMaterialById = async (id) => {
    try {
        const res = await $host.get('genshin/talent/wbmat/' + id)
        return res
    }
    catch (e) { console.log(e) }
}


export const getTimers = async () => {
    try {
        const res = await $host.get('genshin/lvlup/timers')
        return res
    }
    catch (e) { console.log(e) }
}
export const createTimer = async (id) => {
    try {
        const res = await $authHost.post('genshin/lvlup/timers', { id })
        return res
    }
    catch (e) { console.log(e) }
}
export const deleteTimer = async (id) => {
    try {
        const res = await $authHost.delete('genshin/lvlup/timers/' + id)
        return res
    }
    catch (e) { console.log(e) }
}