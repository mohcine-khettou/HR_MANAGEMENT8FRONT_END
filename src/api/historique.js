import customFetch from "../utils/customFetch";


export const getAllHistorique = async () => {
  try {
    const { data } = await customFetch.get("/api/v1/historique");
    return { data, error: null };
  } catch (error) {
    console.error("Erreur lors de la récupération de tous les historiques:", error);
    return { error, data: null };
  }
};


export const getHistoriqueByDoti = async (doti) => {
  try {
    const { data } = await customFetch.get(`/api/v1/historique/${doti}`);
    return { data, error: null };
  } catch (error) {
    console.error(`Erreur lors de la récupération de l'historique pour doti: ${doti}`, error);
    return { error, data: null };
  }
};
