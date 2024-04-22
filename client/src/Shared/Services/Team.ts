import { getData } from "../../Helpers/Fetch";

export const getTeams = async <T>() => {
  const res = await getData<T>("team");
  return res;
};

export const getTeamsWithoutChampeonship = async <T>(id?: number) => {
  console.log(id);
  const res = await getData<T>("game/GamesWithoutChampeonship/" + id)
  console.log(res);
  return res;
};
