import axios from "axios";
import {
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from "./localStorage";

const customFetch = axios.create({ baseURL: "http://localhost:8080" });

customFetch.interceptors.request.use((config) => {
  const user = getUserFromLocalStorage();
  if (user) {
    config.headers["Authorization"] = `Bearer ${user.accessToken}`;
  }
  return config;
});

let logoutFn = null;

export const setLogoutFunction = (logout) => {
  logoutFn = logout;
};

customFetch.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (logoutFn) {
        logoutFn(); // Call the logout function
      }
    }
    return Promise.reject(error);
  }
);
export const checkForUnauthenticatedError = async (error, fn) => {
  if (error.response.status === 401) {
    removeUserFromLocalStorage();
    fn();
  }
};

export default customFetch;
