import React from 'react';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from './context/ThemeContext';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
// Import any other components or pages you have

function App() {
  return (
    <ThemeProvider>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          {/* Login page as landing page */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          
          {/* Home/Dashboard route */}
          <Route path="/home" element={<Home />} />
          
          {/* Add more routes here as your application grows */}
          
          {/* Fallback for non-existent routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
