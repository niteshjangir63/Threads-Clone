import API from "./axios";

export const search = (value) =>{

    return API.get(`/search?q=${value}`)

}