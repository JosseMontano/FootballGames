import { ResType } from "../Interfaces/res";
import { endPoint } from "../Config/http";

export const postData = async <T, R>(
  url: string,
  data: T
): Promise<ResType<R>> => {
  let status = 500;
  let msg = "Error Interno";
  let json = {} as R;

  try {
    const response = await fetch(endPoint + url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const res = await response.json();
    status = res.status;
    msg = res.message;
    json = res.data;
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
  }
  return {
    status: status,
    message: msg,
    data: json as R,
  };
};


export const getData = async <T>(
  url: string,
): Promise<ResType<T>> => {
  let status = 500;
  let msg = "Error Interno";
  let json = {} as T;

  try {
    const response = await fetch(endPoint + url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    });

    const res = await response.json();
    status = res.status;
    msg = res.message;
    json = res.data;

  } catch (error) {
    if (error instanceof Error) console.log(error.message);
  }
  return {
    status: status,
    message: msg,
    data: json as T,
  };
};


export const deleteData = async <T>(
  url: string,
): Promise<ResType<T>> => {
  let status = 500;
  let msg = "Error Interno";
  let json = {} as T;

  try {
    const response = await fetch(endPoint + url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    });

    const res = await response.json();
    status = res.status;
    msg = res.message;
    json = res.data;

  } catch (error) {
    if (error instanceof Error) console.log(error.message);
  }
  return {
    status: status,
    message: msg,
    data: json as T,
  };
};


export const putData = async <T, R>(
  url: string,
  data: T
): Promise<ResType<R>> => {
  let status = 500;
  let msg = "Error Interno";
  let json = {} as R;

  try {
    const response = await fetch(endPoint + url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const res = await response.json();
    status = res.status;
    msg = res.message;
    json = res.data;
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
  }
  return {
    status: status,
    message: msg,
    data: json as R,
  };
};