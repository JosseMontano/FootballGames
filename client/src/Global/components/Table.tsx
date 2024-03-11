import { ReactNode } from "react";

interface Props {
  bodyTableJSX(): ReactNode;
  columnsTable: string[];
}
const TableComponent = ({
  bodyTableJSX,
  columnsTable,
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
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Operations
          </th>
        </tr>
      </thead>

      <tbody className="bg-white divide-y divide-gray-200">
        {bodyTableJSX()}
      </tbody>
    </table>
  );
};

export default TableComponent;
