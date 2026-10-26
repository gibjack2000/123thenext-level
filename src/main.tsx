import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './styles/backgrounds-luxe.css';
import { AffiliateLinksProvider } from './contexts/AffiliateLinksContext';
import ErrorBoundary from './components/ErrorBoundary';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <AffiliateLinksProvider>
        <App />
      </AffiliateLinksProvider>
    </ErrorBoundary>
  </StrictMode>,
);

