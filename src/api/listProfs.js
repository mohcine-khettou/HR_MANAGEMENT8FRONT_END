import customFetch from "../utils/customFetch";


export const fetchEmployees = async () => {
    try {
        const response = await customFetch.get('/api/v1/employes');
        return response.data;
    } catch (error) {
        console.error('Error fetching employees', error);
        throw error;
    }
};
