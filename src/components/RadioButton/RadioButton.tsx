import React from "react";
import { PositionType } from "../../store/useChartStore";
import styles from "./RadioButton.module.css";
interface RadioButtonPropsType {
  labelName: PositionType;
  groupName: string;
  onChange: (arg0: PositionType) => void;
  selected: boolean;
}
function isPosition(position: string): position is PositionType {
  // return true if string is of type PositionType
  return (position as PositionType) !== undefined;
}
function RadioButton({
  labelName,
  groupName,
  onChange,
  selected,
  ...props
}: RadioButtonPropsType) {
  const clickHandler: React.MouseEventHandler<HTMLDivElement> = (e) => {
    // const value = e.currentTarget.value;
    if (isPosition(labelName)) {
      onChange(labelName);
    }
  };
  return (
    <div
      className={`${styles.radioButton} ${selected && styles.selected}`}
      onClick={clickHandler}
    >
      {labelName}
      {/* <label htmlFor={labelName}>{labelName}</label> */}
      {/* <input
        onChange={changeHandler}
        id={`${labelName}-${groupName}`}
        checked={selected}
        type="radio"
        value={labelName}
        name={groupName}
      /> */}
    </div>
  );
}

export default RadioButton;
