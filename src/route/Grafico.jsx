import Highcharts from "highcharts/highstock";
import PieChart from "highcharts-react-official";

const grades = [
  { name: "Carla", y: 135 },
  { name: "Marc", y: 89 },
  { name: "Victor", y: 44 },
  { name: "Rafa", y: 32 },
  { name: "Fabrizio", y: 12 }
];

const pie = {
  title: { text: "Estudiantes" },
  chart: { type: "pie" },
  series: [{ data: grades }]
};

const line = {
  title: { text: "Estudiantes" },
  chart: { type: "line" },
  series: [{ data: grades }]
};

const Grafico = () => {
  return (
    <div style={{ margin: "40px" }}>
      <PieChart highcharts={Highcharts} options={pie} />
      <PieChart highcharts={Highcharts} options={line} />
    </div>
  );
};

export default Grafico;

