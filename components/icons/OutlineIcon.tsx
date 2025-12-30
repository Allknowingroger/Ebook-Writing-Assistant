import React from 'react';

const OutlineIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <path d="M4 6l4 -1l4 1l4 -1l4 1v12l-4 -1l-4 1l-4 -1l-4 1v-12"></path>
    <path d="M12 5.5v13"></path>
    <path d="M8 7v10"></path>
    <path d="M16 7v10"></path>
  </svg>
);

export default OutlineIcon;
