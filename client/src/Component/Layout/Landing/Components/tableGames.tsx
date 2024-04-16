import React from "react";
import { filterGamesType } from "../Types/filterGames";
import { ChampeonRes } from "../../../Pages/Champeonship/Res/ChampeonRes";
import { TeamResType } from "../../../../Shared/Interfaces/Team";

type TableRowProps = {
  localteam: TeamResType;
  visitorteam: TeamResType;
  champeonship: ChampeonRes;
  BoliviaImg: string;
  filterGames: filterGamesType;
};

const TableGame: React.FC<TableRowProps> = ({
  localteam,
  visitorteam,
  champeonship,
  BoliviaImg,
  filterGames,
}) => (
  <tr>
    <td className="align-top w-64">
      <p className="p-1 rounded">{champeonship.name}</p>
    </td>

    <td className="align-top">
      <p className="p-1 rounded text-purple-700 text-center">
        {champeonship.type}
      </p>
    </td>

    <td className="align-top">
      <div className="flex items-center space-x-2">
        <img className="w-6 h-6 rounded-full" src={BoliviaImg} alt="" />
        <p>{localteam.name}</p>
      </div>
    </td>

    <td className="align-top">
      <p
        className={`bg-purple-300 p-2 rounded-lg text-purple-700 text-center font-bold ${
          filterGames == "lastGames" ? "w-12" : "w-32"
        }`}
      >
        {filterGames == "lastGames" ? "1-2" : champeonship.datestart}
      </p>
    </td>

    <td className="align-top">
      <div className="flex items-center space-x-2">
        <img className="w-6 h-6 rounded-full" src={BoliviaImg} alt="" />
        <p>{visitorteam.name}</p>
      </div>
    </td>

    <td className="align-top">
      <p className="bg-red-800 p-1 rounded text-red-500 text-center font-bold">
        {champeonship.dateend}
      </p>
    </td>
  </tr>
);

export default TableGame;
