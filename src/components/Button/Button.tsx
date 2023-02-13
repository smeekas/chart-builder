import React from "react";
import styles from "./Button.module.css";
type ButtonPropsType = {
  className?: string;
  children: React.ReactNode | string;
  onClick?: () => void;
  colorHex: string;
};
function Button({ className, children, colorHex, ...props }: ButtonPropsType) {
  return (
    <button
      {...props}
      style={{ color: colorHex, border: `1px solid ${colorHex}` }}
      className={`${className} ${styles.button}`}
    >
      {children}
    </button>
  );
}

export default Button;
