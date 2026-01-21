import { STATUS_COLORS } from '../../utils/constants';

const StatusBadge = ({ status }) => (
  <span className={`px-2 py-1 rounded text-xs font-semibold border ${STATUS_COLORS[status] || 'bg-gray-100'}`}>
    {status}
  </span>
);
export default StatusBadge;