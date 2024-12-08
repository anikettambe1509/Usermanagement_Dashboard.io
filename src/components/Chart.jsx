import { Line } from 'react-chartjs-2';

const Chart = ({ data }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Sales',
        data: data.values,
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 2,
      },
    ],
  };
  return <Line data={chartData} />;
};

export default Chart;
