"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

//Create the context, just holds a number (screen width)
const ScreenWidthContext = createContext<number>(0);

//Export a simple hook to use it anywhere
export function useScreenWidth() {
  return useContext(ScreenWidthContext);
}

//The provider component that updates width globally
export function ScreenWidthProvider({ children }: { children: React.ReactNode }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => setWidth(window.innerWidth);
    updateWidth(); // set initial width
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return (
    <ScreenWidthContext.Provider value={width}>
      {children}
    </ScreenWidthContext.Provider>
  );
}
