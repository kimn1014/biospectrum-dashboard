'use client';

import { ReactNode } from 'react';
import { useAuth } from '@/context/AuthContext';
import LoginScreen from './LoginScreen';
import Navbar from './Navbar';

interface AuthWrapperProps {
  children: ReactNode;
}

export default function AuthWrapper({ children }: AuthWrapperProps) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <LoginScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="pt-16">
        {children}
      </main>
    </div>
  );
}
