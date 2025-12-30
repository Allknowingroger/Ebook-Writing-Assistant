import React from 'react';
import type { Action } from '../types';
import { ActionType } from '../types';
import OutlineIcon from './icons/OutlineIcon';
import DraftIcon from './icons/DraftIcon';
import EnhanceIcon from './icons/EnhanceIcon';
import PolishIcon from './icons/PolishIcon';
import DesignIcon from './icons/DesignIcon';
import TitleIcon from './icons/TitleIcon';

const actions: Action[] = [
  { id: ActionType.Outline, title: 'Outline Ebook', description: 'Create a 10-chapter writing roadmap.', icon: OutlineIcon },
  { id: ActionType.Draft, title: 'Draft Chapter', description: 'Write a draft for a specific chapter.', icon: DraftIcon },
  { id: ActionType.Enhance, title: 'Add Stories', description: 'Insert case studies and examples.', icon: EnhanceIcon },
  { id: ActionType.Polish, title: 'Polish Flow', description: 'Rewrite a draft for clarity and style.', icon: PolishIcon },
  { id: ActionType.Design, title: 'Format Ideas', description: 'Get suggestions for ebook design.', icon: DesignIcon },
  { id: ActionType.Title, title: 'Craft Title', description: 'Generate marketable title options.', icon: TitleIcon },
];

interface SidebarProps {
  activeAction: ActionType;
  onActionSelect: (action: ActionType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeAction, onActionSelect }) => {
  return (
    <aside className="w-80 bg-white border-r border-gray-200 p-6 flex flex-col">
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Ebook Assistant</h1>
      <p className="text-sm text-gray-500 mb-8">Your AI-powered writing partner.</p>
      <nav className="flex flex-col space-y-2">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={() => onActionSelect(action.id)}
            className={`flex items-start text-left p-3 rounded-lg transition-colors duration-200 ${
              activeAction === action.id
                ? 'bg-blue-50 text-blue-700'
                : 'hover:bg-gray-100 text-gray-600'
            }`}
          >
            <action.icon className="h-6 w-6 mr-4 flex-shrink-0 mt-1 text-gray-400" />
            <div>
              <p className={`font-semibold ${activeAction === action.id ? 'text-blue-800' : 'text-gray-800'}`}>{action.title}</p>
              <p className="text-sm">{action.description}</p>
            </div>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
