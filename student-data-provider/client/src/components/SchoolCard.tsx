import React from 'react';
import type { School } from '../types/school';
import AddStudent from './AddStudent';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';

interface SchoolCardProps {
  school: School;
}

const SchoolCard: React.FC<SchoolCardProps> = ({ school }) => {
  const navigate = useNavigate();

  const handleViewLogs = () => {
    navigate(`/webhook-logs/${school.schoolId}`);
  };

  return (
    <div className="rounded-2xl border border-secondary bg-gradient-to-br from-background to-white shadow-sm hover:shadow-xl transition-shadow p-6 flex flex-col items-center gap-4 text-center">
      {/* Avatar Circle */}
      <div className="w-20 h-20 rounded-full bg-accent text-primary font-extrabold text-3xl flex items-center justify-center border-4 border-white shadow-lg">
        {school.name?.charAt(0) || 'S'}
      </div>

      {/* School Name */}
      <h2 className="text-2xl font-bold text-primary tracking-wide drop-shadow-sm">
        {school.name}
      </h2>

      {/* School ID */}
      <div className="flex items-center gap-2 text-sm">
        <span className="text-secondary uppercase font-semibold tracking-wide">
          School ID:
        </span>
        <span className="font-mono text-primary bg-secondary/10 px-2 py-1 rounded shadow-sm">
          {school.schoolId}
        </span>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-2 w-full items-center">
        <Button
          type="primary"
          className="btn-primary"
          size="small"
          onClick={handleViewLogs}
        >
          View Webhook Logs
        </Button>
        <AddStudent schoolId={school.schoolId} />
      </div>
    </div>
  );
};

export default SchoolCard;
