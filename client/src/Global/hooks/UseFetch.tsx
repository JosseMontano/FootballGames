import { useState, useEffect } from "react";
import { ResType } from "../../Interfaces/res";

interface Params {
  services: <T>(id?:number) => Promise<ResType<T>>;
  id?: number;
}

const useFetch = <T,>({ services,id }: Params) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  const fetchData = async () => {
    setLoading(true);
    let res;
    if(id){
      res = await services<T[]>(id);
    }else{
      res = await services<T[]>();
    }
    setMsg(res.message);
    setData(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return { data, loading, msg, fetchData };
};

export default useFetch;
