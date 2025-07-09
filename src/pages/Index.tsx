
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DynastyCard from '@/components/DynastyCard';
import InviteSystem from '@/components/InviteSystem';
import PaymentSection from '@/components/PaymentSection';
import { Crown, Users, MessageCircle, Plus, Search, Filter, Sparkles } from 'lucide-react';

const Index = () => {
  const [activeTab, setActiveTab] = useState<'dynasties' | 'invite' | 'payment'>('dynasties');
  const [searchTerm, setSearchTerm] = useState('');

  // Données de démonstration
  const dynasties = [
    {
      id: '1',
      name: 'Famille Martin',
      founder: 'Jean Martin',
      members: 24,
      createdAt: '2024',
      status: 'premium' as const,
      description: 'Une famille unie depuis des générations, originaire de Provence',
      avatar: undefined
    },
    {
      id: '2',
      name: 'Les Dubois',
      founder: 'Marie Dubois',
      members: 15,
      createdAt: '2023',
      status: 'founder' as const,
      description: 'Descendants d\'artisans parisiens, gardiens des traditions familiales'
    },
    {
      id: '3',
      name: 'Clan Schmidt',
      founder: 'Klaus Schmidt',
      members: 31,
      createdAt: '2024',
      status: 'active' as const,
      description: 'Famille franco-allemande aux racines multiculturelles'
    },
    {
      id: '4',
      name: 'Maison Garcia',
      founder: 'Carlos Garcia',
      members: 18,
      createdAt: '2023',
      status: 'premium' as const,
      description: 'Famille hispano-française, passionnée de généalogie'
    }
  ];

  const filteredDynasties = dynasties.filter(dynasty =>
    dynasty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dynasty.founder.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleJoinDynasty = (dynastyId: string) => {
    console.log('Rejoindre la dynastie:', dynastyId);
    alert('Demande d\'adhésion envoyée !');
  };

  const handleViewDynasty = (dynastyId: string) => {
    console.log('Voir la dynastie:', dynastyId);
    alert('Ouverture de l\'arbre généalogique...');
  };

  return (
    <div className="min-h-screen bg-[var(--whatsapp-background)] whatsapp-pattern">
      <Header />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-white rounded-full px-6 py-3 shadow-lg mb-6 animate-bubble-pop">
            <Sparkles className="w-5 h-5 text-[var(--whatsapp-green)] mr-2" />
            <span className="text-sm font-medium text-gray-700">
              Nouvelle génération de généalogie familiale
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6 animate-slide-in-left">
            Connectez vos
            <span className="text-[var(--whatsapp-green)] block">générations</span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 animate-slide-in-right">
            Découvrez, préservez et partagez l'histoire de votre famille avec une plateforme 
            moderne inspirée des outils de communication d'aujourd'hui.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-bubble-pop">
            <button className="whatsapp-gradient text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2">
              <Crown className="w-6 h-6" />
              <span>Créer ma dynastie</span>
            </button>
            <button className="bg-white text-[var(--whatsapp-green)] px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-[var(--whatsapp-green)] flex items-center justify-center space-x-2">
              <Users className="w-6 h-6" />
              <span>Explorer les familles</span>
            </button>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="container mx-auto px-4 mb-8">
        <div className="bg-white rounded-2xl shadow-lg p-2">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('dynasties')}
              className={`flex-1 py-3 px-6 rounded-xl font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                activeTab === 'dynasties'
                  ? 'whatsapp-gradient text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Crown className="w-5 h-5" />
              <span>Dynasties</span>
            </button>
            <button
              onClick={() => setActiveTab('invite')}
              className={`flex-1 py-3 px-6 rounded-xl font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                activeTab === 'invite'
                  ? 'whatsapp-gradient text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <MessageCircle className="w-5 h-5" />
              <span>Inviter</span>
            </button>
            <button
              onClick={() => setActiveTab('payment')}
              className={`flex-1 py-3 px-6 rounded-xl font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                activeTab === 'payment'
                  ? 'whatsapp-gradient text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Plus className="w-5 h-5" />
              <span>Privilèges</span>
            </button>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <main className="container mx-auto px-4 pb-12">
        {activeTab === 'dynasties' && (
          <div>
            {/* Filtres et recherche */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Rechercher une dynastie ou un fondateur..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--whatsapp-green)] focus:border-transparent outline-none"
                  />
                </div>
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-medium transition-colors duration-200 flex items-center space-x-2">
                  <Filter className="w-5 h-5" />
                  <span>Filtres</span>
                </button>
              </div>
            </div>

            {/* Grille des dynasties */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDynasties.map((dynasty) => (
                <DynastyCard
                  key={dynasty.id}
                  dynasty={dynasty}
                  onJoin={handleJoinDynasty}
                  onView={handleViewDynasty}
                />
              ))}
            </div>

            {filteredDynasties.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  Aucune dynastie trouvée
                </h3>
                <p className="text-gray-500">
                  Essayez de modifier vos critères de recherche ou créez votre propre dynastie.
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'invite' && (
          <div className="max-w-2xl mx-auto">
            <InviteSystem dynastyId="demo" dynastyName="Famille Démonstration" />
          </div>
        )}

        {activeTab === 'payment' && (
          <PaymentSection />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Index;
