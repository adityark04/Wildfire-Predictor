
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900/50 border-t border-slate-700/50 mt-12">
      <div className="container mx-auto px-4 py-6 text-center text-sky-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Wildfire Risk Predictor. AI-Powered Insights.</p>
        <p className="mt-1">Simulated prediction using Google Gemini API.</p>
      </div>
    </footer>
  );
};

export default Footer;
