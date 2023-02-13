import React, {
  ChangeEvent,
  ChangeEventHandler,
  FocusEventHandler,
  FormEvent,
  FormEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
} from "react";
import useChartStore from "../../store/useChartStore";
import DebouncThisEvent from "../../utils/debounce";
import styles from "./Cell.module.css";
type CellPropsType = {
  data: string | number;
  index: number;
  onChange: (index: number, updatedVal: any) => void;
};
function Cell({ data, index, onChange }: CellPropsType) {
  let NanVar = false;
  if (typeof data === "number") {
    NanVar = isNaN(data);
  }
  const changeHandler: FocusEventHandler<HTMLTableCellElement> = (e) => {
    if (e.currentTarget.innerText.trim().length !== 0) {
      onChange(index, e.currentTarget.innerText);
    }
  };
  return (
    <td
      suppressContentEditableWarning={true}
      contentEditable={true}
      onBlur={changeHandler}
      className={styles.cell}
    >
      {!NanVar ? data : ""}
    </td>
  );
}

export default Cell;

/**
 * <input className={styles.inputInsideCell}type="text"/>
 *
 * / */
