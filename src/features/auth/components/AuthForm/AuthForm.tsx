import { LoadingOutlined } from "@ant-design/icons";
import { Alert, Space, Spin } from "antd";
import useAuthMutation from "../../../../lib/hooks/useAuthMutation";
import styles from "../../../../styles/layouts/Form.module.scss";
const AuthForm = () => {
  const {
    loginMutation,
    signupMutation,
    alertMessage,
    alertType,
    handleLogin,
    handleSignup,
  } = useAuthMutation();

  const antIcon = (
    <LoadingOutlined style={{ fontSize: 20, color: "#fff" }} spin />
  );

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const submitButton = (e as any).nativeEvent.submitter as HTMLButtonElement;

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (submitButton.name === "login") {
      handleLogin(email, password);
    } else if (submitButton.name === "signup") {
      handleSignup(email, password);
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
        <Space direction="vertical" style={{ width: "70%" }}>
          {alertMessage && (
            <Alert message={alertMessage} type={alertType || "info"} showIcon />
          )}
        </Space>
        <div className={styles.actionContainer}>
          <button type="submit" name="login">
            {loginMutation.isLoading ? (
              <Spin indicator={antIcon} />
            ) : (
              "Se connecter"
            )}
          </button>
          <p>ou</p>
          <button type="submit" name="signup">
            {signupMutation.isLoading ? (
              <Spin indicator={antIcon} />
            ) : (
              "S'inscrire"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
