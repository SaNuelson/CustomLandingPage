/**
 * CustomLandingPage - Configuration Manager
 * 
 * Handles loading, saving, and applying configuration
 */

const ConfigManager = {
  // Default configuration with sample layout
  defaultConfig: {
    // Global application settings
    settings: {
      theme: 'light',
      syncProvider: 'local' // 'local', 'google-drive', etc.
    },

    // Layout configuration
    layout: {
      type: 'dock',
      children: [
        // Top area with search
        {
          type: 'component',
          dockPosition: 'top',
          instanceId: 'search-1',
          componentType: 'search',
          componentConfig: {
            engine: 'bing',
            placeholder: 'Search with Bing...',
            autofocus: true
          }
        },
        // Left side with bookmarks
        {
          type: 'component',
          dockPosition: 'left',
          instanceId: 'bookmarks-1',
          componentType: 'bookmarks',
          className: 'bookmarks-panel',
          componentConfig: {
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
          }
        },
        // Bottom area with news
        {
          type: 'component',
          dockPosition: 'bottom',
          instanceId: 'news-1',
          componentType: 'news',
          componentConfig: {
            sources: [],
            showImages: true,
            maxItems: 6
          }
        },
        // Center area with grid for additional components
        {
          type: 'grid',
          dockPosition: 'center',
          columns: ['1fr', '1fr'],
          rows: ['auto'],
          children: [
            {
              type: 'component',
              gridColumn: '1',
              instanceId: 'weather-1',
              componentType: 'weather',
              componentConfig: {
                location: 'auto',
                unit: 'celsius'
              }
            },
            {
              type: 'component',
              gridColumn: '2',
              instanceId: 'clock-1',
              componentType: 'clock',
              componentConfig: {
                format: '24h',
                showDate: true
              }
            }
          ]
        }
      ]
    }
  },

  // Current configuration
  currentConfig: null,

  /**
   * Initialize configuration
   * @param {Function} callback - Called when configuration is ready
   */
  init: function(callback) {
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

    // Apply the theme immediately
    this.applyTheme();

    // Check for cloud configuration if configured
    if (this.currentConfig.settings.syncProvider !== 'local') {
      this.syncFromCloud(callback);
    } else if (callback) {
      callback(this.currentConfig);
    }
  },

  /**
   * Save current configuration to localStorage
   */
  saveConfig: function() {
    try {
      localStorage.setItem('landingPageConfig', JSON.stringify(this.currentConfig));
      console.log('Configuration saved to local storage');

      // Sync to cloud if configured
      if (this.currentConfig.settings.syncProvider !== 'local') {
        this.syncToCloud();
      }
    } catch (e) {
      console.error('Failed to save configuration', e);
    }
  },

  /**
   * Update a component's configuration
   * @param {string} instanceId - ID of the component to update
   * @param {Object} newConfig - New configuration for the component
   */
  updateComponentConfig: function(instanceId, newConfig) {
    // Find the component in the layout tree
    const updateConfig = (layoutItem) => {
      if (!layoutItem) return false;

      // Check if this is the target component
      if (layoutItem.type === 'component' && layoutItem.instanceId === instanceId) {
        layoutItem.componentConfig = Object.assign({}, layoutItem.componentConfig, newConfig);
        return true;
      }

      // Recursively check children
      if (layoutItem.children && Array.isArray(layoutItem.children)) {
        for (let i = 0; i < layoutItem.children.length; i++) {
          if (updateConfig(layoutItem.children[i])) {
            return true;
          }
        }
      }

      return false;
    };

    if (updateConfig(this.currentConfig.layout)) {
      // Update the active component
      LayoutManager.updateComponent(instanceId, newConfig);

      // Save the updated configuration
      this.saveConfig();
    }
  },

  /**
   * Update global settings
   * @param {Object} newSettings - New settings to apply
   */
  updateSettings: function(newSettings) {
    this.currentConfig.settings = Object.assign({}, this.currentConfig.settings, newSettings);

    // Apply changes that affect the UI immediately
    if (newSettings.theme) {
      this.applyTheme();
    }

    // Save the updated settings
    this.saveConfig();
  },

  /**
   * Apply the current theme to the document
   */
  applyTheme: function() {
    if (this.currentConfig && this.currentConfig.settings) {
      document.body.setAttribute('data-theme', this.currentConfig.settings.theme);
    }
  },

  /**
   * Synchronize configuration from cloud storage
   * @param {Function} callback - Called when sync is complete
   */
  syncFromCloud: function(callback) {
    // This will be implemented with Google Drive API in Phase 3
    console.log('Cloud sync not yet implemented');
    if (callback) callback(this.currentConfig);
  },

  /**
   * Synchronize configuration to cloud storage
   */
  syncToCloud: function() {
    // This will be implemented with Google Drive API in Phase 3
    console.log('Cloud sync not yet implemented');
  },

  /**
   * Reset configuration to defaults
   */
  resetToDefaults: function() {
    this.currentConfig = JSON.parse(JSON.stringify(this.defaultConfig));
    this.applyTheme();
    this.saveConfig();
    return this.currentConfig;
  },

  /**
   * Export configuration as JSON string
   * @returns {string} Configuration as JSON string
   */
  exportConfig: function() {
    return JSON.stringify(this.currentConfig, null, 2);
  },

  /**
   * Import configuration from JSON string
   * @param {string} jsonConfig - Configuration as JSON string
   * @returns {boolean} Success status
   */
  importConfig: function(jsonConfig) {
    try {
      const config = JSON.parse(jsonConfig);

      // Validate the configuration structure
      if (!config.settings || !config.layout) {
        throw new Error('Invalid configuration format');
      }

      this.currentConfig = config;
      this.applyTheme();
      this.saveConfig();
      return true;
    } catch (e) {
      console.error('Failed to import configuration', e);
      return false;
    }
  }
};

// Export to global scope
window.ConfigManager = ConfigManager;
