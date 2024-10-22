'use client';
import { ReactNode } from 'react';
import { SWRConfig } from 'swr';
interface SWRProviderProps {
    children: ReactNode;
  }
export const SWRProvider = ({ children }: SWRProviderProps) => {
  return <SWRConfig>{children}</SWRConfig>
};