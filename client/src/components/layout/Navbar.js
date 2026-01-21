import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ tabs, activeTab, setActiveTab }) => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-wide">QuerySys <span className="text-sm font-normal opacity-75">({auth?.role})</span></h1>
        
        <div className="flex gap-4">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-1 border-b-2 transition ${activeTab === tab ? 'border-white font-bold' : 'border-transparent hover:text-gray-300'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm">
          Logout
        </button>
      </div>
    </nav>
  );
};
export default Navbar;