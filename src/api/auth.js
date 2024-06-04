import customFetch from "../utils/customFetch"
import { addUserToLocalStorage } from "../utils/localStorage.js"
import { jwtDecode } from "jwt-decode";
import { getUserByEmail } from "./users.js";

export const login = async(email , password)=>{
    try {
        const {data : {accessToken}} = await customFetch.post('/login', {
            email , password
        })
        // const userData =await getUserByEmail(jwtDecode(data.accessToken).sub)
        // console.log("user data : ");
        // console.log(userData);
        // if(userData.user){
        //    const user = {token : data.accessToken , ...userData  }
        //     return {user} ;  
        // }
        // return {error : userData.error}
        return {data : accessToken , error : null}
    } catch (error) {
        console.log(error);
        return { error , data : null}
    }
}



