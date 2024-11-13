import { $authHost, $host } from "../";

export const getZzzArts = async () => {
    try {
        const res = await $host.get('zzz/arts')
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const getZzzArtById = async (id) => {
    try {
        const res = await $host.get('zzz/arts/' + id)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const createZzzArt = async (formdata) => {
    try {
        const res = await $authHost.post('zzz/arts', formdata)
        return res
    }
    catch (e) {
        console.log(e)
    }
}