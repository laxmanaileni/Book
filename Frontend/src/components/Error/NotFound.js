import React from 'react'
import './NotFound.css';
function NotFound() {
  return (
        <div className='notfound' data-testid="fallback-component">
        <h1>404 - Page Not Found</h1>
        <p>Sorry, the page you're looking for does not exist.</p>
      </div>
  )
}

export default NotFound;

