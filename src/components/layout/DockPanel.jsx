import React from 'react';
import './DockPanel.css';

/**
 * DockPanel Component
 * Provides a layout with regions for top, bottom, left, right, and center content.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components with dockPosition prop
 * @param {string} [props.className] - Additional CSS classes
 */
const DockPanel = ({ children, className = '' }) => {
  const topChildren = React.Children.toArray(children).filter(
    child => child.props.dockPosition === 'top'
  );
  const rightChildren = React.Children.toArray(children).filter(
    child => child.props.dockPosition === 'right'
  );
  const bottomChildren = React.Children.toArray(children).filter(
    child => child.props.dockPosition === 'bottom'
  );
  const leftChildren = React.Children.toArray(children).filter(
    child => child.props.dockPosition === 'left'
  );
  const centerChildren = React.Children.toArray(children).filter(
    child => child.props.dockPosition === 'center'
  );

  return (
    <div className={`dock-panel ${className}`}>
      {topChildren.length > 0 && (
        <div className="dock-top">{topChildren}</div>
      )}

      <div className="dock-middle">
        {leftChildren.length > 0 && (
          <div className="dock-left">{leftChildren}</div>
        )}

        {centerChildren.length > 0 && (
          <div className="dock-center">{centerChildren}</div>
        )}

        {rightChildren.length > 0 && (
          <div className="dock-right">{rightChildren}</div>
        )}
      </div>

      {bottomChildren.length > 0 && (
        <div className="dock-bottom">{bottomChildren}</div>
      )}
    </div>
  );
};

export default DockPanel;
