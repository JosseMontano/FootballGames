import { deleteData, getData, postData } from "../../../../Helpers/Fetch";
import { PlayerResType } from "../Res/PlayerRes";


export const url = "player";


export const getPlayers = async <T>() => {
  const res = await getData<T>(url);
  return res;
};


export const PostPlayer = async <T>(dataPost: T) => {
  const res= await postData<T, PlayerResType>(url, dataPost);
  return res;
};

export const deletePlayer = async <T>(id: number) => {
  const res = await deleteData<T>(`${url}/${id}`);
  return res;
}