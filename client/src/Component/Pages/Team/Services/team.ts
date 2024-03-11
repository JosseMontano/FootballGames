import { deleteData, getData, postData, putData } from "../../../../Helpers/Fetch";
import { TeamResType } from "../Res/TeamRes";


export const url = "team";


export const PostTeam = async <T>(dataPost: T) => {
  const res= await postData<T, TeamResType>(url, dataPost);
  return res;
};

export const PutTeam = async <T>(dataPost: T, id:number) => {
  const res= await putData<T, TeamResType>(url+`/${id}`, dataPost);
  return res;
};

export const deleteTeam = async <T>(id: number) => {
  const res = await deleteData<T>(`${url}/${id}`);
  return res;
}