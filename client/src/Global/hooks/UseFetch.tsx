import { useState, useEffect } from "react";
import { ResType } from "../../Interfaces/res";

interface Params {
  services: <T>() => Promise<ResType<T>>;
}

const useFetch = <T,>({ services }: Params) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  const fetchData = async () => {
    setLoading(true);
    const res = await services<T[]>();
    setMsg(res.message);
    setData(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, msg, fetchData };
};

export default useFetch;
