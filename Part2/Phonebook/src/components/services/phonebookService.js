import axios from 'axios'
const baseURL = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseURL)
    return request.then(response => response.data)
}

const getOne = (id) => {
    const  request = axios.get(baseURL.concat(`/${id}`))
    return request.then(response => response.data)
}

const Create = object => {
    const request = axios.post(baseURL, object)
    return request.then(request => request.data)
}

const Edit = (id, newData) => {
    const request = axios.patch(baseURL.concat(`/${id}`), newData)
    return request.then(response => response.data)
}
const Delete = id => {
    const request = axios.delete(baseURL.concat(`/${id}`))
    return request.then(request => request.status)
}

export default { getAll, getOne, Create, Delete, Edit }