import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { useState } from "react";
import { FileUpload } from "primereact/fileupload";
const UpdateProfile = () => {
  const [selectedField, setSelectedField] = useState(null);
  const [value, setValue] = useState(null);
  const fields = [
    { name: "état civil", code: "état civil" },
    { name: "grade", code: "grade" },
    { name: "nombre d'enfants", code: "nombre d'enfants" },
  ];
  const getInput = () => {
    const props = {
      value: value,
      onChange: (e) => setValue(e.value),
      defaultValue: null,
    };
    if (selectedField.name === "état civil") return <InputText {...props} />;
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
    return (
      <InputNumber
        className="border border-[#dbe0e5] hover:border-[#04a9f5] focus:border-[#04a9f5] rounded-md transition duration-150"
        {...props}
      />
    );
  };
  return (
    <Card className="p-0">
      <div className="border-b border-b-[#dbe0e5] px-4 pb-5 pt-3 font-medium">
        Modifier le profile
      </div>
      <form className="flex flex-col gap-2 px-4 pt-5">
        <label className="mb-2">Champs à modifier</label>
        <Dropdown
          value={selectedField}
          optionLabel="name"
          className="w-full"
          options={fields}
          onChange={(e) => {
            setSelectedField(e.value);
            setValue(null);
          }}
        />
        {selectedField && (
          <>
            <label className="mb-2 mt-3">Nouvelle valeur</label>
            {getInput()}
            <label className="mb-2 mt-3">Justification</label>
            <FileUpload
              mode="basic"
              name="demo[]"
              url="/api/upload"
              accept="image/*"
              maxFileSize={10000}
            />
          </>
        )}
      </form>
    </Card>
  );
};

export default UpdateProfile;
