import React from "react";
import useChartStore, { PositionType } from "../../store/useChartStore";
import RadioButton from "../RadioButton/RadioButton";
import styles from "./RadioButtonGroup.module.css";
export type RadioButtonData = {
  dataArr: PositionType[];
  groupName: string;
};
type RadioButtonGroupPropsType = {
  radioButtonData: RadioButtonData;
  selectedPos: string;
  radioGroupName: string;
  onChange: (arg0: PositionType) => void;
};
function RadioButtonGroup({
  radioButtonData,
  onChange,
  selectedPos,
  radioGroupName,
  ...props
}: RadioButtonGroupPropsType) {
  /*
  const changeTitlePos = useChartStore((state) => state.changeTitlePos);
  const selectedPos = useChartStore((state) => state.titlePos);
*/
  const toggleHandler = (value: PositionType) => {
    onChange(value);
  };
  return (
    <div className={styles.radioButtonContainer}>
      <label className={styles.label}>{radioGroupName}</label>
      <div className={styles.radioGroup}>
        {radioButtonData.dataArr.map((item, index) => {
          return (
            <RadioButton
              key={index}
              selected={item === selectedPos}
              onChange={toggleHandler}
              groupName={radioButtonData.groupName}
              labelName={item}
            />
          );
        })}
      </div>
    </div>
  );
}

export default RadioButtonGroup;
