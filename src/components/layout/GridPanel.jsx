import React from 'react';
import './GridPanel.css';

/**
 * GridPanel Component
 * Creates a CSS Grid layout with configurable rows and columns.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components
 * @param {string[]} [props.rows] - CSS grid row definitions
 * @param {string[]} [props.columns] - CSS grid column definitions
 * @param {string} [props.gap] - Grid gap spacing
 * @param {string} [props.className] - Additional CSS classes
 */
const GridPanel = ({ 
  children, 
  rows = [], 
  columns = [], 
  gap = '1rem',
  className = '' 
}) => {
  // Build grid template CSS
  const style = {
    gridTemplateRows: rows.join(' '),
    gridTemplateColumns: columns.join(' '),
    gap
  };

  return (
    <div className={`grid-panel ${className}`} style={style}>
      {React.Children.map(children, child => {
        // If child has gridRow or gridColumn props, apply them as style
        if (child.props) {
          const childStyle = {};

          if (child.props.gridRow) {
            childStyle.gridRow = child.props.gridRow;
          }

          if (child.props.gridColumn) {
            childStyle.gridColumn = child.props.gridColumn;
          }

          // Only clone if we need to add styles
          if (Object.keys(childStyle).length > 0) {
            return React.cloneElement(child, {
              style: { ...childStyle, ...(child.props.style || {}) }
            });
          }
        }

        return child;
      })}
    </div>
  );
};

export default GridPanel;
