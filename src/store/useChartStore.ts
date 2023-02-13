import create from "zustand";
import { Chart as ChartJS } from "chart.js";
import React from "react";
import { setgid } from "process";
type DataType = {
  x: string;
  y: number;
};
export type PositionType = "Top" | "Bottom" | "Right" | "Left";
interface ChartStoreTypes {
  data: DataType[];
  title: string;
  legendColor: string;
  legendPos: PositionType;
  chartColor: string;
  backgroundColor: string;
  download: boolean
  grid: boolean
  changeTitle: (newLegend: string) => void;
  // changeLegendColor: (newLegendColor: string) => void;
  addRow: () => void;
  changeDataX: (index: number, updatedVal: string) => void;
  changeDataY: (index: number, updatedVal: number) => void;
  // changeTitlePos: (newTitlePos: PositionType) => void;
  changeGrid: () => void
  gridColor: string
  bar:boolean
  line:boolean
  setBar: (newBar: boolean) => void
  setLine: () => void
  lineColor:string
  setLineColor:(newLineColor:string)=>void
  changeGridColor: (newGridColor: string) => void
  changeLegendPos: (newLegendPos: PositionType) => void;
  changeChartColor: (newChartColor: string) => void;
  changeBackgroundColor: (newBackgroundColor: string) => void;
  deleteRowHandler: (rowNumber: number) => void;
  setDownload: (newDownload: boolean) => void
}

const useChartStore = create<ChartStoreTypes>()((set) => ({
  data: [
    {
      x: "",
      y: NaN,
    },
  ],
  title: "Dataset",
  changeTitle: (newLegend) =>
    set((state) => {
      return {
        title: newLegend,
      };
    }),
  download: false,
  grid: true,
  changeGrid: () => set(state => {
    return {
      grid: !state.grid
    }
  }),
  bar:true,
  setBar:(newBar)=>set(state=>{
    return {
      bar:newBar
    }
  }),
  line:false,
  setLine:()=>set(state=>{
    return {
      line:!state.line
    }
  }),
  setDownload: (newDownload: boolean) => set((state) => {
    return {
      download: newDownload
    }
  }),
  lineColor:"white",
  setLineColor:(newLineColor)=>set(state=>{
    return {
      lineColor:newLineColor
    }
  }),
  legendColor: "#656565",
  changeLegendColor: (newLegendColor: string) =>
    set((state) => {
      return {
        legendColor: newLegendColor,
      };
    }),
  gridColor: "#fff",
  changeGridColor: (newGridColor) => set((state) => {
    return {
      gridColor: newGridColor
    }
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
      // console.log("x store");
      newData[index].x = updatedVal;
      return { data: newData };
    }),
  changeDataY: (index, updatedVal) =>
    set((state) => {
      const newData = [...state.data];
      // console.log("y store");

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
