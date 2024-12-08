// import React from 'react';
// import LineChart from '../components/LineChart';

// const Dashboard = () => {
//   const chartData = {
//     labels: ['January', 'February', 'March', 'April', 'May'],
//     values: [100, 200, 150, 300, 250],
//   };

//   return (
//     <div className="ml-64 p-4">
//       <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
//       <LineChart data={chartData} />
//     </div>
//   );
// };

// export default Dashboard;

import React from 'react';
import LineChart from '../components/LineChart';
import BarChart from '../components/BarChart';
import PieChart from '../components/PieChart';

const Dashboard = () => {
  // Example data for charts
  const lineChartData = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    values: [100, 200, 150, 300, 250],
  };

  const barChartData = {
    labels: ['Electronics', 'Fashion', 'Groceries', 'Furniture'],
    values: [500, 300, 400, 200],
  };

  const pieChartData = {
    labels: ['Male', 'Female', 'Other'],
    values: [60, 35, 5],
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 ">Dashboard</h2>

      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded shadow-md">
          <h3 className="text-xl font-semibold">Total Revenue</h3>
          <p className="text-3xl font-bold text-green-500">$10,000</p>
        </div>
        <div className="bg-white p-6 rounded shadow-md">
          <h3 className="text-xl font-semibold">Active Users</h3>
          <p className="text-3xl font-bold text-blue-500">1,200</p>
        </div>
        <div className="bg-white p-6 rounded shadow-md">
          <h3 className="text-xl font-semibold">New Orders</h3>
          <p className="text-3xl font-bold text-purple-500">320</p>
        </div>
        <div className="bg-white p-6 rounded shadow-md">
          <h3 className="text-xl font-semibold">Pending Issues</h3>
          <p className="text-3xl font-bold text-red-500">15</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded shadow-md">
          <h3 className="text-xl font-semibold mb-4">Sales Over Time</h3>
          <LineChart data={lineChartData} />
        </div>
        <div className="bg-white p-6 rounded shadow-md">
          <h3 className="text-xl font-semibold mb-4">Revenue by Category</h3>
          <BarChart data={barChartData} />
        </div>
      </div>

      <div className="bg-white p-6 rounded shadow-md">
        <h3 className="text-xl font-semibold mb-4">User Demographics</h3>
        <PieChart data={pieChartData} />
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white p-6 rounded shadow-md mt-6">
        <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
        <ul className="divide-y divide-gray-300">
          <li className="py-2">
            <p className="text-sm text-gray-600">Order #12345</p>
            <p className="text-lg font-medium">John Doe purchased $500 worth of electronics.</p>
          </li>
          <li className="py-2">
            <p className="text-sm text-gray-600">Order #12346</p>
            <p className="text-lg font-medium">Jane Smith purchased $300 worth of furniture.</p>
          </li>
          <li className="py-2">
            <p className="text-sm text-gray-600">Order #12347</p>
            <p className="text-lg font-medium">Mike Johnson purchased $150 worth of groceries.</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
