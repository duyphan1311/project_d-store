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
    },
    addProduct: (data) => {
        const url = `/product`
        return axiosClient.post(url, data)
    },

    deleteProduct: (id) => {
        const url = `/product/${id}`
        return axiosClient.delete(url)
    },

    updateProduct: (id, data) => {
        const url = `/product/${id}`
        return axiosClient.put(url, data)
    }

}

export default ProductAPI