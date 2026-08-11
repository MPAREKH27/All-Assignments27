import React, { useState } from 'react';
import { FieldDefinition } from '../types';
import { Trophy, Check, AlertCircle, Sparkles, Send, RotateCcw } from 'lucide-react';

interface DynamicFormProps {
  /** Array of field definitions passed as props */
  fields: FieldDefinition[];
  /** Callback fired on form submission with form values */
  onSubmit?: (data: Record<string, any>) => void;
  /** Custom form title */
  title?: string;
  /** Custom subtitle */
  subtitle?: string;
  /** Submit button text */
  submitText?: string;
}

export const DynamicForm: React.FC<DynamicFormProps> = ({
  fields,
  onSubmit,
  title = 'IPL Fantasy League - Sign Up',
  subtitle = 'Create your fantasy cricket manager account & assemble your dream XI',
  submitText = 'Register & Build XI',
}) => {
  // Initialize form state from field definitions
  const initialValues = fields.reduce<Record<string, any>>((acc, field) => {
    acc[field.name] = field.defaultValue ?? (field.type === 'checkbox' ? false : '');
    return acc;
  }, {});

  const [formData, setFormData] = useState<Record<string, any>>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedValues, setSubmittedValues] = useState<Record<string, any> | null>(null);

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    fields.forEach((field) => {
      const val = formData[field.name];
      if (field.required) {
        if (field.type === 'checkbox' && !val) {
          newErrors[field.name] = `You must accept ${field.label}`;
        } else if (val === undefined || val === null || (typeof val === 'string' && val.trim() === '')) {
          newErrors[field.name] = `${field.label} is required`;
        }
      }
      if (field.type === 'email' && val && typeof val === 'string') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(val)) {
          newErrors[field.name] = 'Please enter a valid email address';
        }
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitted(true);
      setSubmittedValues(formData);
      onSubmit?.(formData);
    }
  };

  const handleReset = () => {
    setFormData(initialValues);
    setErrors({});
    setIsSubmitted(false);
    setSubmittedValues(null);
  };

  // Helper to render field dynamically based on type
  const renderFieldInput = (field: FieldDefinition) => {
    const value = formData[field.name] ?? '';
    const hasError = !!errors[field.name];

    const commonClasses = `w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all focus:outline-none ${
      hasError
        ? 'border-red-400 bg-red-50/50 text-red-900 focus:ring-2 focus:ring-red-200'
        : 'border-slate-300 bg-white text-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
    }`;

    switch (field.type) {
      case 'text':
      case 'email':
      case 'password':
      case 'number':
        return (
          <input
            id={`field-${field.name}`}
            type={field.type}
            value={value}
            onChange={(e) => handleChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            className={commonClasses}
          />
        );

      case 'textarea':
        return (
          <textarea
            id={`field-${field.name}`}
            value={value}
            onChange={(e) => handleChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            rows={3}
            className={commonClasses}
          />
        );

      case 'select':
        return (
          <select
            id={`field-${field.name}`}
            value={value}
            onChange={(e) => handleChange(field.name, e.target.value)}
            className={commonClasses}
          >
            <option value="">-- {field.placeholder || 'Select an option'} --</option>
            {field.options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        );

      case 'radio':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
            {field.options?.map((opt) => {
              const isSelected = value === opt.value;
              return (
                <label
                  key={opt.value}
                  className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50/80 text-indigo-900 font-semibold shadow-xs'
                      : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100/80 text-slate-700'
                  }`}
                >
                  <input
                    type="radio"
                    name={field.name}
                    value={opt.value}
                    checked={isSelected}
                    onChange={() => handleChange(field.name, opt.value)}
                    className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-slate-300"
                  />
                  <span className="text-xs">{opt.label}</span>
                </label>
              );
            })}
          </div>
        );

      case 'checkbox':
        return (
          <label className="flex items-start gap-3 cursor-pointer pt-1">
            <input
              id={`field-${field.name}`}
              type="checkbox"
              checked={!!value}
              onChange={(e) => handleChange(field.name, e.target.checked)}
              className="mt-0.5 w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
            />
            <span className="text-xs text-slate-600 leading-snug">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </span>
          </label>
        );

      default:
        return null;
    }
  };

  return (
    <div id="dynamic-form-container" className="bg-white rounded-3xl border border-slate-200/80 shadow-xl overflow-hidden">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 p-6 sm:p-8 text-white relative">
        <div className="absolute top-4 right-4 text-indigo-400/20 pointer-events-none">
          <Trophy className="w-24 h-24" />
        </div>
        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-400/20 border border-yellow-400/30 text-yellow-300 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Generic Dynamic Form Prop Scaffold
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">{title}</h2>
          <p className="text-xs sm:text-sm text-indigo-200 mt-1">{subtitle}</p>
        </div>
      </div>

      {/* Form Content */}
      <div className="p-6 sm:p-8">
        {isSubmitted && submittedValues ? (
          /* Submitted State Showcase */
          <div className="space-y-6">
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-emerald-900">Registration Successful!</h4>
                <p className="text-xs text-emerald-700 mt-0.5">
                  Welcome to IPL Fantasy League 2026. Your squad budget of ₹100 Cr has been credited.
                </p>
              </div>
            </div>

            {/* Render Data Summary */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
              <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200 pb-2">
                Registered Profile Payload (Props Data)
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {fields.map((f) => (
                  <div key={f.name} className="p-2.5 bg-white rounded-xl border border-slate-100">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">{f.label}</span>
                    <span className="font-semibold text-slate-800 break-words">
                      {typeof submittedValues[f.name] === 'boolean'
                        ? submittedValues[f.name]
                          ? 'Accepted Yes'
                          : 'No'
                        : submittedValues[f.name] || 'N/A'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleReset}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-md transition-all"
            >
              <RotateCcw className="w-4 h-4" /> Reset Form
            </button>
          </div>
        ) : (
          /* Dynamic Field Generator Form */
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {fields.map((field) => {
                const isFullWidth = field.type === 'textarea' || field.type === 'checkbox' || field.type === 'radio';
                return (
                  <div
                    key={field.name}
                    className={isFullWidth ? 'sm:col-span-2 space-y-1.5' : 'space-y-1.5'}
                  >
                    {field.type !== 'checkbox' && (
                      <label
                        htmlFor={`field-${field.name}`}
                        className="block text-xs font-bold text-slate-700 uppercase tracking-wider"
                      >
                        {field.label} {field.required && <span className="text-red-500">*</span>}
                      </label>
                    )}

                    {renderFieldInput(field)}

                    {field.helpText && !errors[field.name] && (
                      <p className="text-[11px] text-slate-400">{field.helpText}</p>
                    )}

                    {errors[field.name] && (
                      <p className="text-[11px] text-red-600 font-medium flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors[field.name]}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Form Actions */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="px-5 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              >
                Clear Fields
              </button>
              <button
                type="submit"
                id="submit-fantasy-form-btn"
                className="px-6 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md shadow-indigo-200 transition-all flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                {submitText}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
