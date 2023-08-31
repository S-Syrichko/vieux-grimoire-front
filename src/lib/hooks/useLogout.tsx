import { useNavigate } from "react-router-dom";
import { setCookie } from "typescript-cookie";

export const useLogout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setCookie("token", "", { expires: 0 });
    localStorage.removeItem("userId");
    navigate("/auth");
  };

  return { handleLogout };
};
