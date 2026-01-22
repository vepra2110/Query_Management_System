import React from 'react';
import styles from './AssignDropdown.module.css';

const AssignDropdown = ({ teamHeads, selectedHead, onChange }) => {
  return (
    <select
      className={styles.select}
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