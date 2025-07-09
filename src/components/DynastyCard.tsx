
import React from 'react';
import { Crown, Users, Calendar, Star, ArrowRight } from 'lucide-react';

interface DynastyCardProps {
  dynasty: {
    id: string;
    name: string;
    founder: string;
    members: number;
    createdAt: string;
    status: 'active' | 'premium' | 'founder';
    description?: string;
    avatar?: string;
  };
  onJoin?: (dynastyId: string) => void;
  onView?: (dynastyId: string) => void;
}

const DynastyCard: React.FC<DynastyCardProps> = ({ dynasty, onJoin, onView }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'premium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'founder': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'premium': return <Star className="w-3 h-3" />;
      case 'founder': return <Crown className="w-3 h-3" />;
      default: return <Users className="w-3 h-3" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 animate-bubble-pop">
      {/* Header avec avatar et statut */}
      <div className="relative">
        <div className="whatsapp-gradient h-20"></div>
        <div className="absolute -bottom-6 left-6">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
            {dynasty.avatar ? (
              <img src={dynasty.avatar} alt={dynasty.name} className="w-10 h-10 rounded-full" />
            ) : (
              <Crown className="w-6 h-6 text-[var(--whatsapp-green)]" />
            )}
          </div>
        </div>
        <div className="absolute top-4 right-4">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(dynasty.status)}`}>
            {getStatusIcon(dynasty.status)}
            <span className="ml-1 capitalize">{dynasty.status}</span>
          </span>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="pt-8 px-6 pb-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-800 mb-1">{dynasty.name}</h3>
          <p className="text-gray-600 text-sm">Fondée par {dynasty.founder}</p>
          {dynasty.description && (
            <p className="text-gray-500 text-sm mt-2 line-clamp-2">{dynasty.description}</p>
          )}
        </div>

        {/* Statistiques */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>{dynasty.members} membres</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{dynasty.createdAt}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-3">
          <button
            onClick={() => onView?.(dynasty.id)}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-full transition-colors duration-200 text-sm"
          >
            Voir l'arbre
          </button>
          <button
            onClick={() => onJoin?.(dynasty.id)}
            className="flex-1 whatsapp-gradient text-white font-medium py-2 px-4 rounded-full hover:opacity-90 transition-opacity duration-200 text-sm flex items-center justify-center space-x-1"
          >
            <span>Rejoindre</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Indicateur d'activité */}
      <div className="px-6 pb-4">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Activité récente</span>
          </div>
          <span>il y a 2h</span>
        </div>
      </div>
    </div>
  );
};

export default DynastyCard;
