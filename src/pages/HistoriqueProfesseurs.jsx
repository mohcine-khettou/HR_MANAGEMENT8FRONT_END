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
            <th className="p-sortable-column" rowSpan="2">
              رقم التاجر
            </th>
            <th className="p-sortable-column" rowSpan="2">
              الاسم الكامل
            </th>
            <th className="p-sortable-column" colSpan="3">
              الوضعية الحالية
            </th>
            <th className="p-sortable-column" colSpan="3">
              الوضعية المقترحة
            </th>
          </tr>
          <tr>
            <th className="p-sortable-column">الرتبة</th>
            <th className="p-sortable-column">الرقم الاستدلالي</th>
            <th className="p-sortable-column">الأقدمية</th>
            <th className="p-sortable-column">الرتبة</th>
            <th className="p-sortable-column">الرقم الاستدلالي</th>
            <th className="p-sortable-column">تاريخ المفعول</th>
          </tr>
        </thead>
        {/* Body */}
        <tbody className="p-datatable-tbody">
          {employees.map((employee, index) => (
            <tr key={index}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.currentRank}</td>
              <td>{employee.currentCode}</td>
              <td>{employee.currentDate}</td>
              <td>{employee.proposedRank}</td>
              <td>{employee.proposedCode}</td>
              <td>{employee.proposedDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};

export default HistoriqueProfesseurs;
