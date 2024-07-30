import React from 'react';
import '../css/Button.scss';

interface HandButtonProps {
    title: string;
}

const HandButton: React.FC<HandButtonProps> = ({ title }) => {
  return (
    <div className="hand-button-container">
      <div>{ title }</div>
    </div>
  );
};

export default HandButton;