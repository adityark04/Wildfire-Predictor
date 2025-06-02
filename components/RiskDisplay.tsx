
import React from 'react';
import { PredictionResult, RiskLevel } from '../types';
import { RISK_LEVEL_STYLES } from '../constants';

interface RiskDisplayProps {
  result: PredictionResult;
}

const RiskDisplay: React.FC<RiskDisplayProps> = ({ result }) => {
  const { riskProbability, riskLevel, assessment } = result;
  const riskStyles = RISK_LEVEL_STYLES[riskLevel];
  const probabilityPercentage = (riskProbability * 100).toFixed(1);

  return (
    <div className={`p-6 rounded-xl shadow-xl border-2 ${riskStyles.border} bg-slate-800/70 backdrop-blur-sm`}>
      <h2 className="text-3xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-indigo-400">
        Wildfire Risk Assessment
      </h2>

      <div className="grid md:grid-cols-2 gap-6 items-center">
        {/* Risk Probability & Level */}
        <div className="flex flex-col items-center justify-center p-4">
          <div className="relative w-40 h-40 sm:w-48 sm:h-48">
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <path
                className="text-slate-700"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                strokeWidth="3"
              />
              <path
                className={riskStyles.text.replace('text-', 'stroke-')} // Use stroke- for SVG path
                strokeDasharray={`${probabilityPercentage}, 100`}
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                strokeWidth="3"
                strokeLinecap="round"
                transform="rotate(-90 18 18)"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-4xl font-bold ${riskStyles.text}`}>
                {probabilityPercentage}%
              </span>
              <span className="text-sm text-sky-400">Probability</span>
            </div>
          </div>
          <div className={`mt-4 px-6 py-2 rounded-full ${riskStyles.bg} ${riskStyles.text} text-lg font-semibold shadow-md`}>
            Risk Level: {riskLevel}
          </div>
        </div>

        {/* Assessment Text */}
        <div className="bg-slate-700/50 p-5 rounded-lg shadow-inner">
          <h3 className="text-xl font-semibold text-sky-300 mb-3">AI Assessment:</h3>
          <p className="text-sky-200 leading-relaxed text-justify">
            {assessment}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RiskDisplay;
