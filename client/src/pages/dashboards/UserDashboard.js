import { useState, useEffect } from 'react';
import Navbar from '../../components/layout/Navbar';
import QueryCard from '../../components/queries/QueryCard';
import { fetchQueries, createQuery } from '../../api/queryApi';
import { ROLES } from '../../utils/constants';
import styles from './Dashboard.module.css';

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
    <div className={styles.dashboardContainer}>
      <Navbar tabs={['New Query', 'Past Queries']} activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className={styles.main}>
        {activeTab === 'New Query' ? (
          <div className={styles.formCard}>
            <h2 className={styles.formTitle}>Submit a Query</h2>
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <input 
                  className={styles.formInput}
                  placeholder="Title"
                  value={form.title}
                  onChange={(e) => setForm({...form, title: e.target.value})}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <textarea 
                  className={styles.formTextarea}
                  placeholder="Describe your issue..."
                  value={form.description}
                  onChange={(e) => setForm({...form, description: e.target.value})}
                  required
                />
              </div>
              <button type="submit" className={styles.submitButton}>Submit</button>
            </form>
          </div>
        ) : (
          <div className={styles.queryList}>
             {queries.length === 0 && <p className={styles.emptyState}>No queries found.</p>}
             {queries.map(q => <QueryCard key={q._id} query={q} role={ROLES.PARTICIPANT} />)}
          </div>
        )}
      </main>
    </div>
  );
};
export default UserDashboard;