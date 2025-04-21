// Button.jsx
import React from 'react';
import './Button.scss';
import { ButtonTypes } from '../../../types/ButtonTypes';

type Props = {
  content?: string | number;
  variant: ButtonTypes;
  disabled?: boolean;
  className?: string;
};

const Button: React.FC<Props> = ({
  content,
  variant = ButtonTypes.primary,
  disabled = false,
  className = '',
}) => {
  // Create classes depending on the button properties
  const buttonClasses = `
    button 
    button--${variant} 
    ${disabled ? 'button--disabled' : ''}
    ${className}
  `;

  return (
    <button className={buttonClasses} disabled={disabled}>
      {content}
    </button>
  );
};

export default Button;
