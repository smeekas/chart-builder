import React, { useState } from "react";
import styles from "./ToolBar.module.css";
import DebouncThisEvent from "../../utils/debounce";
import NewChartControl from "../NewChartControl/NewChartControl";
function ToolBar() {
  return (
    <div className={styles.toolBar}>
      <NewChartControl />
    </div>
  );
}

export default ToolBar;
