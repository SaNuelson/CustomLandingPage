import React from 'react';
import './Widget.css';

/**
 * Widget Component
 * A container for widget content with consistent styling.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Widget content
 * @param {string} [props.title] - Optional widget title
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.dockPosition] - Position in DockPanel (top, right, bottom, left, center)
 * @param {string} [props.gridRow] - Grid row position
 * @param {string} [props.gridColumn] - Grid column position
 */
const Widget = ({ 
  children, 
  title,
  className = '',
  dockPosition,
  gridRow,
  gridColumn,
  ...otherProps
 }) => {
  return (
    <div className={`widget-container ${className}`} {...otherProps}>
      {title && <div className="widget-header">{title}</div>}
      <div className="widget-content">
        {children}
      </div>
    </div>
  );
};

export default Widget;
