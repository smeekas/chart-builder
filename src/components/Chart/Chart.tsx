import React, { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import styles from "./Chart.module.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { ChartOptions } from "chart.js";
import usechartStore, { PositionType } from "../../store/useChartStore";
import useChartStore from "../../store/useChartStore";
import { PluginImport } from "typescript";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// function isPosition(position: string): position is PositionType {
//   return (position as PositionType) !== undefined;
// }
// function getPos(pos: PositionType): pos is "top" | "bottom" {
//   return (pos as "top" | "bottom") !== undefined;
// }
export function Chart() {
  const storeData = usechartStore((state) => state.data);
  const title = usechartStore((state) => state.title);
  const legendName = usechartStore((state) => state.legendName);
  const titleColor = useChartStore((state) => state.titleColor);
  const legendColor = useChartStore((state) => state.legendColor);
  const addRef = useChartStore((state) => state.addRef);
  const titlePosition = usechartStore(
    (state) => state.titlePos
  ).toLowerCase() as "top" | "bottom" | "left" | "right";
  const legendPosition = usechartStore(
    (state) => state.legendPos
  ).toLowerCase() as "top" | "bottom" | "left" | "right";
  const chartColor = useChartStore((state) => state.chartColor);
  const xData = storeData.map((item) => item.x);
  const yData = storeData.map((item) => item.y);
  // console.log(titlePosition);
  const chartRef = useRef<ChartJS<"bar">>(null);
  useEffect(() => {
    // console.log("HEREW")
    addRef(chartRef);
  }, [addRef]);
  function isPosition(position: string): position is PositionType {
    // return true if string is of type PositionType
    return (position as PositionType) !== undefined;
  }
  const options: ChartOptions<"bar"> = useMemo(() => {
    console.log("MEMO");
    return {
      responsive: true,
      resizeDelay: 1000,
      animation: {
        duration: 0,
      },

      scales: {
        y: {
          ticks: {
            color: "white",
          },
        },
        x: {
          ticks: {
            color: "white",
          },
        },
      },
      maintainAspectRatio: false,
      plugins: {
        legend: {
          //TODO ERROR IS HERE
          position: legendPosition,
          labels: {
            color: legendColor,
          },
        },
        title: {
          position: titlePosition,
          display: true,
          text: title,
          color: titleColor,
        },
      },
    };
  }, [title, titlePosition, titleColor, legendColor, legendPosition]);

  // useEffect(()=>{
  //   // chartRef.current?.scales.
  // },[legendColor])
  const data = useMemo(() => {
    return {
      labels: xData,
      datasets: [
        {
          label: legendName,
          data: yData,
          backgroundColor: chartColor,
          hoverBackgroundColor: "yellow",
          // borderWidth: 8,
          // borderColor: borderColor,
          // hoverBorderColor: "red",
        },
      ],
    };
  }, [xData, yData, legendName, chartColor]);
  const plugin = useMemo(() => {
    return {
      id: "custom_canvas_background_color",
      beforeDraw: (chart: ChartJS) => {
        const { ctx } = chart;
        ctx.save();
        ctx.globalCompositeOperation = "destination-over";
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, chart.width, chart.height);
        ctx.restore();
      },
    };
  }, []);

  return (
    <div className={styles.chartContainer}>
      <Bar
        redraw={!!storeData || !!titlePosition}
        ref={chartRef}
        style={{ width: "450px" }}
        options={options}
        data={data}
        plugins={[plugin]}
      />
    </div>
  );
}
