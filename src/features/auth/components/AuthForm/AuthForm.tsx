import { useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { setCookie } from "typescript-cookie";
import { loginAPI, signupAPI } from "../../../../app/api";
import styles from "../../../../styles/layouts/Form.module.scss";

const AuthForm = () => {
  const loginQuery = useMutation(loginAPI, { mutationKey: "login" });
  const signupQuery = useMutation(signupAPI);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  useEffect(() => {
    if (loginQuery.isSuccess) {
      setCookie("token", loginQuery.data?.token, { expires: 1 });
      queryClient.setQueryData("userId", loginQuery.data?.userId);
      navigate("/");
    }
  }, [loginQuery.isSuccess, loginQuery.data, queryClient, navigate]);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const submitButton = (e as any).nativeEvent.submitter as HTMLButtonElement;

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (submitButton.name === "login") {
      loginQuery.mutate({ email, password });
    } else if (submitButton.name === "signup") {
      signupQuery.mutate({ email, password });
    }
  };

  return (
    <div className={styles.formContainer}>
      <form id="auth-form" onSubmit={handleFormSubmit}>
        <div className={styles.inputWrapper}>
          <label htmlFor="email">Adresse email</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor="password">Mot de passe</label>
          <input type="password" id="password" name="password" required />
        </div>
        <div className={styles.actionContainer}>
          <button type="submit" name="login">
            {loginQuery.isLoading ? "Loading" : "Se connecter"}
          </button>
          <p>ou</p>
          <button type="submit" name="signup">
            {signupQuery.isLoading ? "Loading" : "S'inscrire"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
