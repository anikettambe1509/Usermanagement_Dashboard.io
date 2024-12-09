import { Link } from 'react-router-dom';

const Sidebar = () => (
  <div className="w-64 bg-gray-800 text-white h-screen fixed">
    <div className="p-4 font-bold text-lg">User's Admin Panel</div>
    <ul className="space-y-4 mt-4">
      <li><Link to="/dashboard" className="block p-2 hover:bg-gray-700">Dashboard</Link></li>
      <li><Link to="/users" className="block p-2 hover:bg-gray-700">Users</Link></li>
    </ul>
  </div>
);
export default Sidebar;
