import { useState, useEffect } from 'react';
import Navbar from '../../components/layout/Navbar';
import QueryCard from '../../components/queries/QueryCard';
import TeamHeadList from '../../components/admin/TeamHeadList';
import Modal from '../../components/common/Modal';
import { fetchQueries, assignQuery, rejectQuery } from '../../api/queryApi';
import { fetchTeamHeads } from '../../api/adminApi';
import { ROLES } from '../../utils/constants';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('Queries');
  const [queries, setQueries] = useState([]);
  const [teamHeads, setTeamHeads] = useState([]);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHeadQueries, setSelectedHeadQueries] = useState([]);
  const [selectedHeadName, setSelectedHeadName] = useState('');

  // Fetch Data
  const loadData = async () => {
    try {
      const [qRes, hRes] = await Promise.all([fetchQueries(), fetchTeamHeads()]);
      setQueries(qRes.data);
      setTeamHeads(hRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { loadData(); }, []);

  // Actions
  const handleAssign = async (id, headId) => {
    if (!headId) return alert("Please select a Team Head");
    await assignQuery(id, headId);
    loadData();
  };

  const handleDismantle = async (id) => {
    if (window.confirm("Dismantle this query?")) {
      await rejectQuery(id);
      loadData();
    }
  };

  const handleViewWorkload = (head) => {
    // Filter queries assigned to this head from the full list we already have
    const headQueries = queries.filter(q => q.assignedTo && q.assignedTo._id === head._id);
    setSelectedHeadQueries(headQueries);
    setSelectedHeadName(head.username);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar tabs={['Queries', 'Team Heads']} activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="max-w-6xl mx-auto p-6">
        {activeTab === 'Queries' && (
          <div>
            {queries.map(q => (
              <QueryCard 
                key={q._id} 
                query={q} 
                role={ROLES.ADMIN} 
                teamHeads={teamHeads}
                onAssign={handleAssign}
                onReject={handleDismantle}
              />
            ))}
          </div>
        )}

        {activeTab === 'Team Heads' && (
          <TeamHeadList heads={teamHeads} onViewWorkload={handleViewWorkload} />
        )}
      </main>

      {/* Modal for Specific Team Head Queries */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={`Queries Assigned to ${selectedHeadName}`}
      >
        {selectedHeadQueries.length === 0 ? <p>No active queries.</p> : (
          selectedHeadQueries.map(q => <QueryCard key={q._id} query={q} role={ROLES.ADMIN} />)
        )}
      </Modal>
    </div>
  );
};
export default AdminDashboard;