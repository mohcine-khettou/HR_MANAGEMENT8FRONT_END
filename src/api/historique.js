import customFetch from "../utils/customFetch";

export const getAllHistorique = async () => {
  try {
    const { data } = await customFetch.get("/api/v1/historique");
    console.log(data);

    return { data, error: null };
  } catch (error) {
    console.error(
      "Erreur lors de la récupération de tous les historiques:",
      error
    );
    return { error, data: null };
  }
};

export const getHistoriqueByDoti = async (doti) => {
  try {
    const { data } = await customFetch.get(`/api/v1/historique/${doti}`);
    return { data, error: null };
  } catch (error) {
    console.error(
      `Erreur lors de la récupération de l'historique pour doti: ${doti}`,
      error
    );
    return { error, data: null };
  }
};

export const getAllSituations = async () => {
  try {
    const { data } = await customFetch.get("/api/v1/employes/situations/2024");
    console.log("Données récupérées :", data);
    return { data, error: null };
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des situations des employés:",
      error
    );
    return { error, data: null };
  }
};

export const getSituationsForYear = async (year) => {
  try {
    const { data } = await customFetch.get(
      `/api/v1/employes/situations/${year}`
    );
    return { data, error: null };
  } catch (error) {
    console.error(
      `Erreur lors de la récupération des situations pour l'année ${year}:`,
      error
    );
    return { error, data: null };
  }
};
