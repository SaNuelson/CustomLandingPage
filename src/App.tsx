import './App.css'
import DockPanel from './components/layout/DockPanel'

function App() {
  return (
    <div className="app-container debug">
      <DockPanel>
        <div dock-position="top">
          <div className="search-placeholder">
            <input
              type="text"
              className="search-input"
              placeholder="Search the web..."
              autoFocus
            />
          </div>
        </div>

        <div dock-position="left">
          <h3>Bookmarks</h3>
          <div className="bookmark-category">
            <h4>Coding</h4>
            <ul>
              <li><a href="https://github.com">GitHub</a></li>
              <li><a href="https://stackoverflow.com">Stack Overflow</a></li>
            </ul>
          </div>
        </div>

        <div dock-position="center">
          <div className="content-placeholder">
            <h2>Main Content Area</h2>
            <p>This is where the main widgets will go.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget felis euismod, rhoncus metus id, tristique nisi.</p>
          </div>
        </div>

        <div dock-position="bottom">
          <div className="news-placeholder">
            <h3>News Feed</h3>
            <p>Latest news items will appear here.</p>
          </div>
        </div>
      </DockPanel>
    </div>
  )
}

export default App
