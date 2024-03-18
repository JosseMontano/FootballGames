import UseModal from "../../../Global/hooks/useModal";
import Input from "../../../Global/components/Input";
import { set, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlayerFormDTO } from "./Dtos/PlayerForm";
import FormComponent from "../../../Global/components/Form";
import { PlayerFormSchema } from "./Validations/FormPlayer";
import BtnForm from "../../../Global/components/BtnForm";
import SelectComp from "../../../Global/components/Select";
import BtnBasic from "../../../Global/components/BtnBasic";
import { TeamResType } from "../../../Shared/Interfaces/Team";
import useFetch from "../../../Global/hooks/UseFetch";
import { getTeams } from "../../../Shared/Services/Team";
import { PostPlayer, deletePlayer, getPlayers } from "./Services/player";
import { Toaster, toast } from "react-hot-toast";
import BtnLoader from "../../../Global/components/BtnLoader";
import { ReactNode, useState } from "react";
import TableComponent from "../../../Global/components/Table";
import { PlayerResType } from "./Res/PlayerRes";
import FormPlayer from "./Components/FormPlayer";

const Player = () => {
  const { handleOpenModal, ShowModalJSX, handleCloseModal } = UseModal();



  //table

  //body table
  const { data: players, fetchData: getDataPlayers } = useFetch<PlayerResType>({
    services: getPlayers,
  });

  //delete
  const handleDelete = async (id: number) => {
    console.log(id);
    const res = await deletePlayer(id);
    if (res.status == 200) {
      toast.success(res.message, { duration: 3000 });
      await getDataPlayers();
    } else {
      toast.error(res.message, { duration: 3000 });
    }
  };

  //edit
  const [player, setPlayer] = useState({} as PlayerResType);
  const handleEdit = (player: PlayerResType) => {
    console.log(player);
    setPlayer(player);
    handleOpenModal();
  };

  const columnsTable = [
    "CI",
    "Nombres",
    "Apellidos",
    "Fecha de nacimiento",
    "Celular",
    "Edad",
    "Equipo",
  ];

  const bodyTableJSX = () => {
    return players.map((player) => (
      <tr>
        <td>{player.ci}</td>
        <td>{player.names}</td>
        <td>{player.lastnames}</td>
        <td>{player.date}</td>
        <td>{player.cellphone}</td>
        <td>{player.age}</td>
        <td>{player.team.name}</td>
        <td className="px-6 py-4 whitespace-nowrap">
          <button
            className="text-blue-500 hover:text-blue-700"
            onClick={() => handleEdit(player)}
          >
            Edit
          </button>
          <button
            className="ml-4 text-red-500 hover:text-red-700"
            onClick={() => handleDelete(player.id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ));
  };

  const handleCreatePlayer = () => {
    setPlayer({} as PlayerResType);
    handleOpenModal();
  };

  return (
    <>
      <BtnBasic onClick={handleCreatePlayer} txt="Crear datos" />

      {ShowModalJSX(
        <>
          <FormPlayer
            handleCloseModal={handleCloseModal}
            player={player}
            getDataPlayers={getDataPlayers}
          />
        </>
      )}

      <TableComponent columnsTable={columnsTable} bodyTableJSX={bodyTableJSX} />

      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default Player;
