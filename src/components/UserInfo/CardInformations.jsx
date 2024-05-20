import moment from "moment/moment";
import { Card } from "primereact/card";

const CardInformations = ({ title, data, fields }) => {
  const renderItem = (fieldName) => {
    return fieldName.startsWith("date")
      ? moment(data[fieldName]).format("DD/MM/YYYY")
      : data[fieldName];
  };
  const renderLabel = (label) => {
    return label.charAt(0).toUpperCase() + label.slice(1);
  };
  return (
    <Card className="p-0">
      <div className="border-b border-b-[#dbe0e5] px-4 pb-5 pt-3 font-medium">
        {title}
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
    </Card>
  );
};

export default CardInformations;
