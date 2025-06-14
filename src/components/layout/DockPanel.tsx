import './DockPanel.css';
import type { ReactNode } from 'react';
import * as React from 'react';

type DockPosition = 'top' | 'right' | 'bottom' | 'left' | 'center';

interface DockPanelProps {
  children: ReactNode;
  className?: string;
}

interface DockChildProps {
    dockposition: DockPosition;
}

function DockPanel({ children, className = '' }: DockPanelProps) {

  function getChildrenByPosition(position: DockPosition) {
    return React.Children.toArray(children).filter(
      (child) => {
        if (React.isValidElement(child)) {
          return child.props['dock-position'] === position;
        }
        return false;
      }
    );
  };

  const topChildren = getChildrenByPosition('top');
  const rightChildren = getChildrenByPosition('right');
  const bottomChildren = getChildrenByPosition('bottom');
  const leftChildren = getChildrenByPosition('left');
  const centerChildren = getChildrenByPosition('center');

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
}

export type { DockPosition, DockChildProps };
export default DockPanel;
