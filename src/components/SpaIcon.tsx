import React from 'react';

export const SpaIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2C12 2 8 8 8 13C8 16.5 10 19 12 22C14 19 16 16.5 16 13C16 8 12 2 12 2Z" opacity="0.9" />
      <path d="M6.5 7.5C6.5 7.5 3 12 4 16.5C4.7 19.5 7 21 9.5 21C8 18.5 7.5 15.5 8.5 12C9.2 9.5 8 8 6.5 7.5Z" opacity="0.75" />
      <path d="M17.5 7.5C17.5 7.5 21 12 20 16.5C19.3 19.5 17 21 14.5 21C16 18.5 16.5 15.5 15.5 12C14.8 9.5 16 8 17.5 7.5Z" opacity="0.75" />
    </svg>
  );
};
