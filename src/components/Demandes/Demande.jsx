import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import axios from "axios";

export const Demande = () => {
  const [visible, setVisible] = useState(false);
  const [demandes, setDemandes] = useState([]);
  const [typeDemmande, setTypeDemmande] = useState("");
  const [justification, setJustification] = useState("");
  const id = 1;
  const headerElement = (
    <div className="inline-flex align-items-center justify-content-center gap-2">
      <span className="font-bold white-space-nowrap">
        Modification du profile
      </span>
    </div>
  );

  const footerContent = (
    <div>
      <Button
        label="Envoyer"
        icon="pi pi-check"
        onClick={handleAddDemmande}
        autoFocus
      />
    </div>
  );
  const handleAddDemmande = async () => {
    const newDemmande = {
      typeDemmande,
      justification,
      dateDemmande: new Date().toISOString(),
      status: "EN_ATTENTE",
      employe: { doti: id },
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/demmandes/add",
        newDemmande
      );
      if (response.status === 201) {
        setDemandes([...demandes, response.data]);
        setVisible(false);
      } else {
        console.error("Failed to add demande");
      }
    } catch (error) {
      console.error("Error adding demande:", error);
    }
  };

  const fetchDemandes = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/employes${id}`
      );
      if (response.status === 200) {
        const employe = response.data;
        const formattedDemandes = employe.demmandeCollection.map((demande) => ({
          ...demande,
          dateDemmande: new Date(demande.dateDemmande).toLocaleDateString(
            "fr-FR"
          ),
        }));
        setDemandes(formattedDemandes);
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

  const deleteDemmande = async (idDemmande) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/v1/demmandes/delete/${idDemmande}`
      );
      if (response.status === 204) {
        const updatedDemandes = demandes.filter(
          (demande) => demande.id !== idDemmande
        );
        setDemandes(updatedDemandes);
      } else {
        console.error("Failed to delete demande");
      }
    } catch (error) {
      console.error("Error deleting demande:", error);
    }
    console.log(idDemmande);
  };

  const deleteButton = (rowData) => {
    return (
      <Button
        type="button"
        className="p-button-danger"
        onClick={() => deleteDemmande(rowData.id)}
        icon="pi pi-trash"
      />
    );
  };

  const deleteButton = (rowData) => {
    return (
      <div>
        <div className="flex justify-between items-center">
          <div className="flex m-5 ">
            <i className="pi pi-file-o mr-2 text-[3.35rem]"></i>
            <h1 className="text-[2.35rem] font-semibold">Demandes</h1>
          </div>
          <Button
            className="text-white px-3 py-[.75rem] transition duration-200 ease-in-out"
            onClick={() => setVisible(true)}
          >
            Ajouter un Demande
          </Button>
          <Dialog
            visible={visible}
            modal
            header={headerElement}
            footer={footerContent}
            style={{ width: "30rem" }}
            onHide={() => setVisible(false)}
          >
            <div className="mb-4 mt-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="typeDemmande"
              >
                Type de la demande :
              </label>
              <select
                className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                id="typeDemmande"
                value={typeDemmande}
                onChange={(e) => setTypeDemmande(e.target.value)}
              >
                <option value="updateGrade">updateGrade</option>
                <option value="updatePost">updatePost</option>
                <option value="NmbreEnfs">NmbreEnfs</option>
                <option value="EtatCivil">EtatCivil</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="justification"
              >
                Justification :
              </label>
              <InputText
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="justification"
                type="text"
                placeholder="Justification"
                value={justification}
                onChange={(e) => setJustification(e.target.value)}
              />
            </div>
          </Dialog>
        </div>

        <div className="m-11 mb-0 card">
          <DataTable
            value={demandes}
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 25, 50]}
            tableStyle={{ minWidth: "50rem" }}
          >
            <Column
              field="typeDemmande"
              header="Type de demande"
              style={{ width: "25%" }}
            ></Column>
            <Column
              field="dateDemmande"
              header="Date de demande"
              style={{ width: "25%" }}
            ></Column>
            <Column
              field="status"
              header="Statut"
              style={{ width: "25%" }}
            ></Column>
            <Column
              header="Action"
              body={deleteButton}
              style={{ width: "25%" }}
            />
          </DataTable>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex m-5 ">
          <i className="pi pi-file-o mr-2 text-[3.35rem]"></i>
          <h1 className="text-[2.35rem] font-semibold">Demandes</h1>
        </div>
        <Button
          className="text-white px-3 py-[.75rem] transition duration-200 ease-in-out"
          onClick={() => setVisible(true)}
        >
          Ajouter un Demande
        </Button>
        <Dialog
          visible={visible}
          modal
          header={headerElement}
          footer={footerContent}
          style={{ width: "30rem" }}
          onHide={() => setVisible(false)}
        >
          <div class="mb-4 mt-2">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="type"
            >
              Type de la demande :
            </label>
            <select
              className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              id="childrenCount"
            >
              <option></option>
              <option></option>
              <option></option>
            </select>
          </div>
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="justification"
            >
              Justification :
            </label>
            <InputText
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="justification"
              type="text"
              placeholder="Justification"
            />
          </div>
        </Dialog>
      </div>

      <div className="m-11 mb-0 card">
        <DataTable
          value={demandes}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25, 50]}
          tableStyle={{ minWidth: "50rem" }}
        >
          <Column
            field="typeDemmande"
            header="Type de demande"
            style={{ width: "25%" }}
          ></Column>
          <Column
            field="dateDemmande"
            header="Date de demande"
            style={{ width: "25%" }}
          ></Column>
          <Column
            field="status"
            header="Statut"
            style={{ width: "25%" }}
          ></Column>
          <Column
            header="Action"
            body={deleteButton}
            style={{ width: "25%" }}
          />
        </DataTable>
      </div>
    </div>
  );
};

export default Demande;
