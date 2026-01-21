import { useState, useEffect } from 'react';
import Navbar from '../../components/layout/Navbar';
import QueryCard from '../../components/queries/QueryCard';
import { fetchQueries, resolveQuery, rejectQuery } from '../../api/queryApi';
import { ROLES } from '../../utils/constants';

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
    <div className="min-h-screen bg-gray-50">
      <Navbar tabs={['Workload']} activeTab="Workload" setActiveTab={() => {}} />
      <main className="max-w-4xl mx-auto p-6">
        {queries.length === 0 ? <p className="text-center text-gray-500">No pending queries.</p> : (
          queries.map(q => (
            <QueryCard 
              key={q._id} 
              query={q} 
              role={ROLES.TEAM_HEAD}
              onResolve={handleResolve}
              onReject={handleReject}
            />
          ))
        )}
      </main>
    </div>
  );
};
export default TeamHeadDashboard;