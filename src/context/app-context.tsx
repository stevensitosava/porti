'use client';

import { createContext, useContext, useState } from 'react';

/**
 * Defines the shape of the application context.
 * @interface AppContextType
 */
interface AppContextType {
  /** Whether the page is currently loading */
  isLoading: boolean;
  /** Function to set the loading state */
  setIsLoading: (isLoading: boolean) => void;
  /** The name of the currently open modal, or null if no modal is open */
  modalOpen: string | null;
  /** Function to set the currently open modal */
  setModalOpen: (modalOpen: string | null) => void;
  /** The current filter applied to projects, containing a 'tag' property */
  projectFilter: { tag: string | null };
  /** Function to set the project filter */
  setProjectFilter: (filter: { tag: string | null }) => void;
}

/**
 * Creates the React context for the application.
 * @type {React.Context<AppContextType | undefined>}
 */
export const AppContext = createContext<AppContextType | undefined>(undefined);

/**
 * Props for the AppContextProvider component.
 * @interface AppContextProviderProps
 * @property {React.ReactNode} children - The child components to be rendered within the provider.
 */
interface AppContextProviderProps {
  children: React.ReactNode;
}

/**
 * Provides the application context to its children.
 * Manages the state for modal openness and project filtering.
 * @param {AppContextProviderProps} { children } - The props object containing children.
 * @returns {JSX.Element} The context provider component.
 */
export function AppContextProvider({ children }: AppContextProviderProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [modalOpen, setModalOpen] = useState<string | null>(null);
  const [projectFilter, setProjectFilter] = useState<{ tag: string | null }>({ tag: null });

  const value = {
    isLoading,
    setIsLoading,
    modalOpen,
    setModalOpen,
    projectFilter,
    setProjectFilter,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within a AppContextProvider');
  }
  return context;
};
