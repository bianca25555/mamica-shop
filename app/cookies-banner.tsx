// CookieBanner.jsx — Banner de consimțământ cookie (GDPR)
// Import: import CookieBanner from '@/components/CookieBanner'
// Plasează <CookieBanner /> în layout-ul principal, după <TestBanner />

'use client';

import { useState, useEffect } from 'react';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Verifică dacă utilizatorul a acceptat deja
    const consent = document.cookie
      .split('; ')
      .find((row) => row.startsWith('cookie_consent='));
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    // Setează cookie de consimțământ (valabil 365 zile)
    document.cookie =
      'cookie_consent=accepted; path=/; max-age=' + 60 * 60 * 24 * 365;
    setVisible(false);
  };

  const handleReject = () => {
    document.cookie =
      'cookie_consent=rejected; path=/; max-age=' + 60 * 60 * 24 * 365;
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9998,
        background: '#1a1a2e',
        color: '#e0e0e0',
        padding: '16px 24px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
        boxShadow: '0 -4px 12px rgba(0,0,0,0.25)',
        fontSize: '14px',
        lineHeight: 1.5,
      }}
    >
      <p style={{ margin: 0, maxWidth: '600px', textAlign: 'center' }}>
        🍪 Folosim cookie-uri strict necesare pentru funcționarea platformei
        (autentificare și sesiune). Nu folosim cookie-uri de tracking sau
        publicitate.{' '}
        <a
          href="/confidentialitate"
          style={{ color: '#F7C948', textDecoration: 'underline' }}
        >
          Politica de confidențialitate
        </a>
      </p>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          onClick={handleAccept}
          style={{
            background: '#F7C948',
            color: '#1a1a1a',
            border: 'none',
            padding: '8px 20px',
            borderRadius: '6px',
            fontWeight: 700,
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          Accept
        </button>
        <button
          onClick={handleReject}
          style={{
            background: 'transparent',
            color: '#e0e0e0',
            border: '1px solid #555',
            padding: '8px 20px',
            borderRadius: '6px',
            fontWeight: 600,
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          Refuz
        </button>
      </div>
    </div>
  );
}
