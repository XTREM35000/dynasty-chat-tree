
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import AuthFamily from './AuthFamily';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--whatsapp-background)]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[var(--whatsapp-green)]"></div>
      </div>
    );
  }

  if (!user) {
    return <AuthFamily onAuthSuccess={() => window.location.reload()} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
