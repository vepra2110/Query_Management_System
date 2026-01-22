import { STATUS_COLORS } from '../../utils/constants';
import styles from './StatusBadge.module.css';

const StatusBadge = ({ status }) => {
  const statusClass = status.toLowerCase().replace(/\s+/g, '');
  const badgeClass = styles[statusClass] || styles.default;
  
  return (
    <span className={`${styles.badge} ${badgeClass}`}>
      {status}
    </span>
  );
};
export default StatusBadge;