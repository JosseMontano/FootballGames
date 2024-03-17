import { useState } from "react";
import BtnBasic from "../../../Global/components/BtnBasic";
import UseModal from "../../../Global/hooks/useModal";
import { ChampeonRes } from "./Res/ChampeonRes";
import useFetch from "../../../Global/hooks/UseFetch";
import { deleteChampeon, getChampeons } from "./Services/ChampeonShip";
import toast, { Toaster } from "react-hot-toast";
import FormChampeon from "./Components/formChampeon";
import TableComponent from "../../../Global/components/Table";

const Champeonship = () => {
  const { handleOpenModal, ShowModalJSX, handleCloseModal } = UseModal();
  const [champeon, setChampeon] = useState({} as ChampeonRes);

  const handleCreateChamepeon = () => {
    setChampeon({} as ChampeonRes);
    handleOpenModal();
  };

  const handleEdit = (val: ChampeonRes) => {
    setChampeon(val);
    handleOpenModal();
  };

  const { data: champeons, fetchData: getDataChampeons } =
    useFetch<ChampeonRes>({
      services: getChampeons,
    });

  //delete
  const handleDelete = async (id: number) => {
    const res = await deleteChampeon(id);
    if (res.status == 200) {
      toast.success(res.message, { duration: 3000 });
      await getDataChampeons();
    } else {
      toast.error(res.message, { duration: 3000 });
    }
  };

  const columnsTable = [
    "Nombre",
    "Cantidad de equipos",
    "Tipo",
    "Fecha de inicio",
    "Fecha de fin",
  ];

  const bodyTableJSX = () => {
    return champeons.map((v) => (
      <tr>
        <td>{v.name}</td>
        <td>{v.amountteams}</td>
        <td>{v.type}</td>
        <td>{v.datestart}</td>
        <td>{v.dateend}</td>

        <td className="px-6 py-4 whitespace-nowrap">
          <button
            className="text-blue-500 hover:text-blue-700"
            onClick={() => handleEdit(v)}
          >
            Edit
          </button>
          <button
            className="ml-4 text-red-500 hover:text-red-700"
            onClick={() => handleDelete(v.id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <>
      <BtnBasic onClick={handleCreateChamepeon} txt="Crear datos" />

      {ShowModalJSX(
        <>
          <FormChampeon
            handleCloseModal={handleCloseModal}
            champeon={champeon}
            getDataChampeon={getDataChampeons}
          />
        </>
      )}

      <TableComponent columnsTable={columnsTable} bodyTableJSX={bodyTableJSX} />

      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default Champeonship;
