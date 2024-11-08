import { $authHost, $host } from "../";

export const getHonkaiGems = async () => {
    try {
        const res = await $host.get('honkai/gems/')
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const getAllHonkaiGems = async () => {
    try {
        const res = await $host.get('honkai/gems/all')
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const setHonkaiGems = async (data) => {
    try {
        const res = await $authHost.post('honkai/gems/', data)
        return res
    }
    catch (e) {
        console.log(e)
    }
}