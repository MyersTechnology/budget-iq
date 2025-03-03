
import { useState, useEffect } from 'react';

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  formatOptions?: Intl.NumberFormatOptions;
  className?: string;
}

const AnimatedNumber = ({ 
  value, 
  duration = 500, 
  formatOptions = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  },
  className = ''
}: AnimatedNumberProps) => {
  const [displayValue, setDisplayValue] = useState(0);
  
  useEffect(() => {
    let startTime: number | null = null;
    const startValue = displayValue;
    
    const animateValue = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Use easeOutQuart easing function for smooth animation
      const easedProgress = 1 - Math.pow(1 - progress, 4);
      const currentValue = startValue + (value - startValue) * easedProgress;
      
      setDisplayValue(currentValue);
      
      if (progress < 1) {
        window.requestAnimationFrame(animateValue);
      }
    };
    
    window.requestAnimationFrame(animateValue);
  }, [value, duration]);
  
  return (
    <span className={`animate-number-count ${className}`}>
      {displayValue.toLocaleString(undefined, formatOptions)}
    </span>
  );
};

export default AnimatedNumber;
