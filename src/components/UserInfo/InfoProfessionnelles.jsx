import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";
import { getUserGradeHistory as getUserGradeHistoryApi } from "../../api/users";
import { useUserContext } from "../../context";
import moment from "moment";

const InfoProfessionnelles = ({ data, fields }) => {
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
  const renderItem = (fieldName) => {
    return fieldName.startsWith("date")
      ? moment(data[fieldName]).format("DD/MM/YYYY")
      : data[fieldName];
  };
  const renderLabel = (label) => {
    return label.charAt(0).toUpperCase() + label.slice(1);
  };

  useEffect(() => {
    fillHistory();
  }, []);
  return (
    <Card className="p-0 capitalize">
      <div className="border-b border-b-[#dbe0e5] px-4 pb-5 pt-3 font-medium">
        Informations professionelles
      </div>
      <div className="px-5 flex justify-between flex-wrap">
        {fields?.map((field, index) => {
          let className = "flex flex-col flex-none w-1/2 py-4 text-sm";
          if (
            (index < data.length - 1 && data.length % 2 != 0) ||
            (data.length % 2 === 0 && index < data.length - 2)
          )
            className += " border-b border-b-[#dbe0e5]";
          return (
            <div key={field.name} className={className}>
              <span className="text-slate-600 mb-1">
                {renderLabel(field.label || field.name)}
              </span>
              <span>{renderItem(field.name)}</span>
            </div>
          );
        })}
      </div>
      <div className="text-center mt-4">
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

export default InfoProfessionnelles;
