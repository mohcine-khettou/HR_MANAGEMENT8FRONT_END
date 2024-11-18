import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React from "react";

const HistoriqueProfesseurs = () => {
  const employees = [
    {
      id: 1438670,
      name: "هند العسيلة",
      currentRank: 3,
      currentCode: 660,
      currentDate: "2022/06/03",
      proposedRank: 4,
      proposedCode: 720,
      proposedDate: "2024/06/03",
    },
    {
      id: 1654931,
      name: "سناء الصباع",
      currentRank: 3,
      currentCode: 660,
      currentDate: "2022/06/05",
      proposedRank: 4,
      proposedCode: 720,
      proposedDate: "2024/06/05",
    },
    {
      id: 1655363,
      name: "سارة أزرق",
      currentRank: 2,
      currentCode: 620,
      currentDate: "2022/03/17",
      proposedRank: 3,
      proposedCode: 660,
      proposedDate: "2024/03/17",
    },
    {
      id: 1233406,
      name: "حميد الغريفي",
      currentRank: 3,
      currentCode: 660,
      currentDate: "2022/05/05",
      proposedRank: 3,
      proposedCode: 660,
      proposedDate: "2024/05/05",
    },
    {
      id: 1410263,
      name: "سعيد الكحجالي",
      currentRank: 3,
      currentCode: 660,
      currentDate: "2022/01/02",
      proposedRank: 4,
      proposedCode: 720,
      proposedDate: "2024/01/02",
    },
  ];

  return (
    <Card>
      <table
        className="p-datatable"
        style={{ width: "100%", borderCollapse: "collapse" }}
      >
        {/* Header */}
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
              Grade
            </th>
            <th className="p-sortable-column border-r border-l border-t">
              Ancienneté
            </th>
            <th className="p-sortable-column border-r border-l border-t">
              Grade
            </th>
            <th className="p-sortable-column border-r border-l border-t">
              {" "}
              date d'effet
            </th>
          </tr>
        </thead>
        {/* Body */}
        <tbody className="p-datatable-tbody">
          {employees.map((employee, index) => (
            <tr key={index}>
              <td className="border-r border-l">{employee.id}</td>
              <td className="border-r border-l">{employee.name}</td>
              <td className="border-r border-l">{employee.currentRank}</td>
              <td className="border-r border-l">{employee.currentDate}</td>
              <td className="border-r border-l">{employee.proposedRank}</td>
              <td className="border-r border-l">{employee.proposedDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};

export default HistoriqueProfesseurs;
