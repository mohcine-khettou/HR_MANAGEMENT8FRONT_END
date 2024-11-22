import { format } from "date-fns";
import moment from "moment";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React from "react";

const ProfDetails = ({ selectedEmployee }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "dd/MM/yyyy");
  };

  return (
    <>
      <div className="border border-slate-300 overflow-hidden rounded-lg">
        <div className="border-b border-b-slate-300 grid grid-cols-[1fr_2fr] gap-2 last:border-b-0 p-3">
          <span className="font-semibold">Date de Naissance</span>
          <span>{formatDate(selectedEmployee.dateNaissance)}</span>
        </div>
        <div className="border-b border-b-slate-300 grid grid-cols-[1fr_2fr] gap-2 last:border-b-0 p-3">
          <span className="font-semibold">Lieu de Naissance</span>
          <span> {selectedEmployee.lieuNaissance}</span>
        </div>
        <div className="border-b border-b-slate-300 grid grid-cols-[1fr_2fr] gap-2 last:border-b-0 p-3">
          <span className="font-semibold">Poste:</span>
          <span>{selectedEmployee.post}</span>
        </div>
        <div className="border-b border-b-slate-300 grid grid-cols-[1fr_2fr] gap-2 last:border-b-0 p-3">
          <span className="font-semibold">État Civil</span>
          <span>{selectedEmployee.etatCivil}</span>
        </div>
        <div className="border-b border-b-slate-300 grid grid-cols-[1fr_2fr] gap-2 last:border-b-0 p-3">
          <span className="font-semibold">Échelon</span>
          <span>{selectedEmployee.echlon}</span>
        </div>
        <div className="border-b border-b-slate-300 grid grid-cols-[1fr_2fr] gap-2 last:border-b-0 p-3">
          <span className="font-semibold">Sexe</span>
          <span>{selectedEmployee.sexe}</span>
        </div>
        <div className="border-b border-b-slate-300 grid grid-cols-[1fr_2fr] gap-2 last:border-b-0 p-3">
          <span className="font-semibold">Nombre d'Enfants</span>{" "}
          <span> {selectedEmployee.nombreEnfants}</span>
        </div>
        <div className="border-b border-b-slate-300 grid grid-cols-[1fr_2fr] gap-2 last:border-b-0 p-3">
          <span className="font-semibold">Email</span>{" "}
          <span> {selectedEmployee.email}</span>
        </div>
        <div className="border-b border-b-slate-300 grid grid-cols-[1fr_2fr] gap-2 last:border-b-0 p-3">
          <span className="font-semibold">Téléphone</span>{" "}
          <span> {selectedEmployee.phoneNumber}</span>
        </div>
        <div className="border-b border-b-slate-300 grid grid-cols-[1fr_2fr] gap-2 last:border-b-0 p-3">
          <span className="font-semibold">Département</span>{" "}
          <span> {selectedEmployee.departement}</span>
        </div>
      </div>
      <span className="font-semibold mt-4 block">Historique de passage :</span>
      <div className="text-center mt-4 border border-slate-300 rounded-md ">
        <DataTable value={selectedEmployee.historiquePassageCollection}>
          <Column field="grade" header="Grade"></Column>
          <Column field="post" header="Poste"></Column>
          <Column field="echlon" header="Echelon" />
          <Column
            field="date"
            header="date d'effet"
            body={(row) => moment(row.dateEffect).format("DD/MM/YYYY")}
          />
        </DataTable>
      </div>
    </>
  );
};

export default ProfDetails;
