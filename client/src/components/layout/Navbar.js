import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = ({ tabs, activeTab, setActiveTab }) => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <h1 className={styles.logo}>QuerySys <span className={styles.roleTag}>({auth?.role})</span></h1>
        </div>
        
        <div className={styles.tabsContainer}>
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`${styles.tab} ${activeTab === tab ? styles.active : ''}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <button onClick={handleLogout} className={styles.logoutButton}>
          Logout
        </button>
      </div>
    </nav>
  );
};
export default Navbar;