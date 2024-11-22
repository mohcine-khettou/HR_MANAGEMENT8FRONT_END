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

export const ListProfs = () => {
  const [history, setHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [displayDialog, setDisplayDialog] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(5);
  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
    console.log(event.first, event.rows, event.page);
  };

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
  useEffect(() => {
    handleSearch();
  }, [searchValue]);

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
