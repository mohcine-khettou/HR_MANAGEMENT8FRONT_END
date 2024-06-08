import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";
import { getUserGradeHistory as getUserGradeHistoryApi } from "../../api/users";
import { useUserContext } from "../../context";
import moment from "moment";

const UpgradeHistory = () => {
  const [history, setHistory] = useState([]);
  const {
    user: { doti },
  } = useUserContext();
  const fillHistory = async () => {
    const { data, error } = await getUserGradeHistoryApi(doti);
    if (error) {
      // handle error
      return;
    }
    const newData = data.map((line, index) => {
      const isGradeChanged =
        data[index - 1] && line.grade !== data[index - 1].grade;
      return {
        post: {
          value: line.post,
          changed:
            !isGradeChanged &&
            data[index - 1] &&
            line.grade !== data[index - 1].grade,
        },
        grade: {
          value: line.grade,
          changed: isGradeChanged,
        },
        echelon: {
          value: line.echlon,
          changed:
            !isGradeChanged &&
            data[index - 1] &&
            line.echlon !== data[index - 1].echlon,
        },
        date: {
          value: moment(line.dateEffect).format("DD/MM/YYYY"),
          changed: false,
        },
      };
    });
    newData.reverse();
    console.log("====================================");
    console.log(newData);
    console.log("====================================");
    setHistory(newData);
  };
  const bodyTemplate = (column) => {
    return (
      <span className={`${column.changed ? "text-primary" : ""}`}>
        {column.value}
      </span>
    );
  };

  useEffect(() => {
    fillHistory();
  }, []);
  return (
    <Card className="p-0">
      <div className="border-b border-b-[#dbe0e5] px-4 pb-5 pt-3 font-medium">
        Historique de gradation
      </div>
      <div className="text-center">
        <DataTable value={history}>
          <Column
            field="grade"
            body={(rowData) => bodyTemplate(rowData.grade)}
            header="grade"
            className="text-center"
          ></Column>
          <Column
            field="post"
            body={(rowData) => bodyTemplate(rowData.post)}
            header="poste"
            className="text-center"
          ></Column>
          <Column
            field="echelon"
            body={(rowData) => bodyTemplate(rowData.echelon)}
            header="echelon"
            className="text-center"
          />
          <Column
            field="date"
            body={(rowData) => bodyTemplate(rowData.date)}
            header="date d'effet"
            className="text-center"
          />
        </DataTable>
      </div>
    </Card>
  );
};

export default UpgradeHistory;
