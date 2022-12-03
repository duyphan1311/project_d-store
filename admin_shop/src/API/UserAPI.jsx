import axiosClient from './axiosClient'

const UserAPI = {

    getAllData: () => {
        const url = '/user'
        return axiosClient.get(url)
    },

    getDetailData: (id) => {
        const url = `/user/${id}`
        return axiosClient.get(url)
    },

    postSignUp: (query) => {
        const url = `/user/signup/${query}`
        return axiosClient.post(url)
    },

    updateUser: (id, data) => {
        const url = `/user/${id}`
        return axiosClient.put(url, data)
    },

    deleteUser: (id) => {
        const url = `/user/${id}`
        return axiosClient.delete(url)
    }
}

export default UserAPI