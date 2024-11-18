import React, { useEffect, useState } from "react";
import { Card } from "primereact/card";
import { getAllSituations } from "../api/historique";


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
    <Card>
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="gradeFilter" style={{ marginRight: "10px" }}>
          Filtrer par Grade :
        </label>
        <select
          id="gradeFilter"
          value={filterGrade}
          onChange={(e) => setFilterGrade(e.target.value)}
          style={{ marginRight: "20px" }}
        >
          <option value="">Tous</option>
          <option value="gradeA">Grade A</option>
          <option value="gradeB">Grade B</option>
          <option value="gradeC">Grade C</option>
          <option value="gradeD">Grade D</option>
        </select>

        <label htmlFor="postFilter" style={{ marginRight: "10px" }}>
          Filtrer par Poste :
        </label>
        <select
          id="postFilter"
          value={filterPost}
          onChange={(e) => setFilterPost(e.target.value)}
        >
          <option value="">Tous</option>
          <option value="PA">MC</option>
          <option value="PH">MCH</option>
          <option value="PES">PES</option>
        </select>
      </div>

      <table
        className="p-datatable"
        style={{ width: "100%", borderCollapse: "collapse" }}
      >
        <thead className="p-datatable-thead">
          <tr>
            <th className="p-sortable-column border-r border-l border-t" rowSpan="2">
              Doti
            </th>
            <th className="p-sortable-column border-r border-l border-t" rowSpan="2">
              Nom complet
            </th>
            <th className="p-sortable-column border-r border-l border-t" rowSpan="2">
              Poste
            </th>
            <th className="p-sortable-column border-r border-l border-t" colSpan="2">
              La situation actuelle
            </th>
            <th className="p-sortable-column border-r border-l border-t" colSpan="2">
              La situation proposée
            </th>
          </tr>
          <tr>
            <th className="p-sortable-column border-r border-l border-t">Échelon</th>
            <th className="p-sortable-column border-r border-l border-t">Ancienneté</th>
            <th className="p-sortable-column border-r border-l border-t">Échelon</th>
            <th className="p-sortable-column border-r border-l border-t">Date d'effet</th>
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
              <td className="border-r border-l">{mapEchlon(employee.echlon)}</td>
              <td className="border-r border-l">
                {new Date(employee.dateEffectEchlon).toLocaleDateString()}
              </td>
              <td className="border-r border-l">
                {mapEchlon(employee.proposedEchlon)}
              </td>
              <td className="border-r border-l">
                {new Date(employee.proposedDateEffectEchelon).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};

export default HistoriqueProfesseurs;
