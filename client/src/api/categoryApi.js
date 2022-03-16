import axiosClient from './axiosClient'

const categoryEndpoint = 'category'

const categoryApi = {
    getAll: () => axiosClient.get(categoryEndpoint),
    create: (params) => axiosClient.post(categoryEndpoint, params),
    getOne: (id) => axiosClient.get(`${categoryEndpoint}/${id}`),
    update: (id, params) => axiosClient.put(`${categoryEndpoint}/${id}`, params),
    vaccinated: (params) => axiosClient.post(`${categoryEndpoint}/vaccinated`, params)
}

export default categoryApi