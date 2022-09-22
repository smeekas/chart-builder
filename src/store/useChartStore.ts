import create from "zustand";
import { Chart as ChartJS } from "chart.js";
import React from "react";
type DataType = {
  x: string;
  y: number;
};
export type PositionType = "Top" | "Bottom" | "Right" | "Left";
interface ChartStoreTypes {
  data: DataType[];
  title: string;
  titleColor: string;
  legendName: string;
  legendColor: string;
  titlePos: PositionType;
  legendPos: PositionType;
  chartColor: string;
  backgroundColor: string;
  chartRef: React.RefObject<ChartJS<"bar">> | null;

  // chartColor:string
  changeTitle: (newTitle: string) => void;
  changeTitleColor: (newTitleColor: string) => void;
  changeLegend: (newLegend: string) => void;
  changeLegendColor: (newLegendColor: string) => void;
  addRow: () => void;
  changeDataX: (index: number, updatedVal: string) => void;
  changeDataY: (index: number, updatedVal: number) => void;
  changeTitlePos: (newTitlePos: PositionType) => void;
  changeLegendPos: (newLegendPos: PositionType) => void;
  changeChartColor: (newChartColor: string) => void;
  changeBackgroundColor: (newBackgroundColor: string) => void;
  deleteRowHandler: (rowNumber: number) => void;
  addRef: (ref: React.RefObject<ChartJS<"bar">>) => void;
}

const useChartStore = create<ChartStoreTypes>()((set) => ({
  data: [
    {
      x: "",
      y: NaN,
    },
  ],
  chartRef: null,
  addRef: (chartRef) =>
    set((state) => {
      return {
        chartRef: chartRef,
      };
    }),
  title: "Bar Chart",
  changeTitle: (newTitle) =>
    set((state) => {
      return {
        title: newTitle,
      };
    }),
  titleColor: "#656565",
  changeTitleColor: (newTitleColor: string) =>
    set((state) => {
      return {
        titleColor: newTitleColor,
      };
    }),
  legendName: "Dataset",
  changeLegend: (newLegend) =>
    set((state) => {
      return {
        legendName: newLegend,
      };
    }),
  legendColor: "#656565",
  changeLegendColor: (newLegendColor) =>
    set((state) => {
      return {
        legendColor: newLegendColor,
      };
    }),
  titlePos: "Top",
  changeTitlePos: (newTitlePos) =>
    set((state) => {
      return {
        titlePos: newTitlePos,
      };
    }),
  legendPos: "Top",
  changeLegendPos: (newLegendPos) =>
    set((state) => {
      return {
        legendPos: newLegendPos,
      };
    }),
  addRow: () =>
    set((state) => {
      return {
        data: [
          ...state.data,
          {
            x: "",
            y: NaN,
          },
        ],
      };
    }),
  changeDataX: (index, updatedVal) =>
    set((state) => {
      const newData = [...state.data];
      console.log("x store");
      newData[index].x = updatedVal;
      return { data: newData };
    }),
  changeDataY: (index, updatedVal) =>
    set((state) => {
      const newData = [...state.data];
      console.log("y store");

      newData[index].y = updatedVal;
      return { data: newData };
    }),
  chartColor: "#ff6347",
  changeChartColor: (newChartColor) =>
    set((state) => {
      return {
        chartColor: newChartColor,
      };
    }),
  backgroundColor: "#000",
  changeBackgroundColor: (newBackgroundColor) =>
    set((state) => {
      return {
        backgroundColor: newBackgroundColor,
      };
    }),
  deleteRowHandler: (rowNumber) =>
    set((state) => {
      const newData = [...state.data];
      if (rowNumber < newData.length + 1) {
        newData.splice(rowNumber - 1, 1);
        return {
          data: newData,
        };
      }
      return state;
    }),
}));

export default useChartStore;
