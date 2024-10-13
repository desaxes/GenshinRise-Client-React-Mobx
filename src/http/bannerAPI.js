import { $authHost, $host } from ".";

export const getBanners = async (query) => {
    try {
        const res = await $host.get('genshin/banners?limit=1000&' + query)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const getBanner = async (id) => {
    try {
        const res = await $host.get('genshin/banners/' + id)
        return res
    }
    catch (e) {
        console.log(e)
    }
}

export const addBanner = async (formdata) => {
    try {
        const res = await $authHost.post('genshin/banners', formdata)
        return res
    }
    catch (e) {
        console.log(e)
    }
}