import CardInformations from "./CardInformations";
import UpdateProfile from "./UpdateProfile";
const listItems = [
  {
    id: 1,
    title: "Informations personnels",
    fields: [
      { name: "nom" },
      { name: "prenom", label: "Prénom" },
      { name: "email" },
      { name: "phoneNumber", label: "tel" },
      { name: "dateNaissance", label: "date de naissance" },
      { name: "lieuNaissance", label: "lieu de naissance" },
      { name: "sexe" },
      { name: "etatCivil", label: "état civil" },
      { name: "nombreEnfants", label: "nombre d'enfant" },
      { name: "cin" },
    ],
    render: (title, data, fields) => (
      <CardInformations data={data} title={title} fields={fields} />
    ),
  },
  {
    id: 2,
    title: "Informations professionels",
    fields: [
      { name: "doti" },
      { name: "post" },
      { name: "grade" },
      { name: "echlon", label: "échelon" },
    ],
    render: (title, data, fields) => (
      <CardInformations data={data} title={title} fields={fields} />
    ),
  },
  {
    id: 3,
    title: "Modifier le profil",
    item: <UpdateProfile />,
  },
];

export default listItems;
