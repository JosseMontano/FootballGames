import { getData } from "../../Helpers/Fetch";


export const getTeams = async <T>() => {
  const res = await getData<T>("team");
  return res;
};

