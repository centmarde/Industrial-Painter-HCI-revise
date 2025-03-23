import { CssBaseline } from '@mui/material';
import { ThemeProvider } from './context/ThemeContext';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './stores/Auth';
import AuthGuard from './auth/AuthGuard';
import PublicRouteGuard from './auth/PublicRouteGuard';
import { createPublicRoutes, createProtectedRoutes } from './auth/RouteGroups';
import Login from './pages/Login';
import Home from './pages/InsideContents/Home';
import HeroLanding from './pages/index';
import ExteriorPainting from './pages/Residential Painting/ExteriorPainting';
import InteriorPainting from './pages/Residential Painting/InteriorPainting';
import Services from './pages/Outside/Services';
import Reviews from './pages/Outside/Reviews';
import NationalAccount from './pages/Outside/NationalAccount';
import CaseStudies from './pages/Outside/CaseStudies';
import WhyChooseUs from './pages/AboutUs/WhyChooseUs'
import SocialPorpuse from './pages/AboutUs/SocialPorpuse'
import PaintingBlog from './pages/AboutUs/PaintingBlog'
import Diversity from './pages/AboutUs/Diversity'
import Gmap from './pages/FindALocation/Gmap';
import OurStory from './pages/Franchise/OurStory';
import WhyFranchise from './pages/Franchise/WhyFranchise';
import TheProcess from './pages/Franchise/TheProcess';
import Investment from './pages/Franchise/Investment';
import AvailableMarkets from './pages/Franchise/AvailableMarkets';
import PositionNearYou from './pages/Position/PositionNearYou';
import Corporate from './pages/Position/Corporate';
import AccessDenied from './pages/InsideContents/utils/AccessDenied';
import AccessDeniedOuter from './pages/AccessDeniedOuter';
import NotFound from './pages/NotFound';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  // Define public route configs
  const publicRoutes = [
    { path: '/', element: <HeroLanding /> },
    { path: '/login', element: <Login /> },
  ];

  // Define protected route configs
  const protectedRoutes = [
    { path: '/home', element: <Home /> },
    // Add other protected routes here
  ];

  return (
    <AuthProvider>
      <ThemeProvider>
        <CssBaseline />
        <ToastContainer />
        <Router>
          <Routes>
            {/* Generate all public routes */}
            {createPublicRoutes(publicRoutes)}
            
            {/* Access Denied Route */}
            <Route path="/access-denied" element={<AccessDenied />} />
            <Route path="/access-denied-outer" element={<AccessDeniedOuter />} />
            {/* Routes accessible to both authenticated and unauthenticated users */}
            <Route path="/residential/exterior" element={<ExteriorPainting />} />
            <Route path="/residential/interior" element={<InteriorPainting />} />
            <Route path="/services" element={<Services />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/commercial/national-account" element={<NationalAccount />} />
            <Route path="/commercial/case-studies" element={<CaseStudies />} />
            <Route path="/about/why-choose-us" element={<WhyChooseUs />} />
            <Route path="/about/social-purpose" element={<SocialPorpuse />} />
            <Route path="/about/blog" element={<PaintingBlog />} />
            <Route path="/about/diversity" element={<Diversity />} />
            <Route path="/locations" element={<Gmap />} />
            <Route path="/franchise/our-story" element={<OurStory />} />
            <Route path="/franchise/why-franchise" element={<WhyFranchise />} />
            <Route path="/franchise/process" element={<TheProcess />} />
            <Route path="/franchise/investment" element={<Investment />} />
            <Route path="/franchise/markets" element={<AvailableMarkets />} />
            <Route path="/careers/positions" element={<PositionNearYou />} />
            <Route path="/careers/corporate" element={<Corporate />} />
            
            {/* Generate all protected routes */}
            {createProtectedRoutes(protectedRoutes, '/access-denied-outer')}

            {/* Fallback for non-existent routes */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
