import { ReactNode } from 'react';
import { Route } from 'react-router-dom';
import PublicRouteGuard from './PublicRouteGuard';
import AuthGuard from './AuthGuard';

interface RouteConfig {
  path: string;
  element: ReactNode;
}

// Helper to create multiple guarded routes
export const createPublicRoutes = (routes: RouteConfig[], redirectPath?: string) => {
  return routes.map(({ path, element }) => (
    <Route 
      key={path} 
      path={path} 
      element={<PublicRouteGuard redirectPath={redirectPath}>{element}</PublicRouteGuard>} 
    />
  ));
};

export const createProtectedRoutes = (routes: RouteConfig[], fallbackPath?: string) => {
  return routes.map(({ path, element }) => (
    <Route 
      key={path} 
      path={path} 
      element={<AuthGuard fallbackPath={fallbackPath}>{element}</AuthGuard>} 
    />
  ));
};
