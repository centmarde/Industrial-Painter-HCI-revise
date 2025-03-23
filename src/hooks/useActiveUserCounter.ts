import { useState, useEffect } from 'react';
import { dashboardStats } from '../data/dashboardData';

// Custom hook to get and update active user count with random fluctuations
export const useActiveUserCounter = (intervalMs = 4000) => {
  const [userCount, setUserCount] = useState(dashboardStats.activeUsers);
  
  useEffect(() => {
    const interval = setInterval(() => {
      // Generate random change in user count
      const fluctuation = Math.floor(
        Math.random() * (dashboardStats.userFluctuation.max - dashboardStats.userFluctuation.min + 1)
      ) + dashboardStats.userFluctuation.min;
      
      // Update count ensuring it doesn't go below 50
      setUserCount(prevCount => Math.max(50, prevCount + fluctuation));
    }, intervalMs);
    
    return () => clearInterval(interval);
  }, [intervalMs]);
  
  return userCount;
};
