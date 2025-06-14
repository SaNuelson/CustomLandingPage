/**
 * CustomLandingPage - Component System Framework
 *
 * This file defines the component system architecture that allows for
 * dynamically building the UI from configuration.
 */

/**
 * Component Registry - Manages available component types
 */
const ComponentRegistry = {
  // Map of component types to their factory functions
  _componentTypes: {},

  /**
   * Register a new component type
   * @param {string} typeName - Unique identifier for this component type
   * @param {function} factory - Factory function that creates component instances
   */
  register: function(typeName, factory) {
    if (this._componentTypes[typeName]) {
      console.warn(`Component type '${typeName}' is already registered. Overwriting.`);
    }
    this._componentTypes[typeName] = factory;
  },

  /**
   * Create a component instance of the specified type
   * @param {string} typeName - Type of component to create
   * @param {Object} config - Configuration for the component
   * @param {string} instanceId - Unique ID for this component instance
   * @returns {Object} Component instance
   */
  createComponent: function(typeName, config, instanceId) {
    const factory = this._componentTypes[typeName];
    if (!factory) {
      console.error(`Component type '${typeName}' is not registered`);
      return null;
    }

    return factory(config, instanceId);
  },

  /**
   * Get a list of all registered component types
   * @returns {string[]} Array of component type names
   */
  getAvailableTypes: function() {
    return Object.keys(this._componentTypes);
  }
};

/**
 * Layout Manager - Builds and updates the UI based on configuration
 */
const LayoutManager = {
  // Map of active component instances by ID
  _activeComponents: {},

  // Reference to the root element where the layout is built
  _rootElement: null,

  /**
   * Initialize the layout manager
   * @param {HTMLElement} rootElement - The root DOM element for the layout
   */
  init: function(rootElement) {
    this._rootElement = rootElement;
  },

  /**
   * Build the entire UI from configuration
   * @param {Object} layoutConfig - Configuration describing the layout and components
   */
  buildLayout: function(layoutConfig) {
    // Clear the existing layout
    if (this._rootElement) {
      this._rootElement.innerHTML = '';
      this._activeComponents = {};
    }

    // Create the layout structure
    const layoutElement = this._createLayoutElement(layoutConfig);
    if (layoutElement && this._rootElement) {
      this._rootElement.appendChild(layoutElement);
    }
  },

  /**
   * Update an existing component with new configuration
   * @param {string} instanceId - ID of the component to update
   * @param {Object} newConfig - New configuration for the component
   */
  updateComponent: function(instanceId, newConfig) {
    const component = this._activeComponents[instanceId];
    if (component && component.update) {
      component.update(newConfig);
    }
  },

  /**
   * Create a layout element (grid, stack, dock, or component)
   * @private
   * @param {Object} config - Configuration for this layout element
   * @returns {HTMLElement} The created DOM element
   */
  _createLayoutElement: function(config) {
    if (!config || !config.type) {
      console.error('Invalid layout configuration', config);
      return null;
    }

    switch (config.type) {
      case 'grid':
        return this._createGridPanel(config);
      case 'stack':
        return this._createStackPanel(config);
      case 'dock':
        return this._createDockPanel(config);
      case 'component':
        return this._createComponentElement(config);
      default:
        console.error(`Unknown layout element type: ${config.type}`);
        return null;
    }
  },

  /**
   * Create a grid panel layout
   * @private
   * @param {Object} config - Grid configuration
   * @returns {HTMLElement} Grid panel element
   */
  _createGridPanel: function(config) {
    const gridElement = document.createElement('div');
    gridElement.className = 'grid-panel';

    // Set CSS grid properties
    if (config.rows) {
      gridElement.style.gridTemplateRows = config.rows.join(' ');
    }

    if (config.columns) {
      gridElement.style.gridTemplateColumns = config.columns.join(' ');
    }

    // Add style class if specified
    if (config.className) {
      gridElement.classList.add(config.className);
    }

    // Create child elements
    if (config.children && Array.isArray(config.children)) {
      config.children.forEach((childConfig, index) => {
        const childElement = this._createLayoutElement(childConfig);
        if (childElement) {
          // Set grid position if specified
          if (childConfig.gridRow) {
            childElement.style.gridRow = childConfig.gridRow;
          }
          if (childConfig.gridColumn) {
            childElement.style.gridColumn = childConfig.gridColumn;
          }

          gridElement.appendChild(childElement);
        }
      });
    }

    return gridElement;
  },

  /**
   * Create a stack panel layout
   * @private
   * @param {Object} config - Stack panel configuration
   * @returns {HTMLElement} Stack panel element
   */
  _createStackPanel: function(config) {
    const stackElement = document.createElement('div');
    stackElement.className = 'stack-panel';

    // Set orientation (horizontal or vertical)
    if (config.orientation === 'horizontal') {
      stackElement.classList.add('horizontal');
    } else {
      stackElement.classList.add('vertical');
    }

    // Add style class if specified
    if (config.className) {
      stackElement.classList.add(config.className);
    }

    // Create child elements
    if (config.children && Array.isArray(config.children)) {
      config.children.forEach(childConfig => {
        const childElement = this._createLayoutElement(childConfig);
        if (childElement) {
          stackElement.appendChild(childElement);
        }
      });
    }

    return stackElement;
  },

  /**
   * Create a dock panel layout
   * @private
   * @param {Object} config - Dock panel configuration
   * @returns {HTMLElement} Dock panel element
   */
  _createDockPanel: function(config) {
    const dockElement = document.createElement('div');
    dockElement.className = 'dock-panel';

    // Add style class if specified
    if (config.className) {
      dockElement.classList.add(config.className);
    }

    // Create regions for each dock position (top, right, bottom, left, center)
    const positions = ['top', 'right', 'bottom', 'left', 'center'];

    positions.forEach(position => {
      const regionElement = document.createElement('div');
      regionElement.className = `dock-${position}`;
      dockElement.appendChild(regionElement);

      // Add children to the appropriate region
      if (config.children && Array.isArray(config.children)) {
        config.children.forEach(childConfig => {
          if (childConfig.dockPosition === position) {
            const childElement = this._createLayoutElement(childConfig);
            if (childElement) {
              regionElement.appendChild(childElement);
            }
          }
        });
      }
    });

    return dockElement;
  },

  /**
   * Create a component element
   * @private
   * @param {Object} config - Component configuration
   * @returns {HTMLElement} Component container element
   */
  _createComponentElement: function(config) {
    if (!config.componentType || !config.instanceId) {
      console.error('Component configuration missing required fields', config);
      return null;
    }

    // Create container for the component
    const containerElement = document.createElement('div');
    containerElement.className = 'component-container';
    containerElement.id = `component-${config.instanceId}`;

    // Add style class if specified
    if (config.className) {
      containerElement.classList.add(config.className);
    }

    // Create the component instance
    const component = ComponentRegistry.createComponent(
      config.componentType,
      config.componentConfig || {},
      config.instanceId
    );

    // Store reference to active component
    if (component) {
      this._activeComponents[config.instanceId] = component;

      // Initialize component with container element
      if (component.init) {
        component.init(containerElement);
      }

      // Render component content
      if (component.render) {
        component.render();
      }
    }

    return containerElement;
  }
};

/**
 * Base Component - Template for creating component types
 *
 * @param {Object} config - Component configuration
 * @param {string} instanceId - Unique ID for this component instance
 * @returns {Object} Component instance
 */
function BaseComponent(config, instanceId) {
  return {
    // Component properties
    instanceId: instanceId,
    config: config || {},
    container: null,

    /**
     * Initialize the component
     * @param {HTMLElement} containerElement - DOM element to render into
     */
    init: function(containerElement) {
      this.container = containerElement;
    },

    /**
     * Render the component content
     */
    render: function() {
      // Base implementation does nothing - override in specific components
      console.warn('render() not implemented for this component');
    },

    /**
     * Update the component with new configuration
     * @param {Object} newConfig - New configuration object
     */
    update: function(newConfig) {
      this.config = Object.assign({}, this.config, newConfig);
      this.render(); // Re-render with new config
    },

    /**
     * Clean up resources used by this component
     */
    destroy: function() {
      // Base implementation does nothing - override if needed
    }
  };
}

// Export components to global scope
window.ComponentRegistry = ComponentRegistry;
window.LayoutManager = LayoutManager;
window.BaseComponent = BaseComponent;
