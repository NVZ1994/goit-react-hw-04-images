import './Button.css';
import React from 'react';
import PropTypes from 'prop-types';

export function Button({ onClick }) {
  return (
    <div className="Button-wrapper">
      <button className="Button" type="button" onClick={onClick}>
        Load more
      </button>
    </div>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
