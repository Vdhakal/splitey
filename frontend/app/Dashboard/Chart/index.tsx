// Chart.tsx
import React from "react";
import { LineChart } from "react-native-chart-kit";

interface ChartProps {
  data: {
    labels: string[];
    datasets: Array<{
      data: number[];
      color: (opacity?: number) => string;
      strokeWidth: number;
    }>;
    legend: string[];
  };
}

const Chart: React.FC<ChartProps> = ({ data }) => {
  return (
    <LineChart
      data={{
        labels: data.labels,
        datasets: data.datasets,
        legend: data.legend,
      }}
      width={350}
      height={220}
      chartConfig={{
        backgroundColor: "#ffffff",
        backgroundGradientFrom: "#ffffff",
        backgroundGradientTo: "#ffffff",
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        style: {
          borderRadius: 16,
        },
      }}
      bezier
      style={{ marginVertical: 8, borderRadius: 16 }}
    />
  );
};

export default Chart;