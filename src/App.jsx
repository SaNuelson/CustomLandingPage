import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import {DockPanel, GridPanel, Widget} from './components/layout';
import ThemeToggle from './components/ui/ThemeToggle';
import './styles/themes.css';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <div className="app">
        <ThemeToggle />

        <DockPanel>
          {/* Top section with search */}
          <Widget
            dockPosition="top"
            className="search-widget"
          >
            <div className="search-placeholder">
              <input
                type="text"
                className="search-input"
                placeholder="Search the web..."
                autoFocus
              />
            </div>
          </Widget>

          {/* Left sidebar with bookmarks */}
          <Widget
            dockPosition="left"
            title="Bookmarks"
            className="bookmarks-widget"
          >
            <div className="bookmark-category">
              <h5>Coding</h5>
              <ul className="bookmark-list">
                <li><a href="https://github.com">GitHub</a></li>
                <li><a href="https://stackoverflow.com">Stack Overflow</a></li>
              </ul>
            </div>
            <div className="bookmark-category">
              <h5>Entertainment</h5>
              <ul className="bookmark-list">
                <li><a href="https://reddit.com">Reddit</a></li>
                <li><a href="https://youtube.com">YouTube</a></li>
              </ul>
            </div>
          </Widget>

          {/* Center area with grid */}
          <GridPanel
            dockPosition="center"
            columns={['1fr', '1fr']}
            rows={['1fr']}
            gap="1rem"
          >
            <Widget gridColumn="1" title="Weather">
              <div className="placeholder-content">
                Weather information will be displayed here
              </div>
            </Widget>

            <Widget gridColumn="2" title="Clock">
              <div className="placeholder-content">
                Clock and date information will be displayed here
              </div>
            </Widget>
          </GridPanel>

          {/* Bottom section with news */}
          <Widget
            dockPosition="bottom"
            title="News Feed"
            className="news-widget"
          >
            <div className="placeholder-content">
              News items will be displayed here
            </div>
          </Widget>
        </DockPanel>
      </div>
    </ThemeProvider>
  );
}

export default App;
