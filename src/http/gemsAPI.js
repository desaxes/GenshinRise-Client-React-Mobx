import { $authHost, $host } from ".";

export const getGenshinGems = async () => {
    try {
        const res = await $host.get('genshin/gems')
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const setGenshinGems = async (data) => {
    try {
        const res = await $authHost.post('genshin/gems', data)
        return res
    }
    catch (e) {
        console.log(e)
    }
}