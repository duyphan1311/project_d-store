import axiosClient from "./axiosClient"

const ProductAPI = {

    getAPI: () => {
        const url = '/product'
        return axiosClient.get(url)
    },

    getCategory: (query) => {
        const url = `/product/category${query}`
        return axiosClient.get(url)
    },

    getDetail: (id) => {
        const url = `/product/${id}`
        return axiosClient.get(url)
    },

    getPagination: (query) => {
        const url = `/product/pagination${query}`
        return axiosClient.get(url)
    }

}

export default ProductAPI