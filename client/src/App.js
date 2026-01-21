/*import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import UserDashboard from './pages/dashboards/UserDashboard';
import AdminDashboard from './pages/dashboards/AdminDashboard';
import TeamHeadDashboard from './pages/dashboards/TeamHeadDashboard';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { ROLES } from './utils/constants';

// Simple Wrapper for role checking
const ProtectedRouteWrapper = ({ children, allowedRoles }) => {
  return (
    <ProtectedRoute allowedRoles={allowedRoles}>
      {children}
    </ProtectedRoute>
  );
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          <Route path="/dashboard" element={
            <ProtectedRouteWrapper allowedRoles={[ROLES.PARTICIPANT]}>
              <UserDashboard />
            </ProtectedRouteWrapper>
          } />
          
          <Route path="/admin" element={
            <ProtectedRouteWrapper allowedRoles={[ROLES.ADMIN]}>
              <AdminDashboard />
            </ProtectedRouteWrapper>
          } />
          
          <Route path="/workload" element={
            <ProtectedRouteWrapper allowedRoles={[ROLES.TEAM_HEAD]}>
              <TeamHeadDashboard />
            </ProtectedRouteWrapper>
          } />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;