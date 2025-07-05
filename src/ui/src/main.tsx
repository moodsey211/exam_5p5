import { StrictMode, Suspense } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import Spinner from '@components/Spinner';
import { BrowserRouter, Routes, Route } from 'react-router';
import { Flowbite, ThemeModeScript } from 'flowbite-react';
import customTheme from './theme';

import './css/globals.css';

import NotFound from '@pages/NotFound';
import Dashboard from '@pages/Dashboard';

const root: Root = createRoot(document.getElementById('root')!);

root.render(
  <StrictMode>
    <Suspense fallback={<Spinner />}>
        <ThemeModeScript />
        <Flowbite theme={{ theme: customTheme }}>
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="*" element={<NotFound />} />
              </Routes>
          </BrowserRouter>
        </Flowbite>
    </Suspense>
  </StrictMode>
);