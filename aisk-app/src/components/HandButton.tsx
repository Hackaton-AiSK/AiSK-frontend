import React from 'react';
import '../css/Button.scss';
import handLeft from '../assets/images/hand_left.svg';
import handRight from '../assets/images/hand_right.svg';

interface HandButtonProps {
    direction: string | undefined;
}

const HandButton: React.FC<HandButtonProps> = ({ direction }) => {

  const handleRightClick = () => {
    console.log('right clicked');
  }

  const handleLeftClick = () => {
    console.log('left clicked');
  }

  return (
    <div className="hand-button-container">
      {(direction === "right") ? <img src={handRight} onClick={() => handleRightClick()} className="hand-right" alt='' />
      : <img src={handLeft} onClick={() => handleLeftClick()} className="hand-left" alt='' />
      }
      {(direction === "right") ?  <div className='right-text'>말 끊기</div>
      : <div className='left-text'>전체<br/>메뉴<br/>보기</div>
      }
    </div>
  );
};

export default HandButton;