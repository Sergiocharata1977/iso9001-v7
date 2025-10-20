'use client';

import React from 'react';

export interface DonCandidoChatProps {
  position?: { x: number; y: number };
}

export const DonCandidoChat: React.FC<DonCandidoChatProps> = ({ position }) => {
  return (
    <div
      className="fixed z-50"
      style={{
        left: position?.x || 20,
        bottom: position?.y || 20,
      }}
    >
      {/* Placeholder para DonCandidoChat - implementar más tarde */}
      <div className="bg-white rounded-lg shadow-lg p-4 max-w-sm">
        <p className="text-sm text-gray-600">DonCandidoChat - Próximamente</p>
      </div>
    </div>
  );
};

export const useDonCandidoChat = () => {
  const [position, setPosition] = React.useState({ x: 20, y: 20 });
  const [visible, setVisible] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [animationType, setAnimationType] = React.useState<'saludo' | 'pensando' | 'feliz' | 'triste' | 'sorprendido'>('saludo');

  const showDonCandido = React.useCallback((msg: string, type: 'saludo' | 'pensando' | 'feliz' | 'triste' | 'sorprendido' = 'saludo', duration?: number) => {
    setMessage(msg);
    setAnimationType(type);
    setVisible(true);
    if (duration) {
      setTimeout(() => setVisible(false), duration);
    }
  }, []);

  const hideDonCandido = React.useCallback(() => {
    setVisible(false);
  }, []);

  const showThinking = React.useCallback((msg: string = "Pensando...") => {
    showDonCandido(msg, 'pensando');
  }, [showDonCandido]);

  const showHappy = React.useCallback((msg: string = "¡Excelente!") => {
    showDonCandido(msg, 'feliz', 3000);
  }, [showDonCandido]);

  const showSad = React.useCallback((msg: string = "Algo salió mal...") => {
    showDonCandido(msg, 'triste', 3000);
  }, [showDonCandido]);

  const showSurprised = React.useCallback((msg: string = "¡Sorpresa!") => {
    showDonCandido(msg, 'sorprendido', 3000);
  }, [showDonCandido]);

  const DonCandidoChatComponent = React.useCallback(
    (props: DonCandidoChatProps) => <DonCandidoChat {...props} position={position} />,
    [position]
  );

  return {
    visible,
    message,
    animationType,
    showDonCandido,
    hideDonCandido,
    showThinking,
    showHappy,
    showSad,
    showSurprised,
    DonCandidoChatComponent,
  };
};

export default DonCandidoChat;