const getTitleFromPath = (path) => {
  if (path === "/") return "Mon Profil";
  if (path === "/demandesRH") return "Demandes de modification du profil";
  if (path === "/demandesRH2") return "Demandes des documents";
  if (path === "/profs") return "Liste des professeurs";
  if (path === "/charts") return "Accueil";
  if (path === "/historiques-professeurs") return "Historique des professeurs";
};

export default getTitleFromPath;
