import { postData } from "../../Helpers/Fetch";
import { LoginRes } from "../../Responses/login";

export const url = "auth/";

export const loginService = async <T>(dataPost: T) => {
  const res= await postData<T, LoginRes>("auth/login", dataPost);
  return res;
};
