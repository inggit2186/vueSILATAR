import axios from 'axios'

const getBaseUrl = () => (import.meta.env.VITE_APP_API_URL || '').replace(/\/+$/, '')

const buildEndpoint = (endpointPath = '') => {
  const cleanedPath = `/${String(endpointPath).replace(/^\/+/, '')}`
  return `${getBaseUrl()}${cleanedPath}`
}

const unwrapRows = (response) => {
  return response?.data?.data ?? response?.data ?? []
}

const madrasahService = {
  async list(endpointPath) {
    const response = await axios.get(buildEndpoint(endpointPath))
    return unwrapRows(response)
  },
  async getPegawaiByDeptId(deptId) {
    const response = await axios.get(buildEndpoint(`/getPegawai/${deptId}`))
    return unwrapRows(response)
  },
  async create(endpointPath, payload) {
    return axios.post(buildEndpoint(endpointPath), payload)
  },
  async update(endpointPath, id, payload) {
    return axios.put(`${buildEndpoint(endpointPath)}/${id}`, payload)
  },
  async remove(endpointPath, id) {
    return axios.delete(`${buildEndpoint(endpointPath)}/${id}`)
  }
}

export default madrasahService
