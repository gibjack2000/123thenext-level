import React from 'react';

// START: REGIONAL CLINICAL GUIDES SECTION
export const RegionalGuidesSection: React.FC = () => {
  return (
    <section 
      className="regional-guides-section relative z-20" 
      style={{ maxWidth: '1100px', margin: '48px auto', padding: '0 24px' }}
      aria-label="Regional Clinical Guides"
    >
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <span 
          style={{ 
            fontSize: '0.8rem', 
            fontWeight: 700, 
            textTransform: 'uppercase', 
            letterSpacing: '1.5px', 
            color: '#06b6d4', 
            background: 'rgba(6, 182, 212, 0.1)', 
            padding: '4px 12px', 
            borderRadius: '20px',
            border: '1px solid rgba(6, 182, 212, 0.25)'
          }}
        >
          Localized Healthcare Playbooks
        </span>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff', marginTop: '12px', letterSpacing: '-0.5px' }}>
          Select Your Healthcare System
        </h2>
        <p style={{ color: '#9ca3af', fontSize: '1rem', maxWidth: '640px', margin: '8px auto 0 auto', lineHeight: 1.6 }}>
          Practical doctor scripts, insurance workarounds, and direct lab requisitions tailored to your country.
        </p>
      </div>

      <div 
        className="guides-grid" 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '20px' 
        }}
      >
        
        {/* CARD 1: UK */}
        <div 
          className="guide-card group hover:-translate-y-1 transition-all duration-200" 
          style={{ 
            background: '#111827', 
            border: '1px solid #1f2937', 
            borderRadius: '14px', 
            padding: '24px', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'space-between',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontSize: '1.8rem', lineHeight: 1 }}>🇬🇧</span>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#10b981', background: 'rgba(16, 185, 129, 0.1)', padding: '2px 8px', borderRadius: '6px', border: '1px solid rgba(16, 185, 129, 0.25)' }}>
                NHS &amp; Private
              </span>
            </div>
            <h3 style={{ fontSize: '1.2rem', color: '#ffffff', fontWeight: 700, marginBottom: '8px' }}>
              United Kingdom
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#9ca3af', lineHeight: 1.5, marginBottom: '16px' }}>
              How to request ApoB &amp; fasting insulin past strict NICE criteria, use private GP consultations, or access UKAS phlebotomy via LOLA Health.
            </p>
          </div>
          <a 
            href="/guides/uk-preventative-blood-tests/" 
            className="hover:brightness-110 active:scale-95 transition-all text-center"
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '8px', 
              background: 'rgba(16, 185, 129, 0.15)', 
              color: '#10b981', 
              border: '1px solid rgba(16, 185, 129, 0.3)', 
              padding: '10px 16px', 
              borderRadius: '8px', 
              fontWeight: 600, 
              fontSize: '0.9rem', 
              textDecoration: 'none' 
            }}
          >
            Read UK Guide ➔
          </a>
        </div>

        {/* CARD 2: US */}
        <div 
          className="guide-card group hover:-translate-y-1 transition-all duration-200" 
          style={{ 
            background: '#111827', 
            border: '1px solid #1f2937', 
            borderRadius: '14px', 
            padding: '24px', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'space-between',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontSize: '1.8rem', lineHeight: 1 }}>🇺🇸</span>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#06b6d4', background: 'rgba(6, 182, 212, 0.1)', padding: '2px 8px', borderRadius: '6px', border: '1px solid rgba(6, 182, 212, 0.25)' }}>
                Physicals &amp; Labs
              </span>
            </div>
            <h3 style={{ fontSize: '1.2rem', color: '#ffffff', fontWeight: 700, marginBottom: '8px' }}>
              United States
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#9ca3af', lineHeight: 1.5, marginBottom: '16px' }}>
              Navigating ACA annual physicals, understanding insurance billing denial codes, and using direct Quest &amp; Labcorp walk-ins via HealthLabs.
            </p>
          </div>
          <a 
            href="/guides/us-doctor-blood-tests/" 
            className="hover:brightness-110 active:scale-95 transition-all text-center"
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '8px', 
              background: 'rgba(6, 182, 212, 0.15)', 
              color: '#06b6d4', 
              border: '1px solid rgba(6, 182, 212, 0.3)', 
              padding: '10px 16px', 
              borderRadius: '8px', 
              fontWeight: 600, 
              fontSize: '0.9rem', 
              textDecoration: 'none' 
            }}
          >
            Read US Guide ➔
          </a>
        </div>

        {/* CARD 3: SPAIN (ENGLISH) */}
        <div 
          className="guide-card group hover:-translate-y-1 transition-all duration-200" 
          style={{ 
            background: '#111827', 
            border: '1px solid #1f2937', 
            borderRadius: '14px', 
            padding: '24px', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'space-between',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontSize: '1.8rem', lineHeight: 1 }}>🇪🇸</span>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#f59e0b', background: 'rgba(245, 158, 11, 0.1)', padding: '2px 8px', borderRadius: '6px', border: '1px solid rgba(245, 158, 11, 0.25)' }}>
                Expat Guide (EN)
              </span>
            </div>
            <h3 style={{ fontSize: '1.2rem', color: '#ffffff', fontWeight: 700, marginBottom: '8px' }}>
              Spain (Expats &amp; International)
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#9ca3af', lineHeight: 1.5, marginBottom: '16px' }}>
              Navigating healthcare in English: Seguridad Social vs. private mutuas (Sanitas, Adeslas), English-speaking clinics, and Megalab/Unilabs walk-ins.
            </p>
          </div>
          <a 
            href="/guides/spain-preventative-blood-tests/" 
            className="hover:brightness-110 active:scale-95 transition-all text-center"
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '8px', 
              background: 'rgba(245, 158, 11, 0.15)', 
              color: '#f59e0b', 
              border: '1px solid rgba(245, 158, 11, 0.3)', 
              padding: '10px 16px', 
              borderRadius: '8px', 
              fontWeight: 600, 
              fontSize: '0.9rem', 
              textDecoration: 'none' 
            }}
          >
            Read Spain Guide ➔
          </a>
        </div>

      </div>
    </section>
  );
};
// END: REGIONAL CLINICAL GUIDES SECTION

export default RegionalGuidesSection;
