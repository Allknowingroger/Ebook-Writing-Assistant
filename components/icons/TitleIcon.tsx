import React from 'react';

const TitleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <path d="M16 4l-9 16"></path>
    <path d="M10 4l-6 16"></path>
    <path d="M12 20h4"></path>
    <path d="M14 12h7"></path>
    <path d="M15 4h5"></path>
    <path d="M3 20h7"></path>
  </svg>
);

export default TitleIcon;
