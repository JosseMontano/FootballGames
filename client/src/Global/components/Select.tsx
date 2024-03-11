import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface Props {
  error: FieldError | undefined;
  register: UseFormRegisterReturn;
  label: string;
  showJSX: () => JSX.Element[];
}

const SelectComp = ({ error, label, register, showJSX }: Props) => {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {label}
      </label>
      <select
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        {...register}
      >
        {/* Add your options here */}
        <option value="">Select...</option>
        {showJSX()}
      </select>
      {error && <p className="text-red-600">{error.message}</p>}
    </div>
  );
};

export default SelectComp;
