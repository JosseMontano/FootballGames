import { getData } from "../../Helpers/Fetch";

const endpoint = "player/";

export const getPlayerToTeam = async <T>(id?: number) => {
    const res = await getData<T>(`${endpoint}teamId/${id}`);
    return res;
  };
  