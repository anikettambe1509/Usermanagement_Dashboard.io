import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import Users from './pages/Users';
import Footer from './components/Footer'; // Import Footer

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen"> {/* Ensure full-height container */}
        <Sidebar />
        <div className="ml-64 flex flex-col flex-grow"> {/* Content area takes remaining space */}
          <Navbar />
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
          </Routes>
        </div>
        <Footer /> {/* Footer placed here */}
      </div>
    </Router>
  );
}

export default App;
