import { useState } from "react";
import UseModal from "../../../Global/hooks/useModal";
import { DivisionResType } from "./Types/DivisionsRes";
import useFetch from "../../../Global/hooks/UseFetch";
import { deleteDivision, getDivisions } from "./Services/Divisions";
import toast, { Toaster } from "react-hot-toast";
import BtnBasic from "../../../Global/components/BtnBasic";
import TableComponent from "../../../Global/components/Table";
import FormDivision from "./Components/FormDivision";

interface Props {}
const Divisions = ({}: Props) => {
  const { handleOpenModal, ShowModalJSX, handleCloseModal } = UseModal();
  const [division, setDivision] = useState({} as DivisionResType);

  const handleCreateDivision = () => {
    setDivision({} as DivisionResType);
    handleOpenModal();
  };

  const handleEdit = (division: DivisionResType) => {
    setDivision(division);
    handleOpenModal();
  };

  const { data: teams, fetchData: getDataTeams } = useFetch<DivisionResType>({
    services: getDivisions,
  });

  //delete
  const handleDelete = async (id: number) => {
    console.log(id);
    const res = await deleteDivision(id);
    if (res.status == 200) {
      toast.success(res.message, { duration: 3000 });
      await getDataTeams();
    } else {
      toast.error(res.message, { duration: 3000 });
    }
  };

  const columnsTable = ["Nombre"];

  const bodyTableJSX = () => {
    return teams.map((v) => (
      <tr>
        <td>{v.name}</td>

        <td className="px-6 py-4 whitespace-nowrap">
          <button
            className="text-blue-500 hover:text-blue-700"
            onClick={() => handleEdit(v)}
          >
            Editar
          </button>
          <button
            className="ml-4 text-red-500 hover:text-red-700"
            onClick={() => handleDelete(v.id)}
          >
            eliminar
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <>
      <BtnBasic onClick={handleCreateDivision} txt="Crear datos" />

      {ShowModalJSX(
        <>
          <FormDivision
            handleCloseModal={handleCloseModal}
            division={division}
            getDataTeams={getDataTeams}
          />
        </>
      )}

      <TableComponent columnsTable={columnsTable} bodyTableJSX={bodyTableJSX} />

      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default Divisions;
