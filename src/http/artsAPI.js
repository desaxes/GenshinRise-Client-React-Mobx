import { $authHost, $host } from ".";

export const getGenshinArts = async () => {
    try {
        const res = await $host.get('genshin/arts')
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const getGenshinArtById = async (id) => {
    try {
        const res = await $host.get('genshin/arts/' + id)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const createGenshinArt = async (formdata) => {
    try {
        const res = await $authHost.post('genshin/arts', formdata)
        return res
    }
    catch (e) {
        console.log(e)
    }
}