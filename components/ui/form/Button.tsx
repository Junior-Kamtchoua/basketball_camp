import { ButtonHTMLAttributes } from "react";

import styles from "./Button.module.css";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function Button({ children, ...props }: Props) {
  return (
    <button {...props} className={styles.button}>
      {children}
    </button>
  );
}
