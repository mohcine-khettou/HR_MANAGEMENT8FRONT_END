import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import { useState } from "react";
import { updateProfile as updateProfileApi } from "../../api/demandes";
import { useUserContext } from "../../context";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
const UpdateProfile = () => {
  const [selectedField, setSelectedField] = useState({
    name: "état civil",
    code: "EtatCivil",
    serverName: "etatCivil",
  });
  const [file, setFile] = useState(null);
  const fields = [
    { name: "état civil", code: "EtatCivil", serverName: "etatCivil" },
    { name: "grade", code: "updateGrade", serverName: "grade" },
    { name: "nombre d'enfants", code: "NmbreEnfs", serverName: "NmbrEnfs" },
  ];
  const { user } = useUserContext();
  const [value, setValue] = useState(null);
  const handleFile = async (event) => {
    const file = event.target.files[0];
    setFile(file);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file && !value) {
      // error
      console.log("file");
      return;
    }
    console.log(file);
    const { error } = updateProfileApi(user.doti, {
      pieceJointe: file,
      typeDemmande: selectedField.code,
      serverNameField: selectedField.serverName,
      newFieldValue: value.code || value,
    });
    if (error) {
      // error
      return;
    }
    setValue(null);
    setFile(null);
  };
  const getInput = () => {
    const props = {
      value: value,
      className:
        "border border-[#dbe0e5] hover:border-[#04a9f5] focus:border-[#04a9f5] rounded-md transition duration-150 w-full",
      onChange: (e) => setValue(e.value),
      defaultValue: null,
    };
    if (selectedField.name === "état civil")
      return (
        <Dropdown
          options={[
            { name: "célibataire", code: "Celibataire" },
            { name: "marié(e)", code: "Marie" },
            { name: "divorcé(e)", code: "divorce" },
          ]}
          optionLabel="name"
          {...props}
        />
      );
    if (selectedField.name === "grade")
      return (
        <Dropdown
          {...props}
          options={Array.from({ length: 4 }, (_, index) => ({
            name: `grade${index + 1}`,
            code: `grade${index + 1}`,
          }))}
          optionLabel="name"
        />
      );
    return <InputNumber {...props} />;
  };
  return (
    <Card className="p-0" onClick={(e) => e.stopPropagation()}>
      <div className="border-b border-b-[#dbe0e5] px-4 pb-5 pt-3 font-medium">
        Modification du profil
      </div>
      <form
        className="flex flex-col gap-2 px-4 pt-5 items-start"
        onSubmit={handleSubmit}
      >
        <label className="mb-2">Champs à modifier</label>
        <Dropdown
          value={selectedField}
          optionLabel="name"
          className="w-full"
          options={fields}
          onChange={(e) => {
            setValue(null);
            setSelectedField(e.value);
          }}
        />
        {selectedField && (
          <>
            <label className="mb-2 mt-3">Nouvelle valeur</label>
            {getInput()}
            <span className="mb-2 mt-3">Justification</span>

            <label
              htmlFor="justify"
              className="px-3 py-[12px] border border-[#dbe0e5] hover:border-[#04a9f5] focus:border-[#04a9f5] rounded-md transition duration-150 w-full cursor-pointer capitalize"
            >
              {file ? file.name : "choisir un fichier"}
            </label>

            <input
              type="file"
              name="justify"
              id="justify"
              onChange={handleFile}
              className="hidden"
            />
            <Button
              type="submit"
              className="w-full mt-4 text-center flex justify-center"
            >
              soumettre
            </Button>
          </>
        )}
      </form>
    </Card>
  );
};

export default UpdateProfile;
