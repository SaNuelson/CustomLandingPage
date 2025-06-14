# AI Memory: CustomLandingPage Project

## Project Overview

This is a custom landing page project aimed at replacing the default Microsoft Edge landing page with a personalized, clutter-free alternative. The project will be a configurable dashboard with user-defined settings stored in the cloud (primarily Google Drive, with potential for other providers).

The project structure currently consists of:
- HTML file (index.html) with Bootstrap 5.3.6
- Empty CSS and JS directories

## Project Requirements

### Purpose
- Create a personalized browser landing page that's cleaner and more customizable than Microsoft Edge's default
- Focus on simplicity, customization, and performance
- MIT licensed open-source project for personal use, but available to others

### Target Audience
- Primary: The developer (you) 
- Secondary: Anyone who might find the project and want to use it

### Key Components/Features
- Pre-focused search bar for quick web searches
- Possible separate AI search functionality
- Categorized bookmarks/links to frequently used sites
- Possibly grouped pages/bookmarks
- Curated news feed (manually selected by the user)
- Potentially fun/random elements like a trivia box
- Configuration system with cloud storage

### Design Requirements
- Initially simple design with no specific requirements
- Future implementation of light/dark mode
- Long-term goal: User-configurable color schemes (with 2-3 main colors)

### Technical Requirements
- Single-page application
- Support for dynamic page assembly based on configuration
- Cloud synchronization for settings (Google Drive integration)
- Fast loading and responsiveness
- Local storage for caching configurations

### Project Constraints
- No specific timeline (personal hobby project)
- Focus on personal utility rather than broad appeal

## Key Decisions & Requirements

1. **Cloud Storage**: Primary focus on Google Drive integration, with potential for a generic sync dialog that could connect to other services.

2. **Search Functionality**: Initially implement Bing search (user's preference), but design with a dropdown in settings to select different search engines.

3. **News Feed**: Use APIs from selected news outlets to display a scrollable list of news cards. Each card should include:
   - Background image from the API
   - Title
   - Brief introduction text (1-2 sentences)
   - Source attribution

4. **Bookmark System**: Implement user-configurable categories (e.g., coding, gaming, entertainment). Additional features:
   - Ability to open all links in a category at once
   - Support for pre-configured sets of bookmarks

5. **Offline Functionality**: Not a priority since the primary use case involves online services in a browser.

6. **Privacy Considerations**: Only configuration data will be stored in the cloud (layout, preferences, theme settings, news sources). No sensitive personal data expected to be included.

7. **Theming**: Progressive implementation approach:
   - Start with fixed themes
   - Add light/dark mode toggle
   - Implement additional preset themes
   - Develop fully customizable theming system
   - Potential for AI-generated backgrounds and theme creation based on prompts or initial colors

8. **Productivity Features**: Integration with Microsoft ToDo is desired. Time tracking functionality is under consideration.

## Architecture & Development Approach

### Revised Component-Based Architecture

#### Core Components
1. **Layout System**
   - Grid Panel: Divides space into rows and columns with configurable sizes
   - Stack Panel: Arranges elements vertically or horizontally in a flowing manner
   - Dock Panel: Docks elements to edges (top, right, bottom, left) with remaining space in center

2. **Component Registry**
   - Maintains a registry of available component types
   - Each component is self-contained with its own configuration
   - Components can be instantiated multiple times with different configurations

3. **Layout Manager**
   - Builds UI from configuration by instantiating and positioning components
   - Handles responsive adjustments for different screen sizes
   - Manages component lifecycle (creation, update, destruction)

4. **Configuration System**
   - Hierarchical configuration that describes entire layout and all components
   - Each component instance has its own configuration block
   - Allows for nested layouts and component trees

#### Component Types
- Search Component: Configurable search providers
- Bookmark Component: Link collections with customizable grouping
- News Component: Configurable news feeds
- Weather Component: Weather information
- Clock/Date Component: Time and date display
- Todo Component: Integration with Microsoft ToDo
- Custom HTML Component: For embedding arbitrary content

### Development Phases

#### Phase 1: Core Infrastructure
- Implement basic layout system (Grid, Stack, Dock panels)
- Create component registry and lifecycle management
- Develop configuration system with local storage
- Build initial set of basic components (Search, Bookmarks)

#### Phase 2: Enhanced Components & Customization
- Add advanced component types (News, Weather, etc.)
- Implement theme system with light/dark and custom colors
- Create settings UI for real-time layout and component configuration
- Add drag-and-drop capabilities for visual layout editing

#### Phase 3: Cloud & Advanced Features
- Implement Google Drive integration for config synchronization
- Add Microsoft ToDo integration component
- Develop plugin system for third-party components
- Create shareable configuration templates

### Development Principles
- **Component Independence**: Each component should be self-contained
- **Configuration-Driven**: All aspects of the UI should be configurable
- **Progressive Enhancement**: Start with basic functionality, progressively add features
- **Local-First**: Optimize for local performance, sync to cloud as background operation
- **Separation of Concerns**: Clear boundaries between layout, components, and data

## Success Metrics

1. Performance: Page loads and responds without noticeable delays
2. User satisfaction: The developer likes and uses it regularly
3. Customizability: Supports a wide range of personalization options

## Ideas for Future Development

- Implement a modular component structure for easy maintenance
- Consider adding a CSS preprocessor like SASS for better organization
- Add animations/transitions for improved user experience
- Implement plugin system for extending functionality
- Add keyboard shortcuts for power users
- Consider progressive web app capabilities for offline use
- Implement data export/import for backup purposes

## Potential Concerns/Issues

### Technical Challenges
- Bootstrap CDN dependency might cause loading issues - consider serving files locally
- Google Drive API integration will require OAuth authentication and proper error handling
- News API integrations might have rate limits or require API keys
- Managing multiple API connections (search, news, cloud storage, ToDo) requires careful architecture

### Design Challenges
- Balancing customization options with simplicity of interface
- Creating a cohesive visual design across different theme options
- Ensuring the UI remains clean and uncluttered while supporting diverse features

### Project Management
- Maintaining momentum on a hobby project without firm deadlines
- Avoiding scope creep as new feature ideas emerge
- Determining when to shift from hardcoded implementations to configuration-driven approach

### User Experience
- Ensuring fast initial load times despite cloud configuration
- Providing intuitive configuration UI that doesn't overwhelm
- Handling synchronization conflicts or offline scenarios gracefully

## Progress Tracking

| Date | Task | Status | Notes |
|------|------|--------|-------|
| 2025-06-14 | Initial project setup | Completed | Basic HTML structure with Bootstrap |

## Decision Log

| Date | Decision | Rationale | Alternatives Considered |
|------|----------|-----------|-------------------------|
| 2025-06-14 | Using Bootstrap 5.3.6 | Provides responsive design system and components | Custom CSS, Tailwind CSS |
