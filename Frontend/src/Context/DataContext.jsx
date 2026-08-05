import React from 'react'
import { createContext, useState } from 'react'

export const GlobalState = createContext();

function DataProvider({ children }) {
  const [products, setProducts] = useState([]);

  return (
    <GlobalState.Provider value={{ products, setProducts }}>
      {children}
    </GlobalState.Provider>
  );
}

export default DataProvider
