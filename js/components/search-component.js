/**
 * Search Component
 * 
 * Provides a search box that connects to various search engines
 */

// Register the search component
ComponentRegistry.register('search', function(config, instanceId) {
  // Create a component based on the base template
  const component = Object.create(BaseComponent(config, instanceId));

  // Search engines configuration
  const searchEngines = {
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
    },
    'youtube': {
      url: 'https://www.youtube.com/results?search_query=',
      placeholder: 'Search YouTube...'
    },
    'github': {
      url: 'https://github.com/search?q=',
      placeholder: 'Search GitHub...'
    }
  };

  // Override the render method
  component.render = function() {
    if (!this.container) return;

    // Default to Bing if not specified
    const engine = this.config.engine || 'bing';
    const placeholder = this.config.placeholder || searchEngines[engine]?.placeholder || 'Search...';

    // Create the search form
    this.container.innerHTML = `
      <div class="search-component">
        <form class="search-form">
          <div class="input-group">
            <input type="text" class="form-control form-control-lg search-input" 
                   placeholder="${placeholder}" aria-label="Search">
            <button class="btn btn-primary" type="submit">
              <i class="bi bi-search"></i>
            </button>
          </div>
        </form>
      </div>
    `;

    // Add event listener for form submission
    const form = this.container.querySelector('.search-form');
    const input = this.container.querySelector('.search-input');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const query = input.value.trim();
      if (query) {
        const currentEngine = this.config.engine || 'bing';
        const searchUrl = searchEngines[currentEngine]?.url || searchEngines.bing.url;
        window.location.href = searchUrl + encodeURIComponent(query);
      }
    });

    // Auto-focus if configured
    if (this.config.autofocus) {
      setTimeout(() => input.focus(), 100);
    }
  };

  return component;
});
