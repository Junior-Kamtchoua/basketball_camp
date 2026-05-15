import styles from "./Input.module.css";

interface Props {
  type?: string;

  placeholder?: string;

  value: string;

  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  type = "text",
  placeholder,
  value,
  onChange,
}: Props) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={styles.input}
    />
  );
}
