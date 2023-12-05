import React from 'react';

const ErrorDisplay = ({ errorCode }) => {
  let errorMessage;

  switch (errorCode) {
    case 400:
      errorMessage = 'Bad Request: The server could not understand the request.';
      break;
    case 404:
      errorMessage = 'Not Found: The requested resource could not be found.';
      break;
    case 500:
      errorMessage = 'Internal Server Error: Something went wrong on the server.';
      break;
    default:
      errorMessage = 'An error occurred.';
  }

  return (
    <div className="error-container">
      <h2>Error {errorCode}</h2>
      <p>{errorMessage}</p>
    </div>
  );
};

export default ErrorDisplay;