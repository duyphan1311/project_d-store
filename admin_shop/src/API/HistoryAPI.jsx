import axiosClient from './axiosClient'

const HistoryAPI = {

    getHistoryAPI: (query) => {
        const url = `/history${query}`
        return axiosClient.get(url)
    },

    getDetail: (id) => {
        const url = `/history/${id}`
        return axiosClient.get(url)
    },

    getAll: () => {
        const url = '/history/all'
        return axiosClient.get(url)
    },
    updateHistory: (id, data) => {
        const url = `/history/${id}`
        return axiosClient.put(url, data)
    }

}

export default HistoryAPI