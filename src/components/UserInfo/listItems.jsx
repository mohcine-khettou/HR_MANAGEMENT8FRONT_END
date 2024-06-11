import CardInformations from "./CardInformations";
import InfoProfessionnelles from "./InfoProfessionnelles";
import UpdateProfile from "./UpdateProfile";
const listItems = [
  {
    id: 1,
    title: "Informations personnelles",
    fields: [
      { name: "nom" },
      { name: "prenom", label: "Prénom" },
      { name: "email" },
      { name: "phoneNumber", label: "tel" },
      { name: "dateNaissance", label: "date de naissance" },
      { name: "lieuNaissance", label: "lieu de naissance" },
      { name: "sexe" },
      { name: "etatCivil", label: "Situation matrimoniale" },
      { name: "nombreEnfants", label: "nombre d'enfant" },
      { name: "cin", label: "CIN" },
    ],
    render: (title, data, fields) => (
      <CardInformations data={data} title={title} fields={fields} />
    ),
  },
  {
    id: 2,
    title: "Informations professionelles",
    fields: [
      { name: "post" },
      { name: "grade" },
      { name: "echlon", label: "échelon" },
      { name: "departement", label: "département" },
    ],
    render: (title, data, fields) => (
      <InfoProfessionnelles data={data} title={title} fields={fields} />
    ),
  },
  {
    id: 3,
    title: "Modifier le profil",
    item: <UpdateProfile />,
  },
];

export default listItems;
