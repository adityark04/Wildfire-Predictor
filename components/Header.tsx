
import React from 'react';

const FireIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={`w-8 h-8 ${className}`}
  >
    <path fillRule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071 1.056 9.769 9.769 0 01-2.333 3.527 9.768 9.768 0 01-3.527 2.333A.75.75 0 006.805 10.5a.75.75 0 001.056 1.071 8.269 8.269 0 002.912-1.965 8.268 8.268 0 001.965-2.912A.75.75 0 0012.963 2.286zM12.963 2.286c.412-.412 1.02-.588 1.522-.588.765 0 1.48.325 2.015.888C17.733 3.711 19.5 5.781 19.5 8.25c0 2.912-2.334 4.845-3.999 6.239a.75.75 0 01-1.094-1.022A10.5 10.5 0 0015.75 8.25c0-1.49-.765-2.876-1.902-3.886a.75.75 0 00-1.071 1.056 8.268 8.268 0 01-2.333 3.527 8.269 8.269 0 01-3.527 2.333.75.75 0 00-.129 1.487A11.267 11.267 0 0010.5 19.5c.182 0 .363-.008.543-.023a.75.75 0 00.184-1.474A9.004 9.004 0 0110.5 18c0-1.95.846-3.791 2.201-5.082a.75.75 0 00.129-1.487 8.269 8.269 0 01-2.333-3.527 8.269 8.269 0 01-3.527-2.333.75.75 0 00-1.071-1.056A11.213 11.213 0 004.5 8.25c0 2.912 2.334 4.845 3.999 6.239a.75.75 0 11-1.094 1.022C5.023 13.483 3 11.161 3 8.25c0-2.469 1.767-4.539 4.015-5.675A4.497 4.497 0 019.037 1.7c.413-.412 1.02-.588 1.522-.588s1.11.176 1.522.588h-.001z" clipRule="evenodd" />
  </svg>
);


const Header: React.FC = () => {
  return (
    <header className="bg-slate-900/80 backdrop-blur-sm shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-center sm:justify-start">
        <FireIcon className="text-orange-500 mr-3" />
        <h1 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-yellow-500">
          Wildfire Risk Predictor
        </h1>
      </div>
    </header>
  );
};

export default Header;
