import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";

const Barchart = ({ data, filterOption, type }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode); 
  return (
    <ResponsiveBar
      data={data}
      theme={{
        tooltip: {
          container: {
            background: colors.primary[400],
            color: colors.primary[100],
            fontSize: 12,
          },
        },
        legends: {
          text: {
            fill: colors.primary[100],
          },
        },
        axis: {
          ticks: {
            line: {
              stroke: colors.primary[100],
            },
            text: {
              fill: colors.primary[100],
            },
          },
          legend: {
            text: {
              fill: colors.primary[100],
            },
          },
        },
      }}
      keys={type === "FUND OUT" ? [
        'Office Supplies',
        'Lodging',
        'Food',
        'Transporation',
        'Entertainment',
        'Utilities',
        'Bills',
        'SkillUp',
        'Client',
      ]:['Account','Cash',]}
      
      indexBy="filterId" //filterOption === "month" ? "month" : "year"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      groupMode="grouped"
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "nivo" }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      borderWidth={1}
      borderColor={{
        from: "color",
        modifiers: [["darker", "1.5"]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: filterOption === "month" ? "Month" : "Year",
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Amount",
        legendPosition: "middle",
        legendOffset: -52,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
      ariaLabel="MM_Chart"
      barAriaLabel={(e) =>
        e.id + ": " + e.formattedValue + " in : " + e.indexValue
      }
    />
  );
};

export default Barchart;
