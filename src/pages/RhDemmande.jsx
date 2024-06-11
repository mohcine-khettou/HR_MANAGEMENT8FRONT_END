import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import axios from "axios";

const RhDemmande = () => {
  const [demandes, setDemandes] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedDemmande, setSelectedDemmande] = useState(null);
  const [justification, setJustification] = useState("");

  const fetchDemandes = () => {
    axios
      .get("http://localhost:8080/api/v1/demmandes")
      .then((response) => {
        setDemandes(response.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    fetchDemandes();
  }, []);

  const valeurBodyTemplate = (rowData) => {
    return rowData.typeDemmande === "EtatCivil"
      ? rowData.etatCivil
      : rowData.nmbreEnfts;
  };

  const pieceJointeBodyTemplate = (rowData) => {
    return (
      <Button
        className="px-3 py-[12px] bg-[#04a9f5] rounded-md transition duration-150 w-full cursor-pointer capitalize"
        label="Télécharger"
        icon="pi pi-download"
        onClick={() => handleDownload(rowData.pieceJointe, rowData.doti)}
      />
    );
  };

  const handleDownload = (pieceJointe, doti) => {
    const byteCharacters = atob(pieceJointe);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "application/pdf" });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `pieceJointe_${doti}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleAccept = (idDemmande) => {
    axios
      .post(
        `http://localhost:8080/api/v1/demmandes/accepterDemmandeUpdateProfesseur/${idDemmande}`
      )
      .then((response) => {
        fetchDemandes();
      })
      .catch((error) => console.error("Error accepting request:", error));
  };

  const handleReject = (idDemmande) => {
    setSelectedDemmande(idDemmande);
    setVisible(true);
  };

  const handleSendJustification = () => {
    axios
      .post(
        `http://localhost:8080/api/v1/demmandes/refuseDemmandeUpdateProfesseur/${selectedDemmande}`,
        justification,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        fetchDemandes();
        setVisible(false);
        setJustification("");
      })
      .catch((error) => console.error("Error rejecting request:", error));
  };

  const actionBodyTemplate = (rowData) => {
    if (rowData.status === "ACCEPTE") {
      return (
        <span className="p-2 bg-green-200 text-green-800 rounded">
          Acceptée
        </span>
      );
    }
    if (rowData.status === "REFUSE") {
      return (
        <span className="p-2 bg-red-200 text-red-800 rounded">Refusée</span>
      );
    }
    return (
      <div className="actions">
        <Button
          icon="pi pi-check"
          className="p-button-success mr-2"
          onClick={() => handleAccept(rowData.doti)}
        />
        <Button
          icon="pi pi-times"
          className="p-button-danger"
          onClick={() => handleReject(rowData.doti)}
        />
      </div>
    );
  };

  const headerElement = (
    <div className="inline-flex align-items-center justify-content-center gap-2">
      <span className="font-bold white-space-nowrap">Refuser demande</span>
    </div>
  );

  const footerContent = (
    <div>
      <Button
        label="Envoyer"
        icon="pi pi-check"
        onClick={handleSendJustification}
        autoFocus
      />
    </div>
  );

  const demandesSpecifiques = demandes.filter((demmande) =>
    ["Demande1", "Demande2", "Demande3", "Demande4"].includes(
      demmande.typeDemmande
    )
  );

  const autresDemandes = demandes.filter(
    (demmande) =>
      !["Demande1", "Demande2", "Demande3", "Demande4"].includes(
        demmande.typeDemmande
      )
  );

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex m-5 ">
          <i className="pi pi-file-o mr-2 text-[3.35rem]"></i>
          <h1 className="text-[2.35rem] font-semibold">Demandes</h1>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <h1 className="text-[2.35rem] font-semibold">
          Demandes de modification du profile
        </h1>
      </div>
      <div className="m-0 mb-0 card">
        <DataTable
          value={autresDemandes}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25, 50]}
          tableStyle={{ minWidth: "50rem" }}
        >
          <Column field="doti" header="Id" style={{ width: "5%" }}></Column>
          <Column
            field="employeDto.nom"
            header="Nom d'employé"
            style={{ width: "20%" }}
          ></Column>
          <Column
            field="typeDemmande"
            header="Type de la demande"
            style={{ width: "20%" }}
          ></Column>
          <Column
            field="valeur"
            header="Valeur"
            body={valeurBodyTemplate}
            style={{ width: "20%" }}
          ></Column>
          <Column
            field="pieceJointe"
            header="Piece jointe"
            body={pieceJointeBodyTemplate}
            style={{ width: "20%" }}
          ></Column>
          <Column
            header="Action"
            body={actionBodyTemplate}
            style={{ width: "20%" }}
          />
        </DataTable>
      </div>

      <Dialog
        visible={visible}
        modal
        header={headerElement}
        footer={footerContent}
        style={{ width: "30rem" }}
        onHide={() => setVisible(false)}
      >
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

      <div className="flex justify-between items-center mt-6">
        <h1 className="text-[2.35rem] font-semibold">Demandes des documents</h1>
      </div>
      <div className="mt-3 mb-0 card">
        <DataTable
          value={demandesSpecifiques}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25, 50]}
          tableStyle={{ minWidth: "50rem" }}
        >
          <Column field="doti" header="Id" style={{ width: "20%" }}></Column>
          <Column
            field="employeDto.nom"
            header="Nom d'employé"
            style={{ width: "20%" }}
          ></Column>
          <Column
            field="typeDemmande"
            header="Type de la demande"
            style={{ width: "20%" }}
          ></Column>
          <Column
            header="Action"
            body={actionBodyTemplate}
            style={{ width: "20%" }}
          />
        </DataTable>
      </div>
    </div>
  );
};

export default RhDemmande;
