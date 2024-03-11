import { useNavigate } from "react-router-dom";

export const UseRouter = () => {
  const navigate = useNavigate();
  const redirect = (path: string) => {
    navigate(path);
  };

  return {
    redirect,
  };
};
