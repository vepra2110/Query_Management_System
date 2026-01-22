import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../../api/authApi';
import useAuth from '../../hooks/useAuth';
import InputField from '../../components/common/InputField';
import { ROLES } from '../../utils/constants';
import styles from './Auth.module.css';

const Signup = () => {
  const [formData, setFormData] = useState({ username: '', password: '', confirmPassword: '', role: ROLES.PARTICIPANT, secretCode: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) return alert("Passwords don't match");

    try {
      const { data } = await registerUser(formData);
      login(data);
      if (data.role === ROLES.ADMIN) navigate('/admin');
      else if (data.role === ROLES.TEAM_HEAD) navigate('/workload');
      else navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className={styles.authContainer}>
      <form onSubmit={handleSubmit} className={styles.formWrapper}>
        <h2 className={styles.title}>Sign Up</h2>
        
        <InputField label="Username" onChange={(e) => setFormData({...formData, username: e.target.value})} required />
        <InputField label="Password" type="password" onChange={(e) => setFormData({...formData, password: e.target.value})} required />
        <InputField label="Re-enter Password" type="password" onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} required />
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Role</label>
          <select 
            className={styles.roleSelect}
            value={formData.role} 
            onChange={(e) => setFormData({...formData, role: e.target.value})}
          >
            <option value={ROLES.PARTICIPANT}>User</option>
            <option value={ROLES.ADMIN}>Admin</option>
            <option value={ROLES.TEAM_HEAD}>Team Head</option>
          </select>
        </div>

        {/* Conditional "Code" Field */}
        {(formData.role === ROLES.ADMIN || formData.role === ROLES.TEAM_HEAD) && (
           <InputField 
             label="Secret Code (Required)" 
             placeholder="Enter access code" 
             onChange={(e) => setFormData({...formData, secretCode: e.target.value})} 
             required 
           />
        )}

        <button type="submit" className={styles.submitButton}>Submit</button>
        <p className={styles.linkText}>
          Already have an account? <Link to="/">Sign In</Link>
        </p>
      </form>
    </div>
  );
};
export default Signup;