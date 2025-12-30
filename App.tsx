import React, { useState, useCallback } from 'react';
import { ActionType } from './types';
import Sidebar from './components/Sidebar';
import ActionPanel from './components/ActionPanel';
import { runAction } from './services/geminiService';

const App: React.FC = () => {
  const [activeAction, setActiveAction] = useState<ActionType>(ActionType.Outline);
  const [inputValues, setInputValues] = useState<{ [key: string]: string }>({
    topic: 'Sustainable living for beginners',
    chapterNumber: '1',
    outlinePoint: 'The "Why" of Sustainable Living: Understanding the Impact',
    chapterText: 'Sustainable living is more than just a trend; it\'s a conscious choice to minimize our environmental footprint. This chapter explores the fundamental reasons why this lifestyle is crucial for the planet and for our own well-being. We will look at climate change, resource depletion, and the personal benefits of a simpler, more mindful existence.',
    designTool: 'Canva',
  });
  const [output, setOutput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleActionSelect = useCallback((action: ActionType) => {
    setActiveAction(action);
    setOutput('');
    setError(null);
  }, []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInputValues(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(async () => {
    setIsLoading(true);
    setOutput('');
    setError(null);
    try {
      const result = await runAction(activeAction, inputValues);
      setOutput(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [activeAction, inputValues]);

  return (
    <div className="flex h-screen font-sans text-gray-800">
      <Sidebar activeAction={activeAction} onActionSelect={handleActionSelect} />
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <ActionPanel
            activeAction={activeAction}
            inputValues={inputValues}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            output={output}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
