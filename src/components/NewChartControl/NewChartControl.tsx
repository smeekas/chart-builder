import React, {
  ChangeEventHandler,
} from "react";
import styles from "./NewChartControl.module.css";
import InputBox from "../InputBox/InputBox";
import Table from "../Table/Table";
import useChartStore from "../../store/useChartStore";
import ColorPicker from "../ColorPicker/ColorPicker";
import RadioButtonGroup from "../RadioButtonGroup/RadioButtonGroup";
import type { RadioButtonData } from "../RadioButtonGroup/RadioButtonGroup";
import DebounceThisEvent from "../../utils/debounce";
import Button from "../Button/Button";
import { Switch } from "antd";

function NewChartControl() {

  const legendPos: RadioButtonData = {
    dataArr: ["Top", "Bottom", "Left", "Right"],
    groupName: "Legend Pos",
  };

  const grid = useChartStore(state => state.grid)
  const line = useChartStore(state => state.line)
  const changeLine = useChartStore(state => state.setLine)

  const bar = useChartStore(state => state.bar)
  const changeBar = useChartStore(state => state.setBar)

  const lineColor = useChartStore(state => state.lineColor)
  const changeLineColor = useChartStore(state => state.setLineColor)
  const debouncedChangeLineColor = DebounceThisEvent(changeLineColor)
  const changeGrid = useChartStore(state => state.changeGrid)
  const changeTitle = useChartStore((state) => state.changeTitle);
  const backgroundColor = useChartStore(state => state.backgroundColor)
  const title = useChartStore((state) => state.title);

  const gridColor = useChartStore(state => state.gridColor)
  const changeGridColor = useChartStore(state => state.changeGridColor)
  const debouncedChangeGridColor = DebounceThisEvent(changeGridColor)


  const changeChartColor = useChartStore((state) => state.changeChartColor);
  const debouncedChangeChartColor = DebounceThisEvent(changeChartColor);
  const changeBackgroundColor = useChartStore(state => state.changeBackgroundColor)
  const debouncedBackgroundColor = DebounceThisEvent(changeBackgroundColor)
  const chartColor = useChartStore((state) => state.chartColor);
  const selectedLegendPos = useChartStore((state) => state.legendPos);
  const changeLegendPos = useChartStore((state) => state.changeLegendPos);

  const legendChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    changeTitle(e.target.value);
  };


  const setDownload = useChartStore(state => state.setDownload)
  const chartColorChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    debouncedChangeChartColor(e.target.value);
  };
  const backgroundColorChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    debouncedBackgroundColor(e.target.value);
  };
  const gridColorChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    debouncedChangeGridColor(e.target.value)
  }
  const lineColorChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    debouncedChangeLineColor(e.target.value)
  }
  return (
    <div className={styles.container}>
      <div>
        <Table />
      </div>
      <div>
        <InputBox
          value={title}
          labelName="Legend"
          onChange={legendChangeHandler}
        />
        <RadioButtonGroup
          selectedPos={selectedLegendPos}
          onChange={changeLegendPos}
          radioGroupName="Legend Position"
          radioButtonData={legendPos}
        />
      </div>
      <div>
        <ColorPicker
          labelName="Chart Color "
          onChange={chartColorChangeHandler}
          selectedColor={chartColor}
        />
        <ColorPicker
          labelName="Line Color "
          onChange={lineColorChangeHandler}
          selectedColor={lineColor}
        />
        <ColorPicker
          labelName="Background Color "
          onChange={backgroundColorChangeHandler}
          selectedColor={backgroundColor}
        />
        <div className={styles.switch}>
          grid
          <Switch onChange={() => changeGrid()} checked={grid} />
        </div>
        <div className={styles.switch}>
        line
        <Switch onChange={() => changeLine()} checked={line} />

        </div>
        <ColorPicker
          labelName="Grid Color"
          onChange={gridColorChangeHandler}
          selectedColor={gridColor}
        />
      </div>
      <div className={styles.downloadButton}>
        <Button colorHex="#1ea1dd" onClick={() => setDownload(true)}>
          Download Chart
        </Button>
      </div>
    </div>
  );
}

export default NewChartControl;
