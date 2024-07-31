"use client"

import { createContext, useState, useContext } from 'react';

const SheetContext = createContext();

export const SheetProvider = ({ children }) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [initialStatus, setInitialStatus] = useState('');
  const [initialTask, setInitialTask] = useState(null);

  // const openSheet = () => setIsSheetOpen(true);
  // const closeSheet = () => setIsSheetOpen(false);
  
  const openSheet = (status = '',task=null) => {
    setInitialTask(task);
    setInitialStatus(status);
    setIsSheetOpen(true);
};

const closeSheet = () => {
    setIsSheetOpen(false);
    setInitialStatus('');
    setInitialTask(null);
};

  return (
    <SheetContext.Provider value={{ isSheetOpen, openSheet, closeSheet,initialStatus,initialTask  }}>
      {children}
    </SheetContext.Provider>
  );
};

export const useSheet = () => useContext(SheetContext);
