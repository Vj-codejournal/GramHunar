import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Trainee from './contexts.jsx/Trainee';
import App from './app';

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <HelmetProvider>
    <BrowserRouter>
      <Suspense>
       <Trainee>
        <App />
       </Trainee>
      </Suspense>
    </BrowserRouter>
  </HelmetProvider>
);
