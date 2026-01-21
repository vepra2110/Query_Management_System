import { useState, useEffect } from 'react';
import Navbar from '../../components/layout/Navbar';
import QueryCard from '../../components/queries/QueryCard';
import { fetchQueries, createQuery } from '../../api/queryApi';
import { ROLES } from '../../utils/constants';

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('New Query');
  const [queries, setQueries] = useState([]);
  const [form, setForm] = useState({ title: '', description: '' });

  // Fetch queries when tab changes
  useEffect(() => {
    if (activeTab === 'Past Queries') {
      fetchQueries().then(res => setQueries(res.data)).catch(console.error);
    }
  }, [activeTab]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createQuery(form);
    alert('Query Created');
    setForm({ title: '', description: '' });
    setActiveTab('Past Queries');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar tabs={['New Query', 'Past Queries']} activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="max-w-4xl mx-auto p-6">
        {activeTab === 'New Query' ? (
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-4">Submit a Query</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input 
                  className="w-full border p-2 rounded" 
                  placeholder="Title"
                  value={form.title}
                  onChange={(e) => setForm({...form, title: e.target.value})}
                  required
                />
              </div>
              <div className="mb-4">
                <textarea 
                  className="w-full border p-2 rounded h-32" 
                  placeholder="Describe your issue..."
                  value={form.description}
                  onChange={(e) => setForm({...form, description: e.target.value})}
                  required
                />
              </div>
              <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">Submit</button>
            </form>
          </div>
        ) : (
          <div>
             {queries.length === 0 && <p className="text-center text-gray-500">No queries found.</p>}
             {queries.map(q => <QueryCard key={q._id} query={q} role={ROLES.PARTICIPANT} />)}
          </div>
        )}
      </main>
    </div>
  );
};
export default UserDashboard;