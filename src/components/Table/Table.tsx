import React, { useRef, useState } from "react";
import Cell from "../Cell/Cell";
import TableRow from "../TableRow/TableRow";
import styles from "./Table.module.css";
import useChartStore from "../../store/useChartStore";
import { BsTrashFill } from "react-icons/bs";
import { GiCancel } from "react-icons/gi";
import Button from "../Button/Button";
function Table() {
  const rowNumberRef = useRef<HTMLInputElement>(null);
  const addRow = useChartStore((state) => state.addRow);
  const data = useChartStore((state) => state.data);
  const deleteRowHandler = useChartStore((state) => state.deleteRowHandler);
  const [isDeleting, setIsDeleting] = useState(false);
  const deleteButtonClickHandler = () => {
    if (isDeleting) {
      const value = rowNumberRef.current?.value;
      if (value && value?.length !== 0) {
        deleteRowHandler(+value);
      }
    } else {
      setIsDeleting(true);
    }
  };
  const cancelButtonClickHandler = () => {
    setIsDeleting(false);
  };
  return (
    <>
      <div className={styles.tableContainer}>
        <table>
          <thead>
            <tr className={styles.gridContainer}>
              <td></td>
              <th>X</th>
              <th>Y</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              return <TableRow key={index} index={index} data={item} />;
            })}
          </tbody>
        </table>
      </div>
      <div className={styles.tableControl}>
        <Button colorHex="#1ea1dd" onClick={() => addRow()}>
          Add Row
        </Button>
        {/* <button onClick={() => addRow()}>Add Row</button> */}
        {!isDeleting && (
          <Button colorHex="#ff0000" onClick={deleteButtonClickHandler}>
            Delete Row
          </Button>
        )}
        {isDeleting && (
          <div>
            <span>
              Row No:{" "}
              <input
                ref={rowNumberRef}
                className={styles.deleteInput}
                type="number"
              />
            </span>
            <Button
              className={styles.icons}
              colorHex="#ff0000"
              onClick={deleteButtonClickHandler}
            >
              <BsTrashFill />
            </Button>
            <Button
              className={styles.icons}
              colorHex="#00ff00"
              onClick={cancelButtonClickHandler}
            >
              <GiCancel />
            </Button>
          </div>
        )}
      </div>
    </>
  );
}

export default Table;
