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
import { getAllHistorique } from "../../api/historique";
import ProfDetails from "./ProfDetails";
import { FiUpload } from "react-icons/fi";
import customFetch from "../../utils/customFetch";
import { FileUpload } from "primereact/fileupload";

export const ListProfs = () => {
  const [history, setHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [displayDialog, setDisplayDialog] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(5);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
    console.log(event.first, event.rows, event.page);
  };
  const loadEmployees = async () => {
    try {
      const employees = await fetchEmployees();
      setHistory(employees);
      setFilteredHistory(employees);
      setSearchValue("");
    } catch (error) {
      console.error("Error loading employees", error);
    }
  };
  useEffect(() => {
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
  const handleSearch = () => {
    const lowerSearchValue = searchValue.toLowerCase();
    const newHistory = history.filter((employee) => {
      return Object.values(employee).some((value) => {
        if (value === null || value === undefined) return false;
        return value.toString().toLowerCase().includes(lowerSearchValue);
      });
    });
    setFilteredHistory(newHistory);
  };
  const handleUpload = async (event) => {
    setFile(event.target.files[0]);
    const file = event.target.files[0];
    if (!file) {
      setMessage("Please select a file before uploading.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await customFetch.post(
        "http://localhost:8080/api/v1/professeurs/import",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage(response.data);
      loadEmployees();
    } catch (error) {
      if (error.response) {
        setMessage(`Error: ${error.response.data}`);
      } else {
        setMessage("An error occurred during the upload.");
      }
      console.log(error);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [searchValue]);

  return (
    <Card className="p-0" onClick={(e) => e.stopPropagation()}>
      <div className="p-4">
        <div className="flex justify-between">
          <div className="relative max-w-[400px]">
            <InputText
              placeholder="Rechercher"
              className="max-w-[500px] px-12 w-full"
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
          <label htmlFor="justify" className="p-button">
            <span className="block pr-2 font-bold">
              {" "}
              <FiUpload size={16} />
            </span>

            {file ? file.name : "Choisir un fichier"}
          </label>

          <input
            type="file"
            name="justify"
            id="justify"
            onChange={handleUpload}
            className="hidden"
          />
        </div>
      </div>
      <div className="border border-slate-300 rounded-md mt-10">
        <DataTable value={filteredHistory.slice(first, first + rows)}>
          <Column field="doti" header="Doti" />
          <Column field="nom" header="Nom" />
          <Column field="prenom" header="Prénom" />
          <Column
            field="dateEffectGrade"
            header="Date d'effet"
            body={(rowData) => formatDate(rowData.dateEffectGrade)}
          />
          <Column field="cin" header="CIN" />
          <Column field="role" header="Role" />
          <Column body={actionBodyTemplate} header="Détails" />
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
        headerClassName="text-black"
      >
        {selectedEmployee && (
          <ProfDetails selectedEmployee={selectedEmployee} />
        )}
      </Dialog>
    </Card>
  );
};
