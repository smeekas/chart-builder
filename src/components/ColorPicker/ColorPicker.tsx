import { ChildProcess } from "child_process";
import React, { ChangeEventHandler, FocusEventHandler, useState } from "react";
import DebouncThisEvent from "../../utils/debounce";
import styles from "./ColorPicker.module.css";
type ColorpickerTypes = {
  labelName: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  selectedColor: string;
};
function ColorPicker({
  labelName,
  onChange: changeHandler,
  selectedColor,
}: ColorpickerTypes) {

  return (
    <div className={styles.colorPicker}>
      <label>{labelName}</label>
      <input value={selectedColor} onChange={changeHandler} type="color" />
    </div>
  );
}

export default ColorPicker;
