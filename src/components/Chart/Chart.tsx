import React, { useEffect } from "react";
import styles from "./Chart.module.css";
import { useCurrentPng, UseCurrentPng } from "recharts-to-png";
import usechartStore, { PositionType } from "../../store/useChartStore";
import useChartStore from "../../store/useChartStore";
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer, LineChart, ComposedChart, Line, Area } from "recharts";
import { HorizontalAlignmentType, VerticalAlignmentType } from "recharts/types/component/DefaultLegendContent";
import { saveAs } from 'file-saver';
const Chart = () => {
  const storeData = usechartStore((state) => state.data);
  const [getPng, { ref, isLoading }] = useCurrentPng()
  const title = usechartStore((state) => state.title);
  const download = usechartStore(state => state.download)
  const setDownload = usechartStore(state => state.setDownload)
  const grid = useChartStore(state => state.grid)
  const gridColor = useChartStore(state => state.gridColor)
  const line = useChartStore(state => state.line)
  const lineColor = useChartStore(state => state.lineColor)

  const data = storeData.map((item) => {
    return {
      name: item.x,
      [`${title}`]: item.y
    }
  })
  useEffect(() => {
    async function getPhoto() {
      const png = await getPng();
      if (png) {
        saveAs(png, 'myChart.png')
        setDownload(false)
      }

    }
    if (download) {
      getPhoto();

    }
  }, [download])
  const legendPosition = usechartStore(
    (state) => state.legendPos
  ).toLowerCase() as "top" | "bottom" | "left" | "right";
  const legendPos: {
    vertical: VerticalAlignmentType
    align: HorizontalAlignmentType
  } = {
    vertical: legendPosition === "left" || legendPosition === "right" ? "middle" : (legendPosition === "bottom" ? "bottom" : "top"),
    align: legendPosition === "top" || legendPosition === "bottom" ? "center" : (legendPosition === "left" ? "left" : "right")
  }
  const chartColor = useChartStore((state) => state.chartColor);
  const backgroundColor = useChartStore(state => state.backgroundColor)
  return (
    <div className={styles.chartContainer}>
      <ResponsiveContainer width={"90%"} >

        <ComposedChart data={data} ref={ref} >
          <CartesianGrid horizontal={grid} stroke={gridColor} vertical={grid} fill={`${backgroundColor}`} />
          <XAxis dataKey={"name"} />
          <YAxis color="green" width={45} />
          <Tooltip />
          <Legend wrapperStyle={(legendPosition === "left" || legendPosition === "right") ? { width: "fit-content" } : {}} color="red" fill="red " align={legendPos.align} layout="horizontal" verticalAlign={legendPos.vertical} />
          <Bar dataKey={`${title}`} fill={`${chartColor}`} />
          {/* <Area type="monotone" dataKey={`${title}`} fill="#8884d8" stroke="#8884d8" /> */}
          {line && <Line type="monotone" dataKey={`${title}`} stroke={lineColor} />
          }        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
export default React.memo(Chart)