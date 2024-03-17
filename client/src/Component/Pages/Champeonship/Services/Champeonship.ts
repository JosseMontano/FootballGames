import {
  deleteData,
  getData,
  postData,
  putData,
} from "../../../../Helpers/Fetch";
import { ChampeonRes } from "../Res/ChampeonRes";

export const url = "championship";

export const getChampeons = async <T>() => {
  const res = await getData<T>(url);
  return res;
};

export const PostChampeon = async <T>(dataPost: T) => {
  const res = await postData<T, ChampeonRes>(url, dataPost);
  return res;
};

export const PutChampeon = async <T>(dataPost: T, id: number) => {
  const res = await putData<T, ChampeonRes>(url + `/${id}`, dataPost);
  return res;
};

export const deleteChampeon = async <T>(id: number) => {
  const res = await deleteData<T>(`${url}/${id}`);
  return res;
};
