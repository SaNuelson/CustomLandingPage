import React from 'react';
import './StackPanel.css';

/**
 * StackPanel Component
 * Arranges children in a vertical or horizontal stack using flexbox.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components
 * @param {'vertical'|'horizontal'} [props.orientation] - Stack direction
 * @param {string} [props.spacing] - Spacing between items
 * @param {string} [props.className] - Additional CSS classes
 */
const StackPanel = ({ 
  children, 
  orientation = 'vertical', 
  spacing = '1rem',
  className = '' 
}) => {
  const style = {
    gap: spacing
  };

  return (
    <div 
      className={`stack-panel ${orientation} ${className}`} 
      style={style}
    >
      {children}
    </div>
  );
};

export default StackPanel;
