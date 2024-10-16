import { $authHost, $host } from "../";

export const getHonkaiBanners = async (query) => {
    try {
        const res = await $host.get('honkai/banners?limit=1000&' + query)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const getHonkaiBanner = async (id) => {
    try {
        const res = await $host.get('honkai/banners/' + id)
        return res
    }
    catch (e) {
        console.log(e)
    }
}

export const addHonkaiBanner = async (formdata) => {
    try {
        const res = await $authHost.post('honkai/banners', formdata)
        return res
    }
    catch (e) {
        console.log(e)
    }
}