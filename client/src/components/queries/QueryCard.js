import { useState } from 'react';
import StatusBadge from '../common/StatusBadge';
import AssignDropdown from '../admin/AssignDropdown'; // Import the new component
import { ROLES, QUERY_STATUS } from '../../utils/constants';
import styles from './QueryCard.module.css';

const QueryCard = ({ query, role, teamHeads, onAssign, onResolve, onReject }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [answer, setAnswer] = useState('');
  
  // Local state to track which Team Head is selected for THIS specific query
  const [selectedHead, setSelectedHead] = useState('');

  return (
    <div className={styles.card}>
      {/* Header - Click to Expand */}
      <div 
        onClick={() => setIsExpanded(!isExpanded)} 
        className={styles.header}
      >
        <h3 className={styles.title}>{query.title}</h3>
        <StatusBadge status={query.status} />
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className={styles.expanded}>
          <div className={styles.expandedSection}>
            <p><span className={styles.label}>Description:</span> {query.description}</p>
          </div>
          <div className={styles.expandedSection}>
            <p><span className={styles.label}>Assigned To:</span></p>
            <div className={styles.assignedInfo}>
              {query.assignedTo?.username || 'None'}
            </div>
          </div>

          {/* Show Answer if Resolved */}
          {query.status === QUERY_STATUS.RESOLVED && (
             <div className={styles.answerBox}>
               <span className={styles.answerLabel}>Answer:</span> 
               <div className={styles.answerText}>{query.answer}</div>
             </div>
          )}

          {/* --- ADMIN ACTIONS: Assign Query --- */}
          {role === ROLES.ADMIN && query.status === QUERY_STATUS.UNASSIGNED && (
            <div className={styles.actionPanel}>
              <span className={styles.actionLabel}>Action:</span>
              
              {/* The Dropdown Component */}
              <AssignDropdown 
                teamHeads={teamHeads}
                selectedHead={selectedHead}
                onChange={setSelectedHead}
              />

              <button 
                onClick={() => onAssign(query._id, selectedHead)}
                disabled={!selectedHead}
                className={`${styles.button} ${styles.buttonAssign}`}
              >
                Assign
              </button>

              <button 
                 onClick={() => onReject(query._id)}
                 className={`${styles.button} ${styles.buttonReject} ${styles.rejectButton}`}
              >
                Dismantle
              </button>
            </div>
          )}

          {/* --- TEAM HEAD ACTIONS: Resolve/Reject --- */}
          {role === ROLES.TEAM_HEAD && query.status === QUERY_STATUS.ASSIGNED && (
            <div className={styles.expandedSection}>
              <textarea 
                className={styles.answerTextarea}
                placeholder="Type your answer..."
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
              <div className={styles.buttonGroup}>
                <button 
                   onClick={() => onResolve(query._id, answer)}
                   className={`${styles.button} ${styles.buttonSubmit}`}
                >
                  Submit Answer
                </button>
                <button 
                   onClick={() => onReject(query._id)}
                   className={`${styles.button} ${styles.buttonReject}`}
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