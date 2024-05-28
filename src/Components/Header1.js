import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

export default function Header1({ userName }) {
  return (
    <header className='container-fluid bg-warning'>
      <div className='container p-2'>
        <div className='row align-items-center'>
          <div className='logo col-auto'>
            <h2>My logo</h2>
          </div>
          <nav className='col-auto'>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/vip">V.I.P</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/pixa">Pixa</Link></li>
              <li><Link to="/form">Form</Link></li>
            </ul>
          </nav>
          {userName && (
            <div className='col-auto'>
              <p>Welcome, {userName}! <FontAwesomeIcon icon={faCheckCircle} style={{ color: 'green' }} /></p>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
