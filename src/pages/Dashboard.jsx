// import React, { useState, useEffect } from 'react';
// import { Chart } from 'chart.js/auto';
// import { Pie, Bar } from 'react-chartjs-2';
// import { getUsers } from '../utils/api';

// const Dashboard = () => {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     setUsers(getUsers());
//   }, []);

//   const totalUsers = users.length;
//   const activeUsers = users.filter(user => user.status === 'Active').length;
//   const inactiveUsers = totalUsers - activeUsers;

//   // Dummy monthly data (replace with API or logic to fetch monthly stats)
//   const months = ['January', 'February', 'March', 'April', 'May', 'June'];
//   const addedUsersMonthly = [20, 15, 25, 10, 30, 12];
//   const inactiveUsersMonthly = [5, 3, 8, 2, 10, 1];

//   const pieChartData = {
//     labels: ['Active', 'Inactive'],
//     datasets: [
//       {
//         data: [activeUsers, inactiveUsers],
//         backgroundColor: ['#4CAF50', '#F44336'], // Green for Active, Red for Inactive
//       },
//     ],
//   };

//   const barChartData = {
//     labels: months,
//     datasets: [
//       {
//         label: 'Users Added',
//         data: addedUsersMonthly,
//         backgroundColor: '#4CAF50',
//       },
//       {
//         label: 'Users Inactive',
//         data: inactiveUsersMonthly,
//         backgroundColor: '#F44336',
//       },
//     ],
//   };

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-4xl font-bold text-gray-800 mb-6">Dashboard</h1>

//       {/* User Summary */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//         <div className="bg-white p-4 rounded shadow-md">
//           <h2 className="text-2xl font-semibold text-gray-700">Total Users</h2>
//           <p className="text-4xl font-bold text-blue-500">{totalUsers}</p>
//         </div>
//         <div className="bg-white p-4 rounded shadow-md">
//           <h2 className="text-2xl font-semibold text-gray-700">Active Users</h2>
//           <p className="text-4xl font-bold text-green-500">{activeUsers}</p>
//         </div>
//         <div className="bg-white p-4 rounded shadow-md">
//           <h2 className="text-2xl font-semibold text-gray-700">Inactive Users</h2>
//           <p className="text-4xl font-bold text-red-500">{inactiveUsers}</p>
//         </div>
//       </div>

//       {/* Charts Section */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Pie Chart */}
//         <div className="bg-white p-6 rounded shadow-md">
//           <h2 className="text-xl font-semibold text-gray-700 mb-4">User Status Distribution</h2>
//           <Pie data={pieChartData} />
//         </div>

//         {/* Bar Chart */}
//         <div className="bg-white p-6 rounded shadow-md">
//           <h2 className="text-xl font-semibold text-gray-700 mb-4">Monthly User Activity</h2>
//           <Bar data={barChartData} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;




import React, { useState, useEffect } from 'react';
import { Chart } from 'chart.js/auto';
import { Pie, Bar } from 'react-chartjs-2';
import { getUsers } from '../utils/api';

const Dashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers(); // Fetch data from API
        setUsers(data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchUsers();
  }, []);

  const totalUsers = users.length;
  const activeUsers = users.filter(user => user.status === 'Active').length;
  const inactiveUsers = totalUsers - activeUsers;

  // Dummy monthly data mapping (replace with actual API data logic)
  const months = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

  // Example grouping users by month (replace with your actual API response logic)
  const monthlyData = months.map((month, index) => {
    const active = users.filter(
      user => user.status === 'Active' && new Date(user.createdAt).getMonth() === index
    ).length;
    const inactive = users.filter(
      user => user.status !== 'Active' && new Date(user.createdAt).getMonth() === index
    ).length;
    return { month, active, inactive };
  });

  const barChartData = {
    labels: months,
    datasets: [
      {
        label: 'Active Users',
        data: monthlyData.map(data => data.active),
        backgroundColor: '#4CAF50', // Green for active users
      },
      {
        label: 'Inactive Users',
        data: monthlyData.map(data => data.inactive),
        backgroundColor: '#F44336', // Red for inactive users
      },
    ],
  };

  const pieChartData = {
    labels: ['Active', 'Inactive'],
    datasets: [
      {
        data: [activeUsers, inactiveUsers],
        backgroundColor: ['#4CAF50', '#F44336'], // Green for Active, Red for Inactive
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Dashboard</h1>

      {/* User Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-4 rounded shadow-md">
          <h2 className="text-2xl font-semibold text-gray-700">Total Users</h2>
          <p className="text-4xl font-bold text-blue-500">{totalUsers}</p>
        </div>
        <div className="bg-white p-4 rounded shadow-md">
          <h2 className="text-2xl font-semibold text-gray-700">Active Users</h2>
          <p className="text-4xl font-bold text-green-500">{activeUsers}</p>
        </div>
        <div className="bg-white p-4 rounded shadow-md">
          <h2 className="text-2xl font-semibold text-gray-700">Inactive Users</h2>
          <p className="text-4xl font-bold text-red-500">{inactiveUsers}</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-white p-6 rounded shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">User Status Distribution</h2>
          <Pie data={pieChartData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
