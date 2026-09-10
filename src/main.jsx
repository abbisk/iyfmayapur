import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { cloudinaryAsset } from './lib/cloudinary';

const rootElement = document.documentElement;
rootElement.style.setProperty('--home-cta-background', `url("${cloudinaryAsset('/radha_madhava.jpg')}")`);
rootElement.style.setProperty('--book-cover-sheet', `url("${cloudinaryAsset('/store/book-cover-sheet.png', { width: 900, crop: 'limit' })}")`);

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
