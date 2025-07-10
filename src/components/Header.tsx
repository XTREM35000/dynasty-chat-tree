
import React, { useState, useEffect } from 'react';
import { Crown, Users, MessageCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useDynasties } from '@/hooks/useDynasties';
import { Button } from '@/components/ui/button';
import UserMenu from './UserMenu';

const Header = () => {
  const { user } = useAuth();
  const { dynasties, loading } = useDynasties();
  const [isTyping, setIsTyping] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const texts = [
    'Généalogie Dynastique',
    'Votre Famille Connectée',
    'Histoire & Traditions',
    'Liens Éternels'
  ];
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTyping(true);
      setTimeout(() => {
        setCurrentText(texts[textIndex]);
        setTextIndex((prev) => (prev + 1) % texts.length);
        setIsTyping(false);
      }, 1000);
    }, 4000);

    // Initialize first text
    setCurrentText(texts[0]);

    return () => clearInterval(interval);
  }, [textIndex, texts]);

  const totalMembers = dynasties.reduce((sum, dynasty) => sum + (dynasty.member_count || 0), 0);

  return (
    <header className="whatsapp-gradient shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo et titre */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg animate-float">
                <Crown className="w-6 h-6 text-[var(--whatsapp-green)]" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-bold">
                {dynasties.length}
              </div>
            </div>
            <div className="text-white">
              <h1 className="text-2xl font-bold">
                {isTyping ? (
                  <span className="animate-typing">Tapant...</span>
                ) : (
                  <span className="animate-slide-in-left">{currentText}</span>
                )}
              </h1>
              <p className="text-green-100 text-sm">
                Connecté en tant que {user?.user_metadata?.full_name || user?.email}
              </p>
            </div>
          </div>

          {/* Actions rapides */}
          <div className="flex items-center space-x-3">
            <div className="hidden md:flex items-center space-x-6 text-white">
              <div className="text-center">
                <div className="text-2xl font-bold">{loading ? '...' : dynasties.length}</div>
                <div className="text-xs text-green-100">Dynasties</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{loading ? '...' : totalMembers}</div>
                <div className="text-xs text-green-100">Membres</div>
              </div>
            </div>
            
            <button className="bg-white bg-opacity-20 hover:bg-opacity-30 transition-all duration-300 px-4 py-2 rounded-full flex items-center space-x-2 text-white">
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Chat Familial</span>
            </button>
            
            <button className="bg-white text-[var(--whatsapp-green)] hover:bg-green-50 transition-all duration-300 px-6 py-2 rounded-full font-semibold flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Créer Dynastie</span>
            </button>

            {/* Menu utilisateur avec avatar */}
            {user && <UserMenu />}
          </div>
        </div>

        {/* Barre de statut */}
        <div className="mt-4 flex items-center justify-between text-green-100 text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
              <span>{dynasties.length} dynasties actives</span>
            </div>
            <div className="hidden sm:block">•</div>
            <div className="hidden sm:block">
              {user ? `Connecté: ${user.user_metadata?.username || 'Utilisateur'}` : 'Non connecté'}
            </div>
          </div>
          <div className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-xs">
            Version 2.1 ✨
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
