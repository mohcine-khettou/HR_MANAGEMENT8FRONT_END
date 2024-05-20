import customFetch from "../utils/customFetch";

export const getUserByEmail = async(email)=>{
    try {
        const {data} = await customFetch.get('/api/v1/employes/findByEmail/'+ email); 
        console.log('====================================');
        console.log(data);
        console.log('====================================');
        return {user : data}
    } catch (error) {
        return {error}
    }
}