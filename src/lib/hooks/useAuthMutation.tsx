import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setCookie } from "typescript-cookie";
import { loginAPI, signupAPI } from "../../app/api";
import { handleServerError } from "../utils/functions";
import useGlobalStore from "./useGlobalStore";

export const useAuthMutation = () => {
  const navigate = useNavigate();
  const { updateUserId } = useGlobalStore();
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"error" | "success" | null>(null);

  const loginMutation = useMutation({
    mutationFn: loginAPI,
    onError: (error) => {
      setAlertMessage(handleServerError(error));
      setAlertType("error");
    },
    onSuccess: (data) => {
      setCookie("token", data?.token, { expires: 1 });
      updateUserId(data.userId);
      navigate("/");
    }
  });

  const signupMutation = useMutation({
    mutationFn: signupAPI,
    onError: (error) => {
      setAlertMessage(handleServerError(error));
      setAlertType("error");
    },
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
