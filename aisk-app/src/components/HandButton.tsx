import React from 'react';
import '../css/Button.scss';
import handLeft from '../assets/images/hand_left.svg';
import handRight from '../assets/images/hand_right.svg';

interface HandButtonProps {
    title: string;
    direction: string | undefined;
}

const HandButton: React.FC<HandButtonProps> = ({ title, direction }) => {
  return (
    <div className="hand-button-container">
      {(direction === "right") ?<img src={handRight} className="hand-right" alt='' />
      : <img src={handLeft} className="hand-left" alt='' />
      }
      <div className={(direction === "right") ? 'right-text' : 'left-text'}>{ title }</div>
    </div>
  );
};

export default HandButton;