// TransitionWrapper.tsx
import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useLocation } from 'react-router-dom';
import '../css/Transition.scss';

interface TransitionWrapperProps {
  children: React.ReactNode;
}

const TransitionWrapper: React.FC<TransitionWrapperProps> = ({ children }) => {
  const location = useLocation();

  return (
    <TransitionGroup>
      <CSSTransition
        key={location.key}
        timeout={200}
        classNames="fade"
      >
        {children}
      </CSSTransition>
    </TransitionGroup>
  );
};

export default TransitionWrapper;
