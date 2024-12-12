import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { useEffect, useState } from "react";
import { getAllSituations as getAllSituationsApi } from "../api/historique";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Paginator } from "primereact/paginator";

const Gradation = () => {
  const [gradeType, setgradeType] = useState("echlon");
  const [annee, setAnnee] = useState(new Date().getFullYear());
  const [allSituations, setAllSituations] = useState([]);
  const [filteredSituations, setFilteredSituations] = useState([]);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
    console.log(event.first, event.rows, event.page);
  };
  const dateTemplate = (date) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(date).toLocaleDateString("fr-FR", options);
  };
  const mapEchlon = (echlon) => {
    if (!echlon) return "";
    const mapping = {
      echlonA: 1,
      echlonB: 2,
      echlonC: 3,
      echlonD: 4,
      echlonE: 5,
    };
    return mapping[echlon] || echlon;
  };
  const mapPost = (post) => {
    if (!post) return "";
    const mapping = {
      pa: "MC",
      ph: "MCH",
      pes: "PES",
    };
    return mapping[post] || post;
  };
  const getAdditionalColumns = () => {
    if (gradeType === "post") {
      return [
        <Column key={0} field="proposedPost" header="Poste proposé"></Column>,
        <Column
          key={1}
          field="proposedDateEffectPost"
          header="Date d'effet proposé"
          body={(row) => dateTemplate(row.proposedDateEffectPost)}
        ></Column>,
      ];
    }
    if (gradeType === "grade") {
      return [
        <Column key={2} field="proposedGrade" header="Grade proposé"></Column>,
        <Column
          key={3}
          field="proposedDateEffectGrade"
          header="Date d'effet proposé"
          body={(row) => dateTemplate(row.proposedDateEffectGrade)}
        ></Column>,
      ];
    }
    return [
      <Column key={4} field="proposedEchlon" header="Echelon proposé"></Column>,
      <Column
        key={5}
        field="proposedDateEffectEchelon"
        header="Date d'effet proposé"
        body={(row) => dateTemplate(row.proposedDateEffectEchelon)}
      ></Column>,
    ];
  };
  const getAllSituations = async () => {
    const data = await getAllSituationsApi();
    if (data.data) {
      setAllSituations(
        data.data.map((row) => ({
          ...row,
          echlon: mapEchlon(row.echlon),
          proposedEchlon: mapEchlon(row.proposedEchlon),
          post: mapPost(row.post),
          proposedPost: mapPost(row.proposedPost),
        }))
      );
    } else {
      console.log("error");
    }
  };
  const handleCurrentSituation = () => {
    let newSitutations = [...allSituations];
    const [proposed, dateEffect] =
      gradeType === "grade"
        ? ["proposedGrade", "proposedDateEffectGrade"]
        : gradeType === "post"
        ? ["proposedPost", "proposedDateEffectPost"]
        : ["proposedEchlon", "proposedDateEffectEchelon"];
    newSitutations = newSitutations.filter((row) => {
      return (
        row[dateEffect].includes(annee.toString()) &&
        row[proposed] !== row[gradeType]
      );
    });
    setFilteredSituations(newSitutations);
  };
  useEffect(() => {
    getAllSituations();
  }, []);
  useEffect(() => {
    console.log(allSituations);

    handleCurrentSituation();
  }, [annee, allSituations, gradeType]);

  return (
    <Card className="mb-10">
      <div className="w-full grid md:grid-cols-2 mb-10 gap-8">
        <label className={"block w-full"}>
          <span className="block capitalize mb-1 font-medium">
            Type de grade
          </span>
          <Dropdown
            value={gradeType}
            options={[
              { label: "Poste", code: "post" },
              { label: "Grade", code: "grade" },
              { label: "Echelon", code: "echlon" },
            ]}
            onChange={(e) => setgradeType(e.value)}
            optionLabel="label"
            optionValue="code"
            className="w-full"
          />
        </label>
        <label className={"block w-full"}>
          <span className="block capitalize mb-1 font-medium">Année</span>
          <InputNumber
            value={annee}
            onChange={(e) => setAnnee(e.value)}
            className="w-full"
            useGrouping={false}
          />
        </label>
      </div>
      <div className="border border-slate-300 rounded-md mt-10 mb-4 overflow-hidden">
        <DataTable
          value={filteredSituations.slice(first, first + rows)}
          tableStyle={{ minWidth: "50rem" }}
        >
          <Column field="doti" header="DOTI"></Column>
          <Column field="post" header="Poste"></Column>
          <Column field="grade" header="Grade"></Column>
          <Column field="echlon" header="Echelon"></Column>
          {getAdditionalColumns()}
        </DataTable>
      </div>
      <div className="px-10 relative">
        <Paginator
          totalRecords={filteredSituations.length}
          rowsPerPageOptions={[10, 20, 30]}
          onPageChange={onPageChange}
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

export default Gradation;
