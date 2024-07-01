import React from 'react';

const alertWarning = ({ area, description, instruction }) => {
  return (
    <div className="alertModal">
      <p>{area}</p>
      <p>{description}</p>
      <p>{instruction}</p>
    </div>
  );
};

export default alertWarning;
