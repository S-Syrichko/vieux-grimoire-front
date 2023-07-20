import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { setCookie } from "typescript-cookie";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleLogout = () => {
    setCookie("token", "", { expires: 0 });
    queryClient.setQueryData("userId", null);
    navigate("/auth");
  };

  return { handleLogout };
};
