import { useState, useEffect } from "react";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { format } from "date-fns";
import { fetchEmployees } from "../../api/listProfs";
import { HiSearch } from "react-icons/hi";
import { Paginator } from "primereact/paginator";

export const ListProfs = () => {
  const [history, setHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [displayDialog, setDisplayDialog] = useState(false);
  const [searchField, setSearchField] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(5);
  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
    console.log(event.first, event.rows, event.page);
  };
  const searchFields = [
    { label: "Doti", value: "doti" },
    { label: "Nom", value: "nom" },
    { label: "Département", value: "departement" },
    { label: "Date d'effet", value: "dateEffectGrade" },
    { label: "CIN", value: "cin" },
    { label: "Role", value: "role" },
  ];

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const employees = await fetchEmployees();
        setHistory(employees);
        setFilteredHistory(employees);
      } catch (error) {
        console.error("Error loading employees", error);
      }
    };

    loadEmployees();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "dd/MM/yyyy");
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <Button
        className="px-4 text-sm"
        label="Afficher"
        onClick={() => handleShowDetails(rowData)}
      />
    );
  };

  const handleShowDetails = (employee) => {
    setSelectedEmployee(employee);
    setDisplayDialog(true);
  };

  const hideDialog = () => {
    setTimeout(() => {
      setSelectedEmployee(null);
    }, 500);
    setDisplayDialog(false);
  };

  const dialogFooter = (
    <div>
      <Button
        className="p-1"
        label="Fermer"
        icon="pi pi-times"
        onClick={hideDialog}
      />
    </div>
  );

  const handleSearch = () => {
    if (searchField && searchValue) {
      const filteredData = history.filter((item) =>
        item[searchField]
          .toString()
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      );
      setFilteredHistory(filteredData);
    } else {
      setFilteredHistory(history);
    }
  };
  useEffect(() => {
    handleSearch();
  }, [searchValue, searchField]);

  return (
    <Card className="p-0">
      <div className="p-4">
        <div className="grid grid-cols-2 gap-8">
          <div className="relative">
            <InputText
              placeholder="Rechercher"
              className="max-w-[400px] px-12 w-full"
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
            ></InputText>
            <div className="absolute top-0 left-0 flex items-center justify-center size-12 ">
              <span className="size-6 text-slate-500">
                <HiSearch size={24} />
              </span>
            </div>
          </div>
          <Dropdown
            value={searchField}
            options={searchFields}
            onChange={(e) => setSearchField(e.value)}
            placeholder="Chercher par"
          />
        </div>
      </div>
      <div className="border border-slate-300 rounded-md mt-10">
        <DataTable value={filteredHistory}>
          <Column field="doti" header="Doti" className="text-center" />
          <Column field="nom" header="Nom" className="text-center" />
          <Column field="prenom" header="Prénom" className="text-center" />
          <Column
            field="dateEffectGrade"
            header="Date d'effet"
            className="text-center"
            body={(rowData) => formatDate(rowData.dateEffectGrade)}
          />
          <Column field="cin" header="CIN" className="text-center" />
          <Column field="role" header="Role" className="text-center" />
          <Column
            body={actionBodyTemplate}
            header="Détails"
            className="text-center"
          />
        </DataTable>
      </div>
      <div className="">
        <Paginator
          totalRecords={filteredHistory.length}
          rowsPerPageOptions={[5, 10, 20, 30]}
          onPageChange={onPageChange}
          style={{ marginTop: "1rem", position: "relative" }}
          rows={rows}
          first={first}
          template={{
            layout:
              "FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown ",
          }}
        />
      </div>
      <Dialog
        header="Détails"
        visible={displayDialog}
        style={{ width: "50vw" }}
        onHide={hideDialog}
        dismissableMask={true}
      >
        {selectedEmployee && (
          <div>
            <p>
              <strong>Date de Naissance:</strong>{" "}
              {formatDate(selectedEmployee.dateNaissance)}
            </p>
            <p>
              <strong>Lieu de Naissance:</strong>{" "}
              {selectedEmployee.lieuNaissance}
            </p>
            <p>
              <strong>Poste:</strong> {selectedEmployee.post}
            </p>
            <p>
              <strong>État Civil:</strong> {selectedEmployee.etatCivil}
            </p>
            <p>
              <strong>Échelon:</strong> {selectedEmployee.echlon}
            </p>
            <p>
              <strong>Sexe:</strong> {selectedEmployee.sexe}
            </p>
            <p>
              <strong>Nombre d'Enfants:</strong>{" "}
              {selectedEmployee.nombreEnfants}
            </p>
            <p>
              <strong>Email:</strong> {selectedEmployee.email}
            </p>
            <p>
              <strong>Téléphone:</strong> {selectedEmployee.phoneNumber}
            </p>
            <p>
              <strong>Département:</strong> {selectedEmployee.departement}
            </p>
          </div>
        )}
      </Dialog>
    </Card>
  );
};
