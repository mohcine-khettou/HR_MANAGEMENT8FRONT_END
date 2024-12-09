import { useEffect, useState } from "react";
import { Card } from "primereact/card";
import { getAllSituations, getSituationsForYear } from "../api/historique";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { FiCheckCircle } from "react-icons/fi";
import { ImCancelCircle } from "react-icons/im";

const HistoriqueProfesseurs = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [filterGrade, setFilterGrade] = useState("");
  const [filterPost, setFilterPost] = useState("");
  const [annee, setAnnee] = useState(new Date().getFullYear());
  useEffect(() => {
    getSituationsForYear(annee)
      .then(({ data, error }) => {
        if (data) {
          setEmployees(data);
          setFilteredEmployees(data);
        }
        if (error) {
          console.error("Erreur lors de la récupération des données :", error);
        }
      })
      .catch((error) => console.error("Erreur non gérée :", error));
  }, [annee]);

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
      PA: "MC",
      PH: "MCH",
    };
    return mapping[post] || post;
  };
  const getProposedGrade = (row) => {
    const isNewGrade =
      row.echlon === row.proposedEchlon &&
      ((row.echlon === 4 && row.post !== "PES") || row.echlon === 5);
    if (!isNewGrade) return row.grade.split("grade")[1];
    if (row.grade === "gradeA") return "B";
    if (row.grade === "gradeB") return "C";
    if (row.grade === "gradeC") return "D";
    if (row.grade === "gradeD") return row.post === "PES" ? "E" : "D";
  };
  useEffect(() => {
    let filtered = employees;

    if (filterGrade) {
      filtered = filtered.filter((employee) => employee.grade === filterGrade);
    }
    if (filterPost) {
      filtered = filtered.filter((employee) => employee.post === filterPost);
    }

    setFilteredEmployees(filtered);
  }, [filterGrade, filterPost, employees]);
  console.log(filteredEmployees);

  return (
    <Card className="mb-10">
      <div className="w-full grid md:grid-cols-3 mb-10 gap-8">
        <label className={"block w-full"}>
          <span className="block capitalize mb-1 font-medium">Année</span>
          <InputNumber
            value={annee}
            onChange={(e) => setAnnee(e.value)}
            className="w-full"
            useGrouping={false}
          />
        </label>
        <label className={"block w-full"}>
          <span className="block capitalize mb-1 font-medium">
            Filtrer par Grade
          </span>
          <Dropdown
            value={filterGrade}
            options={[
              { label: "Tous", code: "" },
              { label: "Grade A", code: "gradeA" },
              { label: "Grade B", code: "gradeB" },
              { label: "Grade C", code: "gradeC" },
              { label: "Grade D", code: "gradeD" },
            ]}
            onChange={(e) => setFilterGrade(e.value)}
            placeholder="Filtrer par Grade"
            optionLabel="label"
            optionValue="code"
            className="w-full"
          />
        </label>
        <label className={"block w-full"}>
          <span className="block capitalize mb-1 font-medium">
            Filtrer par poste
          </span>
          <Dropdown
            value={filterPost}
            options={[
              { label: "Tous", code: "" },
              { label: "MC", code: "PA" },
              { label: "MCH", code: "PH" },
              { label: "PES", code: "PES" },
            ]}
            onChange={(e) => setFilterPost(e.value)}
            placeholder="Filtrer par Poste"
            optionLabel="label"
            optionValue="code"
            className="w-full"
          />
        </label>
      </div>

      <table
        className="p-datatable"
        style={{ width: "100%", borderCollapse: "collapse" }}
      >
        <thead className="p-datatable-thead">
          <tr>
            <th
              className="p-sortable-column border-r border-l border-t"
              rowSpan="2"
            >
              Doti
            </th>
            <th
              className="p-sortable-column border-r border-l border-t"
              rowSpan="2"
            >
              Nom complet
            </th>
            <th
              className="p-sortable-column border-r border-l border-t"
              rowSpan="2"
            >
              Poste
            </th>
            <th
              className="p-sortable-column border-r border-l border-t"
              rowSpan="2"
            >
              Eligible pour le nouveau poste
            </th>
            <th
              className="p-sortable-column border-r border-l border-t"
              colSpan="3"
            >
              La situation actuelle
            </th>
            <th
              className="p-sortable-column border-r border-l border-t"
              colSpan="3"
            >
              La situation proposée
            </th>
          </tr>
          <tr>
            <th className="p-sortable-column border-r border-l border-t">
              Échelon
            </th>
            <th className="p-sortable-column border-r border-l border-t">
              Grade
            </th>
            <th className="p-sortable-column border-r border-l border-t">
              Ancienneté
            </th>
            <th className="p-sortable-column border-r border-l border-t">
              Échelon
            </th>
            <th className="p-sortable-column border-r border-l border-t">
              Grade
            </th>
            <th className="p-sortable-column border-r border-l border-t">
              Date d'effet
            </th>
          </tr>
        </thead>
        <tbody className="p-datatable-tbody">
          {filteredEmployees.map((employee, index) => (
            <tr key={index}>
              <td className="border-r border-l">{employee.doti}</td>
              <td className="border-r border-l">
                {employee.nom} {employee.prenom}
              </td>
              <td className="border-r border-l">{mapPost(employee.post)}</td>
              <td className="border-r border-l text-center">
                {employee.isEligibleForNextPost ? (
                  <span className="flex w-full justify-center">
                    <FiCheckCircle size={20} color="green" />
                  </span>
                ) : (
                  <span className="flex w-full justify-center">
                    <ImCancelCircle size={20} color="red" />
                  </span>
                )}
              </td>
              <td className="border-r border-l">
                {mapEchlon(employee.echlon)}
              </td>
              <td className="border-r border-l">
                {employee.grade.split("grade")[1]}
              </td>
              <td className="border-r border-l">
                {new Date(employee.dateEffectEchlon).toLocaleDateString()}
              </td>
              <td className="border-r border-l">
                {mapEchlon(employee.proposedEchlon)}
              </td>
              <td className="border-r border-l">
                {getProposedGrade(employee)}
              </td>
              <td className="border-r border-l">
                {new Date(
                  employee.proposedDateEffectEchelon
                ).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};

export default HistoriqueProfesseurs;
