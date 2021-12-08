import React from 'react';
import './Button.css';
import { Link } from 'react-router-dom';

const STYLES = ['Btn--primary', 'Btn--outline', 'Btn--test'];

const SIZES = ['Btn--medium', 'Btn--large'];

export const Button = ({
  children,
  type,
  onClick,
  buttonStyle,
  buttonSize
}) => {
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];

  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  return (
      <button
        className={`Btn ${checkButtonStyle} ${checkButtonSize}`}
        onClick={onClick}
        type={type}
      >
        {children}
      </button>
  );
};