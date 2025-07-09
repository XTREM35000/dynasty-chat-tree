
import React from 'react';
import { Heart, Users, Crown, Share2, Calculator, Gift } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[var(--whatsapp-green-dark)] text-white mt-16">
      <div className="container mx-auto px-4 py-8">
        {/* Statistiques globales */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-[var(--whatsapp-green)] rounded-full flex items-center justify-center mx-auto mb-3">
              <Crown className="w-8 h-8" />
            </div>
            <div className="text-2xl font-bold">12</div>
            <div className="text-green-200 text-sm">Dynasties Actives</div>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-[var(--whatsapp-green)] rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="w-8 h-8" />
            </div>
            <div className="text-2xl font-bold">247</div>
            <div className="text-green-200 text-sm">Membres Familles</div>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-[var(--whatsapp-green)] rounded-full flex items-center justify-center mx-auto mb-3">
              <Heart className="w-8 h-8" />
            </div>
            <div className="text-2xl font-bold">1.2k</div>
            <div className="text-green-200 text-sm">Liens Créés</div>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-[var(--whatsapp-green)] rounded-full flex items-center justify-center mx-auto mb-3">
              <Gift className="w-8 h-8" />
            </div>
            <div className="text-2xl font-bold">89</div>
            <div className="text-green-200 text-sm">Invitations Envoyées</div>
          </div>
        </div>

        {/* Actions rapides */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[var(--whatsapp-green-secondary)] rounded-xl p-6">
            <h3 className="font-semibold mb-3 flex items-center">
              <Calculator className="w-5 h-5 mr-2" />
              Calculateur Généalogique
            </h3>
            <p className="text-green-100 text-sm mb-4">
              Découvrez vos liens de parenté automatiquement
            </p>
            <button className="bg-white text-[var(--whatsapp-green-secondary)] px-4 py-2 rounded-full text-sm font-semibold hover:bg-green-50 transition-colors">
              Calculer
            </button>
          </div>

          <div className="bg-[var(--whatsapp-green-secondary)] rounded-xl p-6">
            <h3 className="font-semibold mb-3 flex items-center">
              <Share2 className="w-5 h-5 mr-2" />
              Partage WhatsApp
            </h3>
            <p className="text-green-100 text-sm mb-4">
              Invitez votre famille via WhatsApp en un clic
            </p>
            <button className="bg-white text-[var(--whatsapp-green-secondary)] px-4 py-2 rounded-full text-sm font-semibold hover:bg-green-50 transition-colors">
              Partager
            </button>
          </div>

          <div className="bg-[var(--whatsapp-green-secondary)] rounded-xl p-6">
            <h3 className="font-semibold mb-3 flex items-center">
              <Crown className="w-5 h-5 mr-2" />
              Privilèges Dynasty
            </h3>
            <p className="text-green-100 text-sm mb-4">
              Débloquez des fonctionnalités premium
            </p>
            <button className="bg-white text-[var(--whatsapp-green-secondary)] px-4 py-2 rounded-full text-sm font-semibold hover:bg-green-50 transition-colors">
              Découvrir
            </button>
          </div>
        </div>

        {/* Liens et copyright */}
        <div className="border-t border-green-600 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center space-x-2 mb-2">
                <Crown className="w-5 h-5 text-[var(--whatsapp-green)]" />
                <span className="font-semibold">Généalogie Dynastique</span>
              </div>
              <p className="text-green-200 text-sm">
                Connectant les familles depuis 2024
              </p>
            </div>
            
            <div className="flex space-x-6 text-sm text-green-200">
              <a href="#" className="hover:text-white transition-colors">Aide</a>
              <a href="#" className="hover:text-white transition-colors">Confidentialité</a>
              <a href="#" className="hover:text-white transition-colors">Conditions</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
          
          <div className="text-center text-green-300 text-xs mt-4">
            © 2024 Généalogie Dynastique. Conçu avec ❤️ pour préserver l'histoire familiale.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
