import customFetch from "../utils/customFetch"
// C:\Users\mohcine\Desktop\node-express-course-main\07-file-upload\starter\images
export const updateProfile =async (doti , {pieceJointe , typeDemmande , serverNameField , newFieldValue} )=>{
     const formData = new FormData();
    formData.append('pieceJointe', pieceJointe);
    formData.append('typeDemmande', typeDemmande);
    formData.append(serverNameField , newFieldValue);
    try {
        const {data} = await customFetch.post('/api/v1/demmandes/'+doti , formData , {
            headers : {
                "Content-Type" : 'multipart/form-data',
            }
        })
        return {data , error : null}
    } catch (error) {
        return {error , data : null}
    }

}