import React, { ChangeEventHandler } from "react";
import styles from "./InputBox.module.css";
type InputBoxPropsType = {
  labelName: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  value:string
};
function InputBox({ labelName, onChange ,value}: InputBoxPropsType) {
  return (
    <div className={styles.inputBox}>
      <label className={styles.label}>{labelName}:</label>
      <input value={value} className={styles.input} type="text" onChange={onChange} />
    </div>
  );
}

export default InputBox;
