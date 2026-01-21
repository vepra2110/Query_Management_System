import React from 'react';

const AssignDropdown = ({ teamHeads, selectedHead, onChange }) => {
  return (
    <select
      className="border p-2 rounded text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none"
      value={selectedHead}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">Select Team Head</option>
      {teamHeads && teamHeads.map((head) => (
        <option key={head._id} value={head._id}>
          {head.username}
        </option>
      ))}
    </select>
  );
};

export default AssignDropdown;