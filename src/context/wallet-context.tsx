"use client";

import React, { createContext, useState, useContext, useMemo, Dispatch, SetStateAction } from 'react';

type WalletContextType = {
  balance: number;
  setBalance: Dispatch<SetStateAction<number>>;
};

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [balance, setBalance] = useState<number>(500);

  const value = useMemo(() => ({ balance, setBalance }), [balance]);

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}
