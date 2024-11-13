import { $authHost, $host } from "../";

export const getHonkaiArts = async () => {
    try {
        const res = await $host.get('honkai/arts')
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const getHonkaiArtById = async (id) => {
    try {
        const res = await $host.get('honkai/arts/' + id)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const createHonkaiArt = async (formdata) => {
    try {
        const res = await $authHost.post('honkai/arts', formdata)
        return res
    }
    catch (e) {
        console.log(e)
    }
}