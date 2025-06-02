
import React from 'react';

interface FormFieldProps {
  id: string;
  label: string;
  unit?: string;
  description: string;
  children: React.ReactNode; // The input element itself
  error?: string;
}

const FormField: React.FC<FormFieldProps> = ({ id, label, unit, description, children, error }) => (
  <div className="mb-6 p-4 bg-slate-800/70 rounded-lg shadow-md border border-slate-700 hover:border-sky-600 transition-colors duration-300">
    <label htmlFor={id} className="block text-md font-semibold text-sky-300 mb-1">
      {label} {unit && <span className="text-sm text-sky-500">({unit})</span>}
    </label>
    <p className="text-xs text-sky-400 mb-3">{description}</p>
    {children}
    {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
  </div>
);

export default FormField;
