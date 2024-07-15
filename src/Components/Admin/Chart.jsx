import { Line, Doughnut } from "react-chartjs-2";
import {
  ArcElement,
  CategoryScale,
  Chart,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
Chart.register(
  Tooltip,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Filler,
  ArcElement,
  Legend
);
import { getLast7Days } from "../../utils/features";
const LineChart = (prop) => {
  const labels = getLast7Days();
  const Linedata = {
    labels: labels,
    datasets: [
      {
        data: prop.value,
        label: "Messages",
        fill: true,
        backgroundColor: "white",
        borderColor: "green",
      },
    ],
  };

  return (
    <div>
      <Line data={Linedata} width={"90%"} height={"60"} />
    </div>
  );
};
const DonutChart = (prop) => {
  const donutData = {
    labels: ["Single Chats", "Groups Chat"],
    datasets: [
      {
        data: prop?.value,
        label: "Single Chat VS Group Chat",
        backgroundColor: ["green", "blue"],
        borderColor: "green",
        offset: "20",
      },
    ],
  };

  return <Doughnut data={donutData} width={"90%"} height={"80"} />;
};

export { LineChart, DonutChart };
