
import axios from "axios";
import { getUserFromLocalStorage, removeUserFromLocalStorage } from "./localStorage";




const customFetch = axios.create({baseURL : 'http://localhost:8080'})



customFetch.interceptors.request.use((config) => {
  const user = getUserFromLocalStorage();
  if (user) {
    config.headers['Authorization'] = `Bearer ${user.token}`;
  }
  return config;
});


export const checkForUnauthenticatedError = async (error, fn) => {
    if (error.response.status === 401) {
        removeUserFromLocalStorage()
        fn();
    }

}


export default customFetch