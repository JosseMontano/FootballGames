import { deleteData, getData, postData, putData } from "../../../../Helpers/Fetch";
import { GameRes } from "../Res/GameRes";


export const url = "Game";


export const getGames = async <T>() => {
  const res = await getData<T>(url);
  return res;
};


export const PostGame = async <T>(dataPost: T) => {
  const res= await postData<T, GameRes>(url, dataPost);
  return res;
};

export const PostGameRandom = async <T>(dataPost: T) => {
  const res= await postData<T, GameRes>(url+'/Register-random-game', dataPost);
  return res;
};


export const PutGame = async <T>(dataPost: T, id:number) => {
  const res= await putData<T, GameRes>(url+`/${id}`, dataPost);
  return res;
};

export const deleteGame = async <T>(id: number) => {
  const res = await deleteData<T>(`${url}/${id}`);
  return res;
}