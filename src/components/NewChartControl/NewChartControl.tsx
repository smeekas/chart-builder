import React, {
  ChangeEventHandler,
  FocusEventHandler,
  useCallback,
  useState,
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

function NewChartControl() {
  const [data, setData] = useState([
    [{ value: "Vanilla" }, { value: "Chocolate" }],
    [{ value: "Strawberry" }, { value: "Cookies" }],
  ]);
  const titlePos: RadioButtonData = {
    dataArr: ["Top", "Bottom", "Left", "Right"],
    groupName: "Title Pos",
  };
  const legendPos: RadioButtonData = {
    dataArr: ["Top", "Bottom", "Left", "Right"],
    groupName: "Legend Pos",
  };
  const changeTitle = useChartStore((state) => state.changeTitle);
  const changeLegend = useChartStore((state) => state.changeLegend);
  const title = useChartStore((state) => state.title);
  const legendName = useChartStore((state) => state.legendName);
  const changeTitleColor = useChartStore((state) => state.changeTitleColor);
  const debouncedChangeTitleColor = DebounceThisEvent(changeTitleColor);

  const changeLegendColor = useChartStore((state) => state.changeLegendColor);
  const debouncedChangeLegendColor = DebounceThisEvent(changeLegendColor);

  const changeChartColor = useChartStore((state) => state.changeChartColor);
  const debouncedChangeChartColor = DebounceThisEvent(changeChartColor);

  // const changeBackgroundColor = useChartStore((state) => state.changeBackgroundColor);
  // const debouncedChangeBackgroundColor = DebounceThisEvent(changeBackgroundColor);

  const titleColor = useChartStore((state) => state.titleColor);
  const legendColor = useChartStore((state) => state.legendColor);
  const chartColor = useChartStore((state) => state.chartColor);
  // const backgroundColor = useChartStore((state) => state.backgroundColor);
  const chartRef = useChartStore((state) => state.chartRef);
  const selectedTitlePos = useChartStore((state) => state.titlePos);
  const changeTitlePos = useChartStore((state) => state.changeTitlePos);
  const selectedLegendPos = useChartStore((state) => state.legendPos);
  const changeLegendPos = useChartStore((state) => state.changeLegendPos);
  const titleChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    changeTitle(e.target.value);
  };
  const legendChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    changeLegend(e.target.value);
  };
  const titleColorChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    // console.log(e.target.value);
    debouncedChangeTitleColor(e.target.value);
  };
  // console.log("HERE");
  const legendColorChangeHandler: ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    debouncedChangeLegendColor(e.target.value);
  };

  const chartColorChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    debouncedChangeChartColor(e.target.value);
  };
  // const backgroundColorChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
  //   debouncedChangeBackgroundColor(e.target.value);
  // };
  const titlePosition = () => {
    console.log("clicked!");
  };
  const downloadHandler = () => {
    const anchor = document.createElement("a");
    if (chartRef?.current) {
      anchor.href = chartRef?.current?.toBase64Image();
      anchor.download = "chart.png";
      anchor.click();
    }
  };
  return (
    <div className={styles.container}>
      <div>
        <Table />
      </div>
      <div className={styles.box}>
        <InputBox
          value={title}
          labelName="Title"
          onChange={titleChangeHandler}
        />
        <ColorPicker
          labelName="Title Color "
          selectedColor={titleColor}
          onChange={titleColorChangeHandler}
        />
        <RadioButtonGroup
          selectedPos={selectedTitlePos}
          onChange={changeTitlePos}
          radioGroupName="Title Position"
          radioButtonData={titlePos}
        />
      </div>
      <div>
        <InputBox
          value={legendName}
          labelName="Legend"
          onChange={legendChangeHandler}
        />
        <ColorPicker
          labelName="Legend Color "
          selectedColor={legendColor}
          onChange={legendColorChangeHandler}
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
        {/* <ColorPicker
          labelName="Background Color "
          onChange={backgroundColorChangeHandler}
          selectedColor={backgroundColor}
        /> */}
      </div>
      <div className={styles.downloadButton}>
        <Button colorHex="#1ea1dd" onClick={downloadHandler}>
          Download Chart
        </Button>
        {/* <button onClick={downloadHandler}>download</button> */}
      </div>
    </div>
  );
}

export default NewChartControl;
