import { useState, useEffect } from 'react';
import Navbar from '../../components/layout/Navbar';
import QueryCard from '../../components/queries/QueryCard';
import { fetchQueries, resolveQuery, rejectQuery } from '../../api/queryApi';
import { ROLES } from '../../utils/constants';
import styles from './Dashboard.module.css';

const TeamHeadDashboard = () => {
  const [queries, setQueries] = useState([]);

  const loadWorkload = async () => {
    const { data } = await fetchQueries();
    setQueries(data);
  };

  useEffect(() => { loadWorkload(); }, []);

  const handleResolve = async (id, answer) => {
    await resolveQuery(id, answer);
    loadWorkload();
  };

  const handleReject = async (id) => {
    if (window.confirm("Reject this query?")) {
      await rejectQuery(id);
      loadWorkload();
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <Navbar tabs={['Workload']} activeTab="Workload" setActiveTab={() => {}} />
      <main className={styles.main}>
        {queries.length === 0 ? <p className={styles.emptyState}>No pending queries.</p> : (
          <div className={styles.queryList}>
            {queries.map(q => (
              <QueryCard 
                key={q._id} 
                query={q} 
                role={ROLES.TEAM_HEAD}
                onResolve={handleResolve}
                onReject={handleReject}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
export default TeamHeadDashboard;