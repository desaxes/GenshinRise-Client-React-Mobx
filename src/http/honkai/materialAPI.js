import { $authHost, $host } from "../";

export const createHonkaiBossMaterial = async (formdata) => {
    try {
        const res = await $authHost.post('honkai/lvlup/bmat', formdata)
        return res
    }
    catch (e) { console.log(e) }
}
export const getHonkaiBossMaterials = async () => {
    try {
        const res = await $host.get('honkai/lvlup/bmat')
        return res
    }
    catch (e) { console.log(e) }
}
export const getHonkaiBossMaterialById = async (id) => {
    try {
        const res = await $host.get('honkai/lvlup/bmat/' + id)
        return res
    }
    catch (e) { console.log(e) }
}
export const createHonkaiEnemyMaterials = async (formdata) => {
    try {
        const res = await $authHost.post('honkai/lvlup/emat', formdata)
        return res
    }
    catch (e) { console.log(e) }
}
export const getHonkaiEnemyMaterials = async () => {
    try {
        const res = await $host.get('honkai/lvlup/emat')
        return res
    }
    catch (e) { console.log(e) }
}
export const getHonkaiEnemyMaterialById = async (id) => {
    try {
        const res = await $host.get('honkai/lvlup/emat/' + id)
        return res
    }
    catch (e) { console.log(e) }
}

export const createHonkaiTalents = async (formdata) => {
    try {
        const res = await $authHost.post('honkai/talent/book', formdata)
        return res
    }
    catch (e) { console.log(e) }
}
export const getHonkaiTalents = async () => {
    try {
        const res = await $host.get('honkai/talent/book')
        return res
    }
    catch (e) { console.log(e) }
}
export const getHonkaiTalentById = async (id) => {
    try {
        const res = await $host.get('honkai/talent/book/' + id)
        return res
    }
    catch (e) { console.log(e) }
}
export const createHonkaiWBMaterials = async (formdata) => {
    try {
        const res = await $authHost.post('honkai/talent/wbmat', formdata)
        return res
    }
    catch (e) { console.log(e) }
}
export const getHonkaiWBMaterials = async () => {
    try {
        const res = await $host.get('honkai/talent/wbmat')
        return res
    }
    catch (e) { console.log(e) }
}
export const getHonkaiWBMaterialById = async (id) => {
    try {
        const res = await $host.get('honkai/talent/wbmat/' + id)
        return res
    }
    catch (e) { console.log(e) }
}