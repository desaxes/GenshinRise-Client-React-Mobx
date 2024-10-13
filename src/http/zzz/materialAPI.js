import { $authHost, $host } from "../";

export const createZzzBossMaterial = async (formdata) => {
    try {
        const res = await $authHost.post('zzz/lvlup/bmat', formdata)
        return res
    }
    catch (e) { console.log(e) }
}
export const getZzzBossMaterials = async () => {
    try {
        const res = await $host.get('zzz/lvlup/bmat')
        return res
    }
    catch (e) { console.log(e) }
}
export const getZzzBossMaterialById = async (id) => {
    try {
        const res = await $host.get('zzz/lvlup/bmat/' + id)
        return res
    }
    catch (e) { console.log(e) }
}
export const createZzzEnemyMaterials = async (formdata) => {
    try {
        const res = await $authHost.post('zzz/lvlup/emat', formdata)
        return res
    }
    catch (e) { console.log(e) }
}
export const getZzzEnemyMaterials = async () => {
    try {
        const res = await $host.get('zzz/lvlup/emat')
        return res
    }
    catch (e) { console.log(e) }
}
export const getZzzEnemyMaterialById = async (id) => {
    try {
        const res = await $host.get('zzz/lvlup/emat/' + id)
        return res
    }
    catch (e) { console.log(e) }
}

export const createZzzTalents = async (formdata) => {
    try {
        const res = await $authHost.post('zzz/talent/book', formdata)
        return res
    }
    catch (e) { console.log(e) }
}
export const getZzzTalents = async () => {
    try {
        const res = await $host.get('zzz/talent/book')
        return res
    }
    catch (e) { console.log(e) }
}
export const getZzzTalentById = async (id) => {
    try {
        const res = await $host.get('zzz/talent/book/' + id)
        return res
    }
    catch (e) { console.log(e) }
}
export const createZzzWBMaterials = async (formdata) => {
    try {
        const res = await $authHost.post('zzz/talent/wbmat', formdata)
        return res
    }
    catch (e) { console.log(e) }
}
export const getZzzWBMaterials = async () => {
    try {
        const res = await $host.get('zzz/talent/wbmat')
        return res
    }
    catch (e) { console.log(e) }
}
export const getZzzWBMaterialById = async (id) => {
    try {
        const res = await $host.get('zzz/talent/wbmat/' + id)
        return res
    }
    catch (e) { console.log(e) }
}