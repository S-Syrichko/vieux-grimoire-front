import React from "react";
import styles from "./Button.module.scss";

export type ButtonProps = {
  type?: "submit" | "button" | "reset";
  name?: string;
  primary?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
};

const Button = ({ type="button", name, primary, disabled, onClick, children }: ButtonProps) => {
  return (
    <button className={`${primary ? styles.primary : styles.secondary}`} type={type} name={name} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
