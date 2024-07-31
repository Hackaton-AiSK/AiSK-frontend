import React from 'react';
import '../css/Info.scss';
import question from '../assets/images/question.svg'

interface InfoProps {
    title: string;
}

const Info: React.FC<InfoProps> = ({ title }) => {
  return (
    <div className="info-container">
      <img src={question} className="question-mark" alt='' />
      <p style={{fontSize : '32px', marginBottom: '5px'}}>“메뉴를 살펴보고 싶어"</p>
      <p>“바로 주문할게"</p>
      <p>“메뉴 추천해 줘"</p>
    </div>
  );
};

export default Info;