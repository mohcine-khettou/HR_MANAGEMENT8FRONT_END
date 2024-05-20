import customFetch from "../utils/customFetch"
import { addUserToLocalStorage } from "../utils/localStorage.js"
import { jwtDecode } from "jwt-decode";
import { getUserByEmail } from "./users.js";

export const login = async(email , password)=>{
    try {
        const {data} = await customFetch.post('/login', {
            email , password
        })
        const userData =await getUserByEmail(jwtDecode(data.accessToken).sub)
        if(userData.user){
           const user = {token : data.accessToken , ...userData  }
            addUserToLocalStorage(user)
            return {user} ;  
        }
        return {error : userData.error}
        
    } catch (error) {
        console.log(error);
        return { error }
    }
}



