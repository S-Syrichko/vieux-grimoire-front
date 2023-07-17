import styles from "../../../../styles/layouts/Form.module.scss";

const AuthForm = () => {
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const submitButton = (e as any).nativeEvent.submitter as HTMLButtonElement;
    const email = formData.get("email")
    const password = formData.get("password")

    if (submitButton.name === "login") {
      console.log("Logging in with email:", email, "and password:", password);
    } else if (submitButton.name === "signup") {
      console.log("Signing up with email:", email, "and password:", password);
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
          <button type="submit" name="login">Se connecter</button>
          <p>ou</p>
          <button type="submit" name="signup">S'inscrire</button>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
