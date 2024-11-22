import React, { useEffect, useState } from "react";
import { Card } from "primereact/card";
import { getAllSituations } from "../api/historique";
import { Dropdown } from "primereact/dropdown";

const HistoriqueProfesseurs = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [filterGrade, setFilterGrade] = useState("");
  const [filterPost, setFilterPost] = useState("");

  useEffect(() => {
    getAllSituations()
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
  }, []);

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

  return (
    <Card className="mb-10">
      <div className="w-full grid md:grid-cols-2 mb-10 gap-8">
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
              colSpan="2"
            >
              La situation actuelle
            </th>
            <th
              className="p-sortable-column border-r border-l border-t"
              colSpan="2"
            >
              La situation proposée
            </th>
          </tr>
          <tr>
            <th className="p-sortable-column border-r border-l border-t">
              Échelon
            </th>
            <th className="p-sortable-column border-r border-l border-t">
              Ancienneté
            </th>
            <th className="p-sortable-column border-r border-l border-t">
              Échelon
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
              <td className="border-r border-l">
                {mapEchlon(employee.echlon)}
              </td>
              <td className="border-r border-l">
                {new Date(employee.dateEffectEchlon).toLocaleDateString()}
              </td>
              <td className="border-r border-l">
                {mapEchlon(employee.proposedEchlon)}
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
