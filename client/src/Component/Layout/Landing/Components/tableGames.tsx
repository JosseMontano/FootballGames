import React from "react";
import { filterGamesType } from "../Types/filterGames";
import { ChampeonRes } from "../../../Pages/Champeonship/Res/ChampeonRes";
import { TeamResType } from "../../../../Shared/Interfaces/Team";
import { GameRes } from "../../../Pages/Game/Res/GameRes";

type TableRowProps = {
  BoliviaImg: string;
  filterGames: filterGamesType;
  game: GameRes;
};

const TableGame: React.FC<TableRowProps> = ({
  BoliviaImg,
  filterGames,
  game,
}) => (
  <tr>
    <td className="align-top w-64">
      <p className="p-1 rounded">{game.champeonship.name}</p>
    </td>

    <td className="align-top">
      <p className="p-1 rounded text-purple-700 text-center">
        {game.champeonship.type}
      </p>
    </td>

    <td className="align-top">
      <div className="flex items-center space-x-2">
        <img className="w-6 h-6 rounded-full" src={BoliviaImg} alt="" />
        <p>{game.localteam.name}</p>
      </div>
    </td>

    <td className="align-top">
      <p
        className={`bg-purple-300 p-2 rounded-lg text-purple-700 text-center font-bold ${
          filterGames == "lastGames" ? "w-12" : "w-32"
        }`}
      >
        {filterGames == "lastGames"
          ? game.amountGoalsLocal + "-" + game.amountGoalsVisitor
          : game.champeonship.datestart}
      </p>
    </td>

    <td className="align-top">
      <div className="flex items-center space-x-2">
        <img className="w-6 h-6 rounded-full" src={BoliviaImg} alt="" />
        <p>{game.visitorteam.name}</p>
      </div>
    </td>

    <td className="align-top">
      <p className="bg-red-800 p-1 rounded text-red-500 text-center font-bold">
        {game.champeonship.dateend}
      </p>
    </td>
  </tr>
);

export default TableGame;
