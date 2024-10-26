import React, { createContext, useState, ReactNode } from 'react';

interface HoverContextProps {
  hoveredSide: 'left' | 'right' | null;
  setHoveredSide: (side: 'left' | 'right' | null) => void;
}

export const HoverContext = createContext<HoverContextProps>({
  hoveredSide: null,
  setHoveredSide: () => {},
});

export const HoverProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [hoveredSide, setHoveredSide] = useState<'left' | 'right' | null>(null);

  return (
    <HoverContext.Provider value={{ hoveredSide, setHoveredSide }}>
      {children}
    </HoverContext.Provider>
  );
};
