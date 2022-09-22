import React from "react";
import Cell from "../Cell/Cell";
import styles from "./TableRow.module.css";
import useChartStore from "../../store/useChartStore";
type TableRowProps = {
  index: number;
  data: {
    x: string;
    y: number;
  };
};
function TableRow({ index, data }: TableRowProps) {
  const changeX = useChartStore((state) => state.changeDataX);
  const changeY = useChartStore((state) => state.changeDataY);

  return (
    <tr className={styles.gridContainer}>
      <td className={`${styles.index} ${index === 0 && styles.noBorder}`}>
        {index + 1}
      </td>
      <Cell index={index} onChange={changeX} data={data.x} />
      <Cell index={index} onChange={changeY} data={data.y} />
    </tr>
  );
}

export default TableRow;
