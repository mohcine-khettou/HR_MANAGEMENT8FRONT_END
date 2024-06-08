import customFetch from "../utils/customFetch";

export const getUserByEmail = async(email)=>{
    try {
        const {data} = await customFetch.get('/api/v1/employes/findByEmail/'+ email); 
        data.demmandeCollection = undefined ; 
        return {data}
    } catch (error) {
        return {error}
    }
}

export const getUserGradeHistory = async(doti)=>{
    try {
        const {data} = await customFetch.get('/api/v1/historique/'+ doti); 
        return {data , error : null}
    } catch (error) {
        return {error , data : null}
    }
}