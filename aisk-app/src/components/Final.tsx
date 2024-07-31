import React from 'react';
import '../css/Final.scss';

interface FinalProps {
    title: string;
}

const Final: React.FC<FinalProps> = ({ title }) => {
  return (
    <div className="final-container">
      <p className="final-title">주문 완료</p>
    </div>
  );
};

export default Final;