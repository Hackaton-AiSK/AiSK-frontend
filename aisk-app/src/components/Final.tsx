import React from 'react';
import '../css/Final.scss';

interface FinalProps {
    title: string;
}

const Final: React.FC<FinalProps> = ({ title }) => {
  return (
    <div className="final-container">
      <p className="final-title">주문 완료</p>
      <p className="final-number">15번</p>
    </div>
  );
};

export default Final;