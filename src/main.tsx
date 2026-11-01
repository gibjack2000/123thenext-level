import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './styles/backgrounds-luxe.css';
import { AffiliateLinksProvider } from './contexts/AffiliateLinksContext';
import ErrorBoundary from './components/ErrorBoundary';

// Auto-recover from stale chunks when a new deployment occurs
window.addEventListener('vite:preloadError', (event) => {
  event.preventDefault();
  const reloadKey = 'last_vite_preload_reload';
  const lastReload = sessionStorage.getItem(reloadKey);
  const now = Date.now();
  if (!lastReload || now - parseInt(lastReload, 10) > 15000) {
    sessionStorage.setItem(reloadKey, now.toString());
    window.location.reload();
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <AffiliateLinksProvider>
        <App />
      </AffiliateLinksProvider>
    </ErrorBoundary>
  </StrictMode>,
);
