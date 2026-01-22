import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../../api/authApi';
import useAuth from '../../hooks/useAuth';
import InputField from '../../components/common/InputField';
import { ROLES } from '../../utils/constants';
import styles from './Auth.module.css';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginUser(formData);
      login(data);
      if (data.role === ROLES.ADMIN) navigate('/admin');
      else if (data.role === ROLES.TEAM_HEAD) navigate('/workload');
      else navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className={styles.authContainer}>
      <form onSubmit={handleSubmit} className={styles.formWrapper}>
        <h2 className={styles.title}>Sign In</h2>
        <InputField label="Username" onChange={(e) => setFormData({...formData, username: e.target.value})} required />
        <InputField label="Password" type="password" onChange={(e) => setFormData({...formData, password: e.target.value})} required />
        <button type="submit" className={styles.submitButton}>Submit</button>
        <p className={styles.linkText}>
          New here? <Link to="/signup">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};
export default Login;