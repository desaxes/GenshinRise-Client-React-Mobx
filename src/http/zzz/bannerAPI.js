import { $authHost, $host } from "../";

export const getZzzBanners = async (query) => {
    try {
        const res = await $host.get('zzz/banners?limit=1000&' + query)
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const getZzzBanner = async (id) => {
    try {
        const res = await $host.get('zzz/banners/' + id)
        return res
    }
    catch (e) {
        console.log(e)
    }
}

export const addZzzBanner = async (formdata) => {
    try {
        const res = await $authHost.post('zzz/banners', formdata)
        return res
    }
    catch (e) {
        console.log(e)
    }
}