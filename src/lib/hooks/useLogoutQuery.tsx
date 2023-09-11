import { useNavigate } from "react-router-dom";
import { setCookie } from "typescript-cookie";
import useGlobalStore from "./useGlobalStore";

export const useLogoutQuery = () => {
  const navigate = useNavigate();
  const { updateUserId } = useGlobalStore();

  const handleLogout = () => {
    setCookie("token", "", { expires: 0 });
    updateUserId(null);
    navigate("/auth");
  };

  return { handleLogout };
};
