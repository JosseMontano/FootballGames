import { ReactNode } from "react";

interface Props {
  bodyTableJSX(): ReactNode;
  columnsTable: string[];
  showOperations?: boolean;
}
const TableComponent = ({
  bodyTableJSX,
  columnsTable,
  showOperations = true,
}: Props) => {
  return (
    <table className="min-w-full divide-y divide-gray-200 my-3">
      <thead className="bg-gray-50">
        <tr>
          {columnsTable.map((column, index) => (
            <th
              key={index}
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {column}
            </th>
          ))}
          {showOperations && (
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Operaciones
            </th>
          )}
        </tr>
      </thead>

      <tbody className="bg-white divide-y divide-gray-200">
        {bodyTableJSX()}
      </tbody>
    </table>
  );
};

export default TableComponent;
