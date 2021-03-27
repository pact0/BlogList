import React from "react";
import PropTypes from "prop-types";

const Button = ({ handleAction, text }) => {
  return (
    <div>
      <button onClick={handleAction}>{text}</button>
    </div>
  );
};

export default Button;

Button.propTypes = {
  text: PropTypes.string.isRequired,
};
