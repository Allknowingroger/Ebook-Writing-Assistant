import React, { useState, useEffect } from 'react';
import type { Action } from '../types';
import { ActionType } from '../types';
import Spinner from './Spinner';

interface ActionPanelProps {
  activeAction: ActionType;
  inputValues: { [key: string]: string };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: () => void;
  output: string;
  isLoading: boolean;
  error: string | null;
}

const actionDetails: { [key in ActionType]: { title: string; description: string } } = {
    [ActionType.Outline]: { title: 'Outline Your Ebook', description: 'Provide a topic and let the AI generate a comprehensive 10-chapter outline.' },
    [ActionType.Draft]: { title: 'Draft a Chapter', description: 'Input a chapter number, an outline point, and a desired tone to get a first draft.' },
    [ActionType.Enhance]: { title: 'Enhance With Stories', description: 'Paste your chapter text to enrich it with relevant examples and case studies.' },
    [ActionType.Polish]: { title: 'Polish for Flow and Style', description: 'Submit your draft to improve clarity, engagement, and consistency.' },
    [ActionType.Design]: { title: 'Get Formatting Ideas', description: 'Specify your design tool to receive tailored formatting suggestions for a professional look.' },
    [ActionType.Title]: { title: 'Craft a Marketable Title', description: 'Enter your ebook\'s topic to generate 10 catchy and effective title options.' },
};


const CommonInput: React.FC<{ label: string; name: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; placeholder: string }> = ({ label, name, value, onChange, placeholder }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <input
            type="text"
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
    </div>
);

const CommonTextarea: React.FC<{ label: string; name: string; value: string; onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; placeholder: string; rows?: number }> = ({ label, name, value, onChange, placeholder, rows = 4 }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <textarea
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows={rows}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 resize-y"
        />
    </div>
);

const ActionPanel: React.FC<ActionPanelProps> = ({
  activeAction,
  inputValues,
  handleInputChange,
  handleSubmit,
  output,
  isLoading,
  error,
}) => {
    const [copySuccess, setCopySuccess] = useState('');

    useEffect(() => {
        if(copySuccess) {
            const timer = setTimeout(() => setCopySuccess(''), 2000);
            return () => clearTimeout(timer);
        }
    }, [copySuccess]);

    const handleCopy = () => {
        navigator.clipboard.writeText(output).then(() => {
            setCopySuccess('Copied!');
        }, () => {
            setCopySuccess('Failed to copy');
        });
    };
    
  const renderForm = () => {
    switch (activeAction) {
      case ActionType.Outline:
      case ActionType.Title:
        return <CommonTextarea label="Ebook Topic" name="topic" value={inputValues.topic || ''} onChange={handleInputChange} placeholder="e.g., The Future of Renewable Energy" />;
      case ActionType.Draft:
        return (
          <div className="space-y-4">
            <CommonInput label="Chapter Number" name="chapterNumber" value={inputValues.chapterNumber || ''} onChange={handleInputChange} placeholder="e.g., 3" />
            <CommonTextarea label="Outline Point" name="outlinePoint" value={inputValues.outlinePoint || ''} onChange={handleInputChange} placeholder="e.g., Key Innovations in Solar Panel Technology" />
            <CommonInput label="Tone" name="tone" value={inputValues.tone || ''} onChange={handleInputChange} placeholder="e.g., casual, professional, motivational" />
          </div>
        );
      case ActionType.Enhance:
      case ActionType.Polish:
        return <CommonTextarea label="Chapter Text" name="chapterText" value={inputValues.chapterText || ''} onChange={handleInputChange} placeholder="Paste your draft chapter here..." rows={8} />;
      case ActionType.Design:
        return <CommonInput label="Design Tool" name="designTool" value={inputValues.designTool || ''} onChange={handleInputChange} placeholder="e.g., Canva, Word, InDesign" />;
      default:
        return null;
    }
  };

  const details = actionDetails[activeAction];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">{details.title}</h2>
        <p className="mt-2 text-gray-500">{details.description}</p>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <div className="space-y-4">
            {renderForm()}
        </div>
        <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="mt-6 w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed"
        >
            {isLoading ? <Spinner /> : 'Generate'}
        </button>
      </div>

      {(output || isLoading || error) && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Result</h3>
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm relative">
            {isLoading && (
              <div className="flex flex-col items-center justify-center min-h-[200px] text-gray-500">
                <Spinner />
                <p className="mt-2">Generating content...</p>
              </div>
            )}
            {error && <div className="text-red-600 bg-red-50 p-4 rounded-md">{error}</div>}
            {output && !isLoading && (
              <>
                <button 
                  onClick={handleCopy}
                  className="absolute top-4 right-4 bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-semibold py-1 px-3 rounded-full"
                >
                  {copySuccess || 'Copy'}
                </button>
                <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">{output}</div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ActionPanel;
