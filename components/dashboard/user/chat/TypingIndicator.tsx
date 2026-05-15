import styles from "./TypingIndicator.module.css";

interface Props {
  visible: boolean;
}

export default function TypingIndicator({ visible }: Props) {
  if (!visible) {
    return null;
  }

  return (
    <div className={styles.typing}>
      <span></span>

      <span></span>

      <span></span>
    </div>
  );
}
