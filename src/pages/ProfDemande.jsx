import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { useUserContext } from "../context";
import customFetch from "../utils/customFetch";
import { useEffect, useState } from "react";
import { Dropdown } from "primereact/dropdown";
const ProfDemande = () => {
  const { user } = useUserContext();
  const [visible, setVisible] = useState(false);
  const [demandes, setDemandes] = useState([]);
  const [typeDemmande, setTypeDemmande] = useState("Demande1");
  const id = user.doti;

  const fetchDemandes = async () => {
    try {
      const response = await customFetch.get(`/api/v1/demmandes/${id}`);
      if (response.status === 200) {
        setDemandes(response.data.reverse());
      } else {
        console.error("Failed to fetch demandes");
      }
    } catch (error) {
      console.error("Error fetching demandes:", error);
    }
  };

  useEffect(() => {
    fetchDemandes();
  }, [id]);

  const handleAddDemmande = async () => {
    const formData = new FormData();
    formData.append("typeDemmande", typeDemmande);
    formData.append("dateDemmande", new Date().toISOString());
    formData.append("status", "EN_ATTENTE");
    formData.append("doti", id);

    try {
      const response = await customFetch.post(
        `/api/v1/demmandes/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        setDemandes([...demandes, response.data]);
        fetchDemandes();
        setVisible(false);
      } else {
        console.error("Failed to add demande");
      }
    } catch (error) {
      console.error("Error adding demande:", error);
    }
  };
  const deleteDemmande = async (idDemmande) => {
    try {
      const response = await customFetch.delete(
        `/api/v1/demmandes/delete/${idDemmande}`
      );
      if (response.status === 204) {
        const updatedDemandes = demandes.filter(
          (demande) => demande.id !== idDemmande
        );
        setDemandes(updatedDemandes);
        fetchDemandes();
      } else {
        console.error("Failed to delete demande");
      }
    } catch (error) {
      console.error("Error deleting demande:", error);
    }
  };

  const deleteButton = (rowData) => {
    return (
      <Button
        type="button"
        className="p-button-danger"
        onClick={() => deleteDemmande(rowData.doti)}
        icon="pi pi-trash"
      />
    );
  };

  const formatDate = (date) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(date).toLocaleDateString("fr-FR", options);
  };

  const dateTemplate = (rowData) => {
    return formatDate(rowData.dateDemmande);
  };
  const statusBodyTemplate = (rowData) => {
    if (rowData.status === "ACCEPTE") {
      return (
        <span className="inline-block px-3 py-1 rounded-full whitespace-nowrap text-sm font-medium bg-green-200 text-green-800">
          Acceptée
        </span>
      );
    }
    if (rowData.status === "REFUSE") {
      return (
        <span className="inline-block px-3 py-1 rounded-full whitespace-nowrap text-sm font-medium bg-red-200 text-red-800">
          Refusée
        </span>
      );
    }
    return (
      <span className="inline-block px-3 py-1 rounded-full whitespace-nowrap text-sm font-medium bg-gray-200 text-gray-800">
        {rowData.status}
      </span>
    );
  };

  return (
    <div className="">
      <>
        <Dialog
          visible={visible}
          modal
          header={"Nouveau demande"}
          onHide={() => {
            setVisible(false);
            setTypeDemmande("Demande1");
          }}
          className="w-[90vw] max-w-[650px]"
          headerClassName="text-black"
        >
          <label className={"block w-full"}>
            <span className="block capitalize mb-1 font-medium">
              Type de la demande :
            </span>
            <Dropdown
              value={typeDemmande}
              options={[
                { label: "Demande 1", code: "Demande1" },
                { label: "Demande 2", code: "Demande2" },
                { label: "Demande 3", code: "Demande3" },
                { label: "Demande 4", code: "Demande4" },
              ]}
              onChange={(e) => setTypeDemmande(e.value)}
              optionLabel="label"
              optionValue="code"
              className="w-full"
            />
          </label>
          <div className="flex w-full justify-end mt-6">
            <Button
              label="Envoyer"
              icon="pi pi-check"
              onClick={handleAddDemmande}
              autoFocus
            />
          </div>
        </Dialog>

        <div className="mb-0 p-card py-16">
          <div className="flex justify-end items-center px-8 mb-8">
            <Button
              onClick={() => setVisible(true)}
              icon="pi pi-plus"
              label="Ajouter"
            ></Button>
          </div>
          <DataTable
            value={demandes}
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 25, 50]}
            tableStyle={{ minWidth: "50rem" }}
            paginatorClassName="w-[calc(100%_-_4rem)] relative mx-auto"
          >
            <Column
              field="typeDemmande"
              header="Type de demande"
              style={{ width: "25%" }}
              className="pl-8"
              headerClassName="pl-8"
            ></Column>
            <Column
              field="dateDemmande"
              header="Date de demande"
              body={dateTemplate}
              style={{ width: "25%" }}
            ></Column>
            <Column
              field="status"
              header="Statut"
              body={statusBodyTemplate}
            ></Column>
            <Column
              header="Action"
              body={deleteButton}
              style={{ width: "25%" }}
            />
          </DataTable>
        </div>
      </>
    </div>
  );
};

export default ProfDemande;
