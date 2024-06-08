import customFetch from "../utils/customFetch"

export const login = async(email , password)=>{
    try {
        const {data : {accessToken}} = await customFetch.post('/api/v1/auth/login', {
            email , password
        })
        return {data : accessToken , error : null}
    } catch (error) {
        console.log(error);
        return { error , data : null}
    }
}



