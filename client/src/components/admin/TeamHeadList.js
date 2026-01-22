import styles from './TeamHeadList.module.css';

const TeamHeadList = ({ heads, onViewWorkload }) => {
  return (
    <div className={styles.gridContainer}>
      {heads.map(head => (
        <div key={head._id} className={styles.card}>
          <div className={styles.info}>
            <h3 className={styles.username}>{head.username}</h3>
            <p className={styles.queriesCount}>Active Queries: {head.activeQueries || 0}</p>
          </div>
          <button 
            onClick={() => onViewWorkload(head)}
            className={styles.viewButton}
          >
            View Workload
          </button>
        </div>
      ))}
    </div>
  );
};
export default TeamHeadList;