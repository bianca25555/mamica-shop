// TestBanner.jsx — Adaugă acest component în layout-ul principal (ex: layout.jsx sau App.jsx)
// Import: import TestBanner from '@/components/TestBanner'
// Plasează <TestBanner /> imediat după <body> sau ca prim element în layout

'use client';

import { useState } from 'react';

export default function TestBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 9999,
        background: 'linear-gradient(90deg, #FF6B35, #F7C948)',
        color: '#1a1a1a',
        padding: '10px 20px',
        textAlign: 'center',
        fontSize: '14px',
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
      }}
    >
      <span style={{ fontSize: '18px' }}>🚧</span>
      <span>
        Platformă în faza de testare — nu se efectuează tranzacții reale.{' '}
        <a
          href="/termeni"
          style={{
            color: '#1a1a1a',
            textDecoration: 'underline',
            fontWeight: 700,
          }}
        >
          Detalii
        </a>
      </span>
      <button
        onClick={() => setVisible(false)}
        aria-label="Închide banner"
        style={{
          position: 'absolute',
          right: '12px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: '18px',
          color: '#1a1a1a',
          padding: '4px 8px',
          lineHeight: 1,
        }}
      >
        ✕
      </button>
    </div>
  );
}
