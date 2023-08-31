import { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { setCookie } from "typescript-cookie";
import { loginAPI, signupAPI } from "../../app/api";

export const useAuthMutation = () => {
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"error" | "success" | null>(null);

  const handleServerError = (error: any) => {
    if (error.response) {
      setAlertMessage(error.response.data.message);
    } else {
      setAlertMessage("Le serveur ne répond pas");
    }
    setAlertType("error");
  };

  const loginMutation = useMutation(loginAPI, {
    onError: (error: any) => handleServerError(error),
    onSuccess: (data) => {
      setCookie("token", data?.token, { expires: 1 });
      localStorage.setItem("userId", data.userId);
      navigate("/");
    },
  });

  const signupMutation = useMutation(signupAPI, {
    onError: (error: any) => handleServerError(error),
    onSuccess: () => {
      setAlertMessage("Compte créé. Vous pouvez maintenant vous connecter");
      setAlertType("success");
    },
  });

  const handleLogin = async (email: string, password: string) => {
    await loginMutation.mutateAsync({ email, password });
  };

  const handleSignup = async (email: string, password: string) => {
    await signupMutation.mutateAsync({ email, password });
  };

  return {
    loginMutation,
    signupMutation,
    alertMessage,
    alertType,
    handleLogin,
    handleSignup,
  };
};

export default useAuthMutation;
