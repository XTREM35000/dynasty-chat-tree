
import React, { useState } from 'react';
import { Crown, Star, Zap, Check, CreditCard, Gift } from 'lucide-react';

const PaymentSection = () => {
  const [selectedPlan, setSelectedPlan] = useState<'basic' | 'premium' | 'dynasty'>('premium');
  const [isProcessing, setIsProcessing] = useState(false);

  const plans = {
    basic: {
      name: 'Basique',
      price: '5€',
      period: 'mois',
      icon: <Star className="w-6 h-6" />,
      color: 'bg-blue-500',
      features: [
        '1 dynastie',
        'Jusqu\'à 50 membres',
        'Arbre généalogique simple',
        'Support email'
      ]
    },
    premium: {
      name: 'Premium',
      price: '10€',
      period: 'mois',
      icon: <Crown className="w-6 h-6" />,
      color: 'bg-[var(--whatsapp-green)]',
      popular: true,
      features: [
        '3 dynasties',
        'Membres illimités',
        'Arbres avancés + photos',
        'Chat familial',
        'Invitations WhatsApp',
        'Support prioritaire'
      ]
    },
    dynasty: {
      name: 'Dynasty Founder',
      price: '25€',
      period: 'unique',
      icon: <Zap className="w-6 h-6" />,
      color: 'bg-purple-600',
      lifetime: true,
      features: [
        'Dynasties illimitées',
        'Tous les privilèges Premium',
        'Outils généalogiques avancés',
        'Export PDF haute qualité',
        'Statistiques familiales',
        'Badge Fondateur',
        'Support VIP'
      ]
    }
  };

  const handlePayment = async (planType: string) => {
    setIsProcessing(true);
    console.log(`Initialisation du paiement pour le plan: ${planType}`);
    
    // Simulation du processus de paiement
    setTimeout(() => {
      setIsProcessing(false);
      alert(`Paiement initié pour le plan ${plans[planType as keyof typeof plans].name} !`);
    }, 2000);
  };

  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Débloquez votre potentiel généalogique
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Choisissez le plan qui correspond à votre famille et créez des liens durables entre les générations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {Object.entries(plans).map(([key, plan]) => (
          <div
            key={key}
            className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 ${
              selectedPlan === key ? 'border-[var(--whatsapp-green)] scale-105' : 'border-gray-200'
            } ${plan.popular ? 'md:scale-110 md:z-10' : ''}`}
            onClick={() => setSelectedPlan(key as any)}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="whatsapp-gradient text-white px-4 py-1 rounded-full text-sm font-medium">
                  ⭐ Plus populaire
                </div>
              </div>
            )}

            {plan.lifetime && (
              <div className="absolute -top-4 right-4">
                <div className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                  <Gift className="w-3 h-3 inline mr-1" />
                  Unique
                </div>
              </div>
            )}

            <div className="p-8">
              {/* Header */}
              <div className="text-center mb-8">
                <div className={`w-16 h-16 ${plan.color} rounded-full flex items-center justify-center mx-auto mb-4 text-white`}>
                  {plan.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold text-gray-800">
                  {plan.price}
                  <span className="text-lg text-gray-600 font-normal">/{plan.period}</span>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <button
                onClick={() => handlePayment(key)}
                disabled={isProcessing}
                className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
                  selectedPlan === key
                    ? `${plan.color} text-white hover:opacity-90`
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isProcessing ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" />
                    <span>
                      {selectedPlan === key ? 'Choisir ce plan' : 'Sélectionner'}
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Garanties et sécurité */}
      <div className="mt-12 text-center">
        <div className="bg-green-50 rounded-2xl p-6 max-w-4xl mx-auto">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            🔒 Paiement 100% sécurisé avec Stripe
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
            <div className="flex items-center justify-center space-x-2">
              <Check className="w-4 h-4 text-green-600" />
              <span>Garantie 30 jours</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Check className="w-4 h-4 text-green-600" />
              <span>Annulation facile</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Check className="w-4 h-4 text-green-600" />
              <span>Support client 24/7</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSection;
