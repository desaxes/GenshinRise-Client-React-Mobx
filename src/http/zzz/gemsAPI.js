import { $authHost, $host } from "../";

export const getZzzGems = async () => {
    try {
        const res = await $host.get('zzz/gems/')
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const setZzzGems = async (data) => {
    try {
        const res = await $authHost.post('zzz/gems/', data)
        return res
    }
    catch (e) {
        console.log(e)
    }
}