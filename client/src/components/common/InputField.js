import styles from './InputField.module.css';

const InputField = ({ label, type = "text", ...props }) => (
  <div className={styles.fieldWrapper}>
    {label && <label className={styles.label}>{label}</label>}
    <input 
      className={styles.input}
      type={type}
      {...props}
    />
  </div>
);
export default InputField;