import { useState, useEffect } from 'react';

// Generic hook to handle all types of counters with fluctuations
export const useCounterWithFluctuation = (
  initialValue: number,
  maxValue: number,
  minValue: number = Math.floor(maxValue * 0.6), // Default min is 60% of max
  intervalMs: number = 4000,
  fluctuationRange: { min: number, max: number } = { min: -3, max: 5 }
) => {
  const [count, setCount] = useState(initialValue);
  
  useEffect(() => {
    const interval = setInterval(() => {
      // Generate random change in count
      const fluctuation = Math.floor(
        Math.random() * (fluctuationRange.max - fluctuationRange.min + 1)
      ) + fluctuationRange.min;
      
      // Update count ensuring it stays within min and max bounds
      setCount(prevCount => {
        const newCount = prevCount + fluctuation;
        return Math.min(maxValue, Math.max(minValue, newCount));
      });
    }, intervalMs);
    
    return () => clearInterval(interval);
  }, [intervalMs, maxValue, minValue, fluctuationRange]);
  
  return count;
};
