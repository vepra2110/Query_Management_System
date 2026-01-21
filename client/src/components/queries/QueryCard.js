import { useState } from 'react';
import StatusBadge from '../common/StatusBadge';
import AssignDropdown from '../admin/AssignDropdown'; // Import the new component
import { ROLES, QUERY_STATUS } from '../../utils/constants';

const QueryCard = ({ query, role, teamHeads, onAssign, onResolve, onReject }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [answer, setAnswer] = useState('');
  
  // Local state to track which Team Head is selected for THIS specific query
  const [selectedHead, setSelectedHead] = useState('');

  return (
    <div className="bg-white border rounded shadow-sm mb-3 overflow-hidden">
      {/* Header - Click to Expand */}
      <div 
        onClick={() => setIsExpanded(!isExpanded)} 
        className="p-4 cursor-pointer flex justify-between items-center hover:bg-gray-50 transition"
      >
        <h3 className="font-semibold text-gray-800">{query.title}</h3>
        <StatusBadge status={query.status} />
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="p-4 border-t bg-gray-50 text-sm text-gray-700">
          <p className="mb-2"><strong>Description:</strong> {query.description}</p>
          <p className="mb-4"><strong>Assigned To:</strong> {query.assignedTo?.username || 'None'}</p>

          {/* Show Answer if Resolved */}
          {query.status === QUERY_STATUS.RESOLVED && (
             <div className="bg-green-50 border border-green-200 p-3 rounded mb-2">
               <strong>Answer: </strong> {query.answer}
             </div>
          )}

          {/* --- ADMIN ACTIONS: Assign Query --- */}
          {role === ROLES.ADMIN && query.status === QUERY_STATUS.UNASSIGNED && (
            <div className="flex gap-2 mt-4 items-center bg-white p-3 border rounded shadow-sm">
              <span className="font-semibold text-gray-600 mr-2">Action:</span>
              
              {/* The Dropdown Component */}
              <AssignDropdown 
                teamHeads={teamHeads}
                selectedHead={selectedHead}
                onChange={setSelectedHead}
              />

              <button 
                onClick={() => onAssign(query._id, selectedHead)}
                disabled={!selectedHead} // Disable if no head selected
                className={`px-3 py-1 rounded text-white transition ${
                  selectedHead ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                Assign
              </button>

              <button 
                 onClick={() => onReject(query._id)}
                 className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 ml-auto"
              >
                Dismantle
              </button>
            </div>
          )}

          {/* --- TEAM HEAD ACTIONS: Resolve/Reject --- */}
          {role === ROLES.TEAM_HEAD && query.status === QUERY_STATUS.ASSIGNED && (
            <div className="mt-4">
              <textarea 
                className="w-full border p-2 rounded mb-2 focus:ring-2 focus:ring-green-500 outline-none"
                placeholder="Type your answer..."
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
              <div className="flex gap-2">
                <button 
                   onClick={() => onResolve(query._id, answer)}
                   className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Submit Answer
                </button>
                <button 
                   onClick={() => onReject(query._id)}
                   className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Reject
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QueryCard;