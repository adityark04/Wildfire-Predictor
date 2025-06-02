
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { WildfireInputFeatures, HumanActivityLevel } from '../types';
import { HUMAN_ACTIVITY_OPTIONS } from '../constants';
import FormField from './FormField';

interface InputFormProps {
  initialFeatures: WildfireInputFeatures;
  onSubmit: (features: WildfireInputFeatures) => void;
  isLoading: boolean;
}

const PredictIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-5 h-5 ${className}`}>
        <path d="M12.378 1.602a.75.75 0 00-.756 0L3.469 6.23a.75.75 0 00-.47.677v11.056c0 .718.894 1.132 1.524.732L12 14.282l7.477 4.413c.63.399 1.523-.015 1.523-.732V6.907a.75.75 0 00-.47-.677L12.378 1.602zM12 12.75a.75.75 0 00.75-.75V4.5a.75.75 0 00-1.5 0v7.5c0 .414.336.75.75.75z" />
    </svg>
);


const InputForm: React.FC<InputFormProps> = ({ initialFeatures, onSubmit, isLoading }) => {
  const [features, setFeatures] = useState<WildfireInputFeatures>(initialFeatures);
  const [errors, setErrors] = useState<Partial<Record<keyof WildfireInputFeatures, string>>>({});

  const validateField = (name: keyof WildfireInputFeatures, value: number): string => {
    switch (name) {
      case 'temperature':
        if (value < -50 || value > 60) return 'Temperature must be between -50°C and 60°C.';
        break;
      case 'humidity':
        if (value < 0 || value > 100) return 'Humidity must be between 0% and 100%.';
        break;
      case 'windSpeed':
        if (value < 0 || value > 200) return 'Wind speed must be between 0 and 200 km/h.';
        break;
      case 'precipitation':
        if (value < 0 || value > 1000) return 'Precipitation must be between 0 and 1000 mm.';
        break;
      case 'soilMoisture':
        if (value < 0 || value > 100) return 'Soil moisture must be between 0% and 100%.';
        break;
      case 'vegetationIndex':
        if (value < -1 || value > 1) return 'NDVI must be between -1.0 and 1.0.'; // NDVI typically -1 to 1
        break;
    }
    return '';
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let parsedValue: string | number = value;
    if (e.target.type === 'number' && name !== 'humanActivity') {
      parsedValue = parseFloat(value);
    }
    
    setFeatures(prev => ({ ...prev, [name]: parsedValue }));

    if (e.target.type === 'number' && name !== 'humanActivity') {
        const error = validateField(name as keyof WildfireInputFeatures, parsedValue as number);
        setErrors(prev => ({ ...prev, [name]: error }));
    } else {
        setErrors(prev => ({ ...prev, [name]: ''}));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Check all fields for errors before submitting
    let formIsValid = true;
    const currentErrors: Partial<Record<keyof WildfireInputFeatures, string>> = {};
    (Object.keys(features) as Array<keyof WildfireInputFeatures>).forEach(key => {
        if (typeof features[key] === 'number') {
            const error = validateField(key, features[key] as number);
            if (error) {
                currentErrors[key] = error;
                formIsValid = false;
            }
        }
    });
    setErrors(currentErrors);

    if (formIsValid) {
        onSubmit(features);
    } else {
        // Optionally, focus the first field with an error or show a general message
        console.log("Form has validation errors:", currentErrors);
    }
  };
  
  const inputClass = "w-full p-3 bg-slate-700 border border-slate-600 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-colors text-sky-100 placeholder-sky-500";
  const selectClass = `${inputClass} appearance-none`;


  return (
    <form onSubmit={handleSubmit} className="space-y-0">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
        <FormField id="temperature" label="Temperature" unit="°C" description="Average air temperature." error={errors.temperature}>
          <input type="number" name="temperature" id="temperature" value={features.temperature} onChange={handleChange} className={inputClass} step="0.1" required />
        </FormField>
        <FormField id="humidity" label="Humidity" unit="%" description="Relative humidity." error={errors.humidity}>
          <input type="number" name="humidity" id="humidity" value={features.humidity} onChange={handleChange} className={inputClass} step="0.1" required />
        </FormField>
        <FormField id="windSpeed" label="Wind Speed" unit="km/h" description="Average wind speed." error={errors.windSpeed}>
          <input type="number" name="windSpeed" id="windSpeed" value={features.windSpeed} onChange={handleChange} className={inputClass} step="0.1" required />
        </FormField>
        <FormField id="precipitation" label="Precipitation" unit="mm" description="Total precipitation in the last 7 days." error={errors.precipitation}>
          <input type="number" name="precipitation" id="precipitation" value={features.precipitation} onChange={handleChange} className={inputClass} step="0.1" required />
        </FormField>
        <FormField id="soilMoisture" label="Soil Moisture" unit="%" description="Average soil moisture content." error={errors.soilMoisture}>
          <input type="number" name="soilMoisture" id="soilMoisture" value={features.soilMoisture} onChange={handleChange} className={inputClass} step="0.1" required />
        </FormField>
        <FormField id="vegetationIndex" label="Vegetation Index" unit="NDVI" description="Normalized Difference Vegetation Index (e.g., 0.0 to 1.0)." error={errors.vegetationIndex}>
          <input type="number" name="vegetationIndex" id="vegetationIndex" value={features.vegetationIndex} onChange={handleChange} className={inputClass} step="0.01" min="-1" max="1" required />
        </FormField>
      </div>
      <FormField id="humanActivity" label="Human Activity Level" description="Proximity to campgrounds, power lines, roads etc.">
        <div className="relative">
            <select name="humanActivity" id="humanActivity" value={features.humanActivity} onChange={handleChange} className={selectClass} required>
            {HUMAN_ACTIVITY_OPTIONS.map(level => (
                <option key={level} value={level}>{level}</option>
            ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-sky-400">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
        </div>
      </FormField>
      
      <button 
        type="submit" 
        disabled={isLoading || Object.values(errors).some(e => e !== '')}
        className="w-full mt-6 flex items-center justify-center text-lg font-semibold py-3 px-6 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-800"
      >
        {isLoading ? (
            <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Predicting...
            </>
        ) : (
            <>
                <PredictIcon className="mr-2" />
                Predict Wildfire Risk
            </>
        )}
      </button>
    </form>
  );
};

export default InputForm;
