
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-3 p-4">
      <div className="w-16 h-16 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-sky-300 text-lg font-semibold">Analyzing Data...</p>
    </div>
  );
};

export default Loader;
