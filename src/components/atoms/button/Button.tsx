// Button.jsx
import React from 'react';
import './Button.scss';
import { ButtonTypes } from '../../../types/ButtonTypes';
import { LucideIcon } from 'lucide-react';

type Props = {
  content?: string | number;
  color?: string;
  variant: ButtonTypes;
  disabled?: boolean;
  className?: string;
  width?: number | string;
  height?: number;
  icon?: LucideIcon;
  iconSize?: number;
  bgColor?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  id?: string;
};

const Button: React.FC<Props> = ({
  content, // text of the button
  color, // Custom color of the content
  variant = ButtonTypes.primary, // Type of the button
  disabled = false,
  className = '', // Additional classnames
  width, // Custom width of the button
  height, // Custom height of the button
  icon: IconComponent, // Icon type, from react-lucid: https://lucide.dev/icons/
  iconSize, // Size of an icon, default is 20
  bgColor, // Background color of the button, used for color selector buttons
  onClick,
  id,
}) => {
  // Create classes depending on the button properties
  const buttonClasses = `
    button 
    button--${variant} 
    ${disabled ? 'button--disabled' : ''}
    ${className}
  `;

  return (
    <button
      id={id}
      className={buttonClasses}
      disabled={disabled}
      style={{ backgroundColor: bgColor, width, height, color }}
      onClick={onClick}
    >
      {IconComponent && (
        <IconComponent size={iconSize} className="button-icon" />
      )}
      {content}
    </button>
  );
};

export default Button;
