import React from "react";
import "./Button.css";

const STYLES = ["Btn--primary", "Btn--outline", "Btn--gray", "Btn--danger"];

const SIZES = ["Btn--medium", "Btn--large", "Btn--fullWidth"];

export const Button = ({
  children,
  type,
  onClick,
  buttonStyle,
  buttonSize,
  ...rest
}) => {
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];

  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  return (
    <button
      {...rest}
      className={`Btn ${checkButtonStyle} ${checkButtonSize}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};
