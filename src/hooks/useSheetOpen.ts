'use client';

import { useState } from 'react';

export const useOpenSheet = () => {
  const [isOpen, setIsOpen] = useState(false);

  const changeSheetState = () => {
    setIsOpen((prev) => !prev);
  };

  return { isOpen, changeSheetState };
};
