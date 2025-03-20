import { CssBaseline } from '@mui/material';
import { ThemeProvider } from './context/ThemeContext';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import HeroLanding from './pages/index';
import ExteriorPainting from './pages/Residential Painting/ExteriorPainting';
import InteriorPainting from './pages/Residential Painting/InteriorPainting';
import Services from './pages/Outside/Services';
import Reviews from './pages/Outside/Reviews';
import NationalAccount from './pages/Outside/NationalAccount';
// Import any other components or pages you have

function App() {
  return (
    <ThemeProvider>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          {/* HeroLanding as the default landing page */}
          <Route path="/" element={<HeroLanding />} />
          
          {/* Auth routes */}
          <Route path="/login" element={<Login />} />
          
          {/* Home/Dashboard route */}
          <Route path="/home" element={<Home />} />
          
          {/* Residential Painting routes */}
          <Route path="/residential/exterior" element={<ExteriorPainting />} />
          <Route path="/residential/interior" element={<InteriorPainting />} />
          <Route path="/services" element={<Services />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/commercial/national-account" element={<NationalAccount />} />
          {/* Add more routes here as your application grows */}
          
          {/* Fallback for non-existent routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
