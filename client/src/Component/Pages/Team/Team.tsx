import React, { useState } from "react";
import BtnBasic from "../../../Global/components/BtnBasic";
import UseModal from "../../../Global/hooks/useModal";

import FormTeam from "./Components/FormTeam";
import { TeamResType } from "./Res/TeamRes";
import { getTeams } from "../../../Shared/Services/Team";
import useFetch from "../../../Global/hooks/UseFetch";
import toast, { Toaster } from "react-hot-toast";
import { deleteTeam } from "./Services/team";
import TableComponent from "../../../Global/components/Table";

const Amazon = () => {
  const { handleOpenModal, ShowModalJSX, handleCloseModal } = UseModal();
  const [team, setTeam] = useState({} as TeamResType);

  const handleCreateTeam = () => {
    setTeam({} as TeamResType);
    handleOpenModal();
  };

  //fetch

  const handleEdit = (team: TeamResType) => {
    setTeam(team);
    handleOpenModal();
  };

  const { data: teams, fetchData: getDataTeams } = useFetch<TeamResType>({
    services: getTeams,
  });

  //delete
  const handleDelete = async (id: number) => {
    console.log(id);
    const res = await deleteTeam(id);
    if (res.status == 200) {
      toast.success(res.message, { duration: 3000 });
      await getDataTeams();
    } else {
      toast.error(res.message, { duration: 3000 });
    }
  };

  const columnsTable = ["Nombre", "Division"];

  const bodyTableJSX = () => {
    return teams.map((v) => (
      <tr>
        <td>{v.name}</td>
        <td>{v.division.name}</td>

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
            Eliminar
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <>
      <BtnBasic onClick={handleCreateTeam} txt="Crear datos" />

      {ShowModalJSX(
        <>
          <FormTeam
            handleCloseModal={handleCloseModal}
            team={team}
            getDataTeams={getDataTeams}
          />
        </>
      )}

      <TableComponent columnsTable={columnsTable} bodyTableJSX={bodyTableJSX} />

      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default Amazon;
