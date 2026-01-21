import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../../api/authApi';
import useAuth from '../../hooks/useAuth';
import InputField from '../../components/common/InputField';
import { ROLES } from '../../utils/constants';

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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
        <InputField label="Username" onChange={(e) => setFormData({...formData, username: e.target.value})} required />
        <InputField label="Password" type="password" onChange={(e) => setFormData({...formData, password: e.target.value})} required />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">Submit</button>
        <p className="mt-4 text-center text-sm">
          New here? <Link to="/signup" className="text-blue-500">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};
export default Login;