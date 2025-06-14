const ConfigManager = {
  defaultConfig: {
    theme: 'light',
    searchEngine: 'bing',
    bookmarks: {
      categories: [
        {
          name: 'Coding',
          links: [
            { title: 'GitHub', url: 'https://github.com' },
            { title: 'ChatGPT', url: 'https://chat.openai.com' }
          ]
        },
        {
          name: 'Entertainment',
          links: [
            { title: 'Reddit', url: 'https://reddit.com' }
          ]
        }
      ]
    },
    newsSources: []
  },

  currentConfig: null,

  init: function() {
    // Try to load from localStorage first
    const savedConfig = localStorage.getItem('landingPageConfig');
    if (savedConfig) {
      try {
        this.currentConfig = JSON.parse(savedConfig);
        console.log('Configuration loaded from local storage');
      } catch (e) {
        console.error('Failed to parse saved configuration', e);
        this.currentConfig = this.defaultConfig;
      }
    } else {
      // Use default if nothing is saved
      this.currentConfig = this.defaultConfig;
      console.log('Using default configuration');
    }

    // Apply the configuration to the page
    this.applyConfig();

    // In the future, we'll check for cloud updates here
  },

  // Save current configuration to localStorage
  saveConfig: function() {
    try {
      localStorage.setItem('landingPageConfig', JSON.stringify(this.currentConfig));
      console.log('Configuration saved to local storage');
    } catch (e) {
      console.error('Failed to save configuration', e);
    }
  },

  // Apply the current configuration to the page
  applyConfig: function() {
    // Apply theme
    document.body.setAttribute('data-theme', this.currentConfig.theme);

    // Set up search engine
    SearchManager.setEngine(this.currentConfig.searchEngine);

    // Render bookmarks
    BookmarkManager.renderBookmarks(this.currentConfig.bookmarks);

    // Set up news feed
    NewsFeedManager.setNewsSources(this.currentConfig.newsSources);
  }
};

// Search functionality
const SearchManager = {
  searchEngines: {
    'google': {
      url: 'https://www.google.com/search?q=',
      placeholder: 'Search Google...'
    },
    'bing': {
      url: 'https://www.bing.com/search?q=',
      placeholder: 'Search with Bing...'
    },
    'duckduckgo': {
      url: 'https://duckduckgo.com/?q=',
      placeholder: 'Search DuckDuckGo...'
    }
  },

  currentEngine: 'bing',

  init: function() {
    // Set up search form submission
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');

    if (searchForm && searchInput) {
      searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = searchInput.value.trim();
        if (query) {
          this.performSearch(query);
        }
      });

      // Auto-focus the search input
      searchInput.focus();
    }
  },

  setEngine: function(engine) {
    if (this.searchEngines[engine]) {
      this.currentEngine = engine;
      const searchInput = document.getElementById('search-input');
      if (searchInput) {
        searchInput.placeholder = this.searchEngines[engine].placeholder;
      }
    }
  },

  performSearch: function(query) {
    const engine = this.searchEngines[this.currentEngine];
    window.location.href = engine.url + encodeURIComponent(query);
  }
};

// Bookmark management
const BookmarkManager = {
  init: function() {
    // Set up event delegation for bookmark clicks
    const bookmarksContainer = document.getElementById('bookmarks-container');
    if (bookmarksContainer) {
      bookmarksContainer.addEventListener('click', (e) => {
        const bookmarkLink = e.target.closest('.bookmark-link');
        if (bookmarkLink) {
          // Handle individual bookmark click
          window.open(bookmarkLink.href, '_blank');
          e.preventDefault();
        }

        const categoryOpenAll = e.target.closest('.category-open-all');
        if (categoryOpenAll) {
          // Handle opening all links in a category
          this.openAllInCategory(categoryOpenAll.dataset.category);
          e.preventDefault();
        }
      });
    }
  },

  renderBookmarks: function(bookmarksConfig) {
    const bookmarksContainer = document.getElementById('bookmarks-container');
    if (!bookmarksContainer) return;

    // Clear existing bookmarks
    bookmarksContainer.innerHTML = '';

    // Create category sections
    bookmarksConfig.categories.forEach(category => {
      const categoryEl = document.createElement('div');
      categoryEl.className = 'bookmark-category mb-4';

      // Category header
      const categoryHeader = document.createElement('div');
      categoryHeader.className = 'category-header d-flex justify-content-between align-items-center mb-2';

      const categoryTitle = document.createElement('h5');
      categoryTitle.textContent = category.name;
      categoryHeader.appendChild(categoryTitle);

      const openAllBtn = document.createElement('button');
      openAllBtn.className = 'btn btn-sm btn-outline-primary category-open-all';
      openAllBtn.textContent = 'Open All';
      openAllBtn.dataset.category = category.name;
      categoryHeader.appendChild(openAllBtn);

      categoryEl.appendChild(categoryHeader);

      // Category links
      const linksContainer = document.createElement('div');
      linksContainer.className = 'row row-cols-2 row-cols-md-4 g-2';

      category.links.forEach(link => {
        const linkCol = document.createElement('div');
        linkCol.className = 'col';

        const linkCard = document.createElement('a');
        linkCard.href = link.url;
        linkCard.className = 'card h-100 text-center bookmark-link text-decoration-none';

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body py-3';
        cardBody.textContent = link.title;

        linkCard.appendChild(cardBody);
        linkCol.appendChild(linkCard);
        linksContainer.appendChild(linkCol);
      });

      categoryEl.appendChild(linksContainer);
      bookmarksContainer.appendChild(categoryEl);
    });
  },

  openAllInCategory: function(categoryName) {
    const category = ConfigManager.currentConfig.bookmarks.categories.find(
      cat => cat.name === categoryName
    );

    if (category && category.links) {
      category.links.forEach(link => {
        window.open(link.url, '_blank');
      });
    }
  }
};

// News feed management
const NewsFeedManager = {
  init: function() {
    // Will be implemented in future
    console.log('News feed functionality will be implemented in a future phase');
  },

  setNewsSources: function(sources) {
    // Will be implemented in future
  }
};

// Theme management
const ThemeManager = {
  themes: ['light', 'dark'],

  init: function() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        this.toggleTheme();
      });
    }
  },

  toggleTheme: function() {
    const currentTheme = ConfigManager.currentConfig.theme;
    const currentIndex = this.themes.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % this.themes.length;

    ConfigManager.currentConfig.theme = this.themes[nextIndex];
    document.body.setAttribute('data-theme', this.themes[nextIndex]);

    // Save the change
    ConfigManager.saveConfig();
  }
};

// Initialize the application when the DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  // Initialize components
  ConfigManager.init();
  SearchManager.init();
  BookmarkManager.init();
  NewsFeedManager.init();
  ThemeManager.init();

  console.log('CustomLandingPage initialized');
});
