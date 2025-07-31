import React from 'react';

interface StatusMessageProps {
  type: 'loading' | 'error' | 'empty';
  message: string;
}

const StatusMessage: React.FC<StatusMessageProps> = ({ type, message }) => {
  const baseStyle = 'text-center mt-10 font-semibold rounded-xl py-6';
  const styles: Record<string, string> = {
    loading: 'text-accent text-xl animate-pulse',
    error: 'text-secondary bg-accent/20',
    empty: 'text-secondary bg-accent/20 col-span-full',
  };

  return <div className={`${baseStyle} ${styles[type]}`}>{message}</div>;
};

export default StatusMessage;
