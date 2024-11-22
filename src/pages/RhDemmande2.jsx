import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import axios from "axios";
import customFetch from "../utils/customFetch";
import { Card } from "primereact/card";
import { HiSearch } from "react-icons/hi";
import { Paginator } from "primereact/paginator";

const RhDemmande2 = () => {
  const [demandes, setDemandes] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedDemmande, setSelectedDemmande] = useState(null);
  const [justification, setJustification] = useState("");
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(5);
  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
    console.log(event.first, event.rows, event.page);
  };
  const fetchDemandes = () => {
    customFetch
      .get("/api/v1/demmandes")
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
        className="p-2"
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
    customFetch
      .post(
        `/api/v1/demmandes/accepterDemmandeUpdateProfesseur/${idDemmande}`
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
    customFetch
      .post(
        `/api/v1/demmandes/refuseDemmandeUpdateProfesseur/${selectedDemmande}`,
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
    <Card>
      <div className="grid justify-between gap-4 grid-cols-[1fr_auto] ">
        <div className="relative">
          <InputText
            placeholder="Rechercher"
            className="max-w-[400px] px-12 w-full"
          ></InputText>
          <div className="absolute top-0 left-0 flex items-center justify-center size-12 ">
            <span className="size-6 text-slate-500">
              <HiSearch size={24} />
            </span>
          </div>
        </div>
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

      <div className="border border-slate-300 rounded-md mt-10">
        <DataTable
          value={demandesSpecifiques}
          tableStyle={{ minWidth: "50rem" }}
        >
          <Column field="doti" header="Id" style={{ width: "20%" }}></Column>
          <Column
            header="Nom d'employé"
            body={(row) => `${row.employeDto.prenom} ${row.employeDto.nom}`}
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
      <div className="">
        <Paginator
          totalRecords={autresDemandes.length}
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
    </Card>
  );
};

export default RhDemmande2;
