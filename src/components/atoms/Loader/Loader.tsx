import React from 'react';
import './Loader.scss';

export const Loader: React.FC = () => (
  <div className="Loader" data-cy="loader">
    <div className="Loader__outer" />
    <div className="Loader__inner" />
  </div>
);
