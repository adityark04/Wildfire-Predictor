
import React, { useState, useCallback } from 'react';
import { WildfireInputFeatures, PredictionResult, RiskLevel } from './types';
import { DEFAULT_INPUT_FEATURES } from './constants';
import Header from './components/Header';
import Footer from './components/Footer';
import InputForm from './components/InputForm';
import RiskDisplay from './components/RiskDisplay';
import Loader from './components/Loader';
import { getWildfireRisk } from './services/predictionService';

const App: React.FC = () => {
  const [inputFeatures, setInputFeatures] = useState<WildfireInputFeatures>(DEFAULT_INPUT_FEATURES);
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handlePredict = useCallback(async (features: WildfireInputFeatures) => {
    setInputFeatures(features);
    setIsLoading(true);
    setError(null);
    setPredictionResult(null);

    // Basic API Key Check
    if (!process.env.API_KEY) {
        setError("API Key is missing. Please ensure it's configured in the environment.");
        setIsLoading(false);
        return;
    }
    
    try {
      const result = await getWildfireRisk(features);
      setPredictionResult(result);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred during prediction.');
      }
      console.error("Prediction error:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-slate-800/50 backdrop-blur-md p-6 sm:p-8 rounded-xl shadow-2xl">
          <p className="text-sky-300 mb-6 text-center text-lg">
            Enter environmental and human activity data to predict wildfire risk using our AI-powered model.
          </p>
          
          <InputForm
            initialFeatures={inputFeatures}
            onSubmit={handlePredict}
            isLoading={isLoading}
          />

          {isLoading && (
            <div className="mt-8 flex justify-center">
              <Loader />
            </div>
          )}

          {error && (
            <div className="mt-8 p-4 bg-red-500/20 border border-red-700 text-red-300 rounded-lg text-center">
              <h3 className="font-bold text-lg mb-2">Prediction Error</h3>
              <p>{error}</p>
            </div>
          )}

          {predictionResult && !isLoading && !error && (
            <div className="mt-8">
              <RiskDisplay result={predictionResult} />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
