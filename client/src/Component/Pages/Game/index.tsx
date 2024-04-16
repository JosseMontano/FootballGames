import { useForm } from "react-hook-form";
import UseModal from "../../../Global/hooks/useModal";
import { GameFormDto } from "./Dtos/Game";
import { deleteGame, getGames } from "./Services/game";
import useFetch from "../../../Global/hooks/UseFetch";
import { GameRes } from "./Res/GameRes";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import BtnBasic from "../../../Global/components/BtnBasic";
import FormGame from "./Components/FormGame";
import TableComponent from "../../../Global/components/Table";

const Game = () => {
  const { handleOpenModal, ShowModalJSX, handleCloseModal } = UseModal();

  //body table
  const { data: games, fetchData: getDataGames } = useFetch<GameRes>({
    services: getGames,
  });

  //delete
  const handleDelete = async (id: number) => {
    const res = await deleteGame(id);
    if (res.status == 200) {
      toast.success(res.message, { duration: 3000 });
      await getDataGames();
    } else {
      toast.error(res.message, { duration: 3000 });
    }
  };

  //edit
  const [game, setGame] = useState({} as GameRes);
  const handleEdit = (v: GameRes) => {
    setGame(v);
    handleOpenModal();
  };

  const columnsTable = [
    "Nombre del campeonato",
    "Cantidad de equipos",
    "Tipo del campeonato",
    "Fecha de inicio",
    "Fecha de fin",
    "Equipo local",
    "Equipo visitante",
    "Goles equipo local",
    "Goles equipo visitante",
  ];

  const bodyTableJSX = () => {
    return (
      games.length > 0 &&
      games.map((v) => (
        <tr>
          <td>{v.champeonship.name}</td>
          <td>{v.champeonship.amountteams}</td>
          <td>{v.champeonship.type}</td>
          <td>{v.champeonship.datestart}</td>
          <td>{v.champeonship.dateend}</td>
          <td>{v.localteam.name}</td>
          <td>{v.visitorteam.name}</td>
          <td>{v.amountGoalsLocal ? v.amountGoalsLocal : "No aplica"}</td>
          <td>{v.amountGoalsVisitor ? v.amountGoalsVisitor : "No aplica"}</td>
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
      ))
    );
  };

  const handleCreateGame = () => {
    setGame({} as GameRes);
    handleOpenModal();
  };

  return (
    <>
      <BtnBasic onClick={handleCreateGame} txt="Crear datos" />

      {ShowModalJSX(
        <>
          <FormGame
            handleCloseModal={handleCloseModal}
            game={game}
            getDataGames={getDataGames}
          />
        </>
      )}

      <TableComponent columnsTable={columnsTable} bodyTableJSX={bodyTableJSX} />

      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default Game;
