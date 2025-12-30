// FIX: Import ComponentType from React to resolve 'React' namespace error.
import type { ComponentType } from 'react';

export enum ActionType {
  Outline = 'OUTLINE',
  Draft = 'DRAFT',
  Enhance = 'ENHANCE',
  Polish = 'POLISH',
  Design = 'DESIGN',
  Title = 'TITLE',
}

export interface Action {
  id: ActionType;
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
}