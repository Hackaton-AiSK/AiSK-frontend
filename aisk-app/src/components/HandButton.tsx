import React from 'react';
import '../css/Button.scss';
import handLeft from '../assets/images/hand_left.svg';
import handRight from '../assets/images/hand_right.svg';

interface HandButtonProps {
    direction: string | undefined;
    onClick?: () => void;
}

const HandButton: React.FC<HandButtonProps> = ({ direction, onClick }) => {

  return (
    <div className="hand-button-container">
      {(direction === "right") ? <img src={handRight} onClick={onClick} className="hand-right" alt='' />
      : <img src={handLeft} onClick={onClick} className="hand-left" alt='' />
      }
      {(direction === "right") ?  <div className='right-text' onClick={onClick}>말 끊기</div>
      : <div className='left-text' onClick={onClick}>전체<br/>메뉴<br/>보기</div>
      }
    </div>
  );
};

export default HandButton;