const TeamHeadList = ({ heads, onViewWorkload }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {heads.map(head => (
        <div key={head._id} className="bg-white p-4 rounded shadow border flex justify-between items-center">
          <div>
            <h3 className="font-bold text-lg">{head.username}</h3>
            <p className="text-gray-500 text-sm">Active Queries: {head.activeQueries || 0}</p>
          </div>
          <button 
            onClick={() => onViewWorkload(head)}
            className="text-blue-600 hover:underline text-sm"
          >
            View Workload
          </button>
        </div>
      ))}
    </div>
  );
};
export default TeamHeadList;