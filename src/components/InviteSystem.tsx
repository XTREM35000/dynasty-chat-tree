
import React, { useState } from 'react';
import { Share2, Copy, MessageCircle, Mail, Link2, Check } from 'lucide-react';

interface InviteSystemProps {
  dynastyId: string;
  dynastyName: string;
}

const InviteSystem: React.FC<InviteSystemProps> = ({ dynastyId, dynastyName }) => {
  const [inviteToken, setInviteToken] = useState(`INV_3${Math.random().toString(36).substr(2, 16)}`);
  const [copied, setCopied] = useState(false);
  const [shareMethod, setShareMethod] = useState<'whatsapp' | 'email' | 'link'>('whatsapp');

  const baseUrl = window.location.origin;
  const inviteUrl = `${baseUrl}/invite/${inviteToken}`;
  
  const inviteMessage = `🌳 Vous êtes invité(e) à rejoindre la dynastie "${dynastyName}" !
  
Découvrez votre histoire familiale et connectez-vous avec vos proches.

👆 Cliquez pour rejoindre: ${inviteUrl}

📱 Application Généalogie Dynastique`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inviteUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Erreur lors de la copie:', err);
    }
  };

  const handleWhatsAppShare = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(inviteMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleEmailShare = () => {
    const subject = `Invitation à rejoindre la dynastie ${dynastyName}`;
    const body = inviteMessage.replace(/\n/g, '%0D%0A');
    const emailUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(emailUrl);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 whatsapp-gradient rounded-full flex items-center justify-center">
          <Share2 className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-800">Inviter des membres</h3>
          <p className="text-gray-600 text-sm">Partagez votre dynastie avec votre famille</p>
        </div>
      </div>

      {/* Sélection de la méthode */}
      <div className="flex space-x-2 mb-6">
        <button
          onClick={() => setShareMethod('whatsapp')}
          className={`flex-1 p-3 rounded-xl border-2 transition-all duration-200 ${
            shareMethod === 'whatsapp'
              ? 'border-[var(--whatsapp-green)] bg-green-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <MessageCircle className={`w-5 h-5 mx-auto mb-1 ${
            shareMethod === 'whatsapp' ? 'text-[var(--whatsapp-green)]' : 'text-gray-500'
          }`} />
          <div className="text-xs font-medium text-gray-700">WhatsApp</div>
        </button>

        <button
          onClick={() => setShareMethod('email')}
          className={`flex-1 p-3 rounded-xl border-2 transition-all duration-200 ${
            shareMethod === 'email'
              ? 'border-[var(--whatsapp-green)] bg-green-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <Mail className={`w-5 h-5 mx-auto mb-1 ${
            shareMethod === 'email' ? 'text-[var(--whatsapp-green)]' : 'text-gray-500'
          }`} />
          <div className="text-xs font-medium text-gray-700">Email</div>
        </button>

        <button
          onClick={() => setShareMethod('link')}
          className={`flex-1 p-3 rounded-xl border-2 transition-all duration-200 ${
            shareMethod === 'link'
              ? 'border-[var(--whatsapp-green)] bg-green-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <Link2 className={`w-5 h-5 mx-auto mb-1 ${
            shareMethod === 'link' ? 'text-[var(--whatsapp-green)]' : 'text-gray-500'
          }`} />
          <div className="text-xs font-medium text-gray-700">Lien</div>
        </button>
      </div>

      {/* Prévisualisation */}
      <div className="bg-gray-50 rounded-xl p-4 mb-6">
        <div className="text-sm text-gray-600 mb-2">Aperçu de l'invitation :</div>
        <div className="whatsapp-bubble-sent p-3 text-sm">
          <div className="font-medium text-gray-800 mb-2">🌳 Invitation Dynastie</div>
          <div className="text-gray-700">
            Rejoignez "{dynastyName}" et découvrez votre histoire familiale !
          </div>
          <div className="text-xs text-gray-500 mt-2">Token: {inviteToken}</div>
        </div>
      </div>

      {/* Lien d'invitation */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Lien d'invitation
        </label>
        <div className="flex space-x-2">
          <input
            type="text"
            value={inviteUrl}
            readOnly
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm"
          />
          <button
            onClick={handleCopy}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
              copied
                ? 'bg-green-100 text-green-700 border border-green-200'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Actions de partage */}
      <div className="space-y-3">
        {shareMethod === 'whatsapp' && (
          <button
            onClick={handleWhatsAppShare}
            className="w-full whatsapp-gradient text-white font-medium py-3 px-4 rounded-xl hover:opacity-90 transition-opacity duration-200 flex items-center justify-center space-x-2"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Partager via WhatsApp</span>
          </button>
        )}

        {shareMethod === 'email' && (
          <button
            onClick={handleEmailShare}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <Mail className="w-5 h-5" />
            <span>Envoyer par email</span>
          </button>
        )}

        {shareMethod === 'link' && (
          <button
            onClick={handleCopy}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <Link2 className="w-5 h-5" />
            <span>{copied ? 'Lien copié !' : 'Copier le lien'}</span>
          </button>
        )}
      </div>

      {/* Statistiques d'invitation */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-[var(--whatsapp-green)]">12</div>
            <div className="text-xs text-gray-600">Invitations</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">8</div>
            <div className="text-xs text-gray-600">Acceptées</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-600">4</div>
            <div className="text-xs text-gray-600">En attente</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InviteSystem;
