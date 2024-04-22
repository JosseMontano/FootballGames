import { deleteData, getData, postData, putData } from "../../../../Helpers/Fetch";
import { DivisionResType } from "../Types/DivisionsRes";

const url = "teamDivisions";

export const getDivisions = async <T>() => {
    const res = await getData<T>(url);
    return res;
  };
  

export const PostDivision = async <T>(dataPost: T) => {
  const res= await postData<T, DivisionResType>(url, dataPost);
  return res;
};

export const PutDivision = async <T>(dataPost: T, id:number) => {
  const res= await putData<T, DivisionResType>(url+`/${id}`, dataPost);
  return res;
};

export const deleteDivision = async <T>(id: number) => {
  const res = await deleteData<T>(`${url}/${id}`);
  return res;
}