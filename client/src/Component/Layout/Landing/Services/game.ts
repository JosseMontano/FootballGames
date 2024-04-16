import { getData } from "../../../../Helpers/Fetch";

export const url = "Game";

export const getPastGames = async <T>() => {
  const res = await getData<T>(url+"/past-date");
  return res;
};

export const getFutureGames = async <T>() => {
  const res = await getData<T>(url+"/future-date");
  return res;
};
