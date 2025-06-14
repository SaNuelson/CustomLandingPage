/**
 * News Component
 * 
 * Displays news from configured sources
 */

// Register the news component
ComponentRegistry.register('news', function(config, instanceId) {
  // Create a component based on the base template
  const component = Object.create(BaseComponent(config, instanceId));

  // Sample news data (will be replaced with actual API calls later)
  const sampleNews = [
    {
      title: 'Sample News Article 1',
      excerpt: 'This is a placeholder for actual news content from APIs.',
      source: 'Sample Source',
      url: '#',
      imageUrl: 'https://via.placeholder.com/400x200?text=News+1'
    },
    {
      title: 'Sample News Article 2',
      excerpt: 'Another placeholder for news content that will come from configured sources.',
      source: 'Sample Source',
      url: '#',
      imageUrl: 'https://via.placeholder.com/400x200?text=News+2'
    },
    {
      title: 'Integration with News APIs Coming Soon',
      excerpt: 'In a future update, this component will connect to actual news sources.',
      source: 'Development Update',
      url: '#',
      imageUrl: 'https://via.placeholder.com/400x200?text=Coming+Soon'
    }
  ];

  // Override the render method
  component.render = function() {
    if (!this.container) return;

    // Get configuration options
    const showImages = this.config.showImages !== false;
    const maxItems = this.config.maxItems || 6;

    // Create container for news
    this.container.innerHTML = `
      <div class="news-component">
        <h4 class="mb-3">News Feed</h4>
        <div class="row row-cols-1 row-cols-md-3 g-4 news-content"></div>
      </div>
    `;

    const newsContent = this.container.querySelector('.news-content');

    // In the future, this will fetch from actual news APIs
    // For now, use sample data
    const newsItems = sampleNews.slice(0, maxItems);

    newsItems.forEach(item => {
      const itemCol = document.createElement('div');
      itemCol.className = 'col';

      const newsCard = document.createElement('div');
      newsCard.className = 'news-card';
      if (showImages && item.imageUrl) {
        newsCard.style.backgroundImage = `url('${item.imageUrl}')`;
      }

      const newsContent = document.createElement('div');
      newsContent.className = 'news-content';

      const newsTitle = document.createElement('h5');
      newsTitle.className = 'news-title';
      newsTitle.textContent = item.title;

      const newsExcerpt = document.createElement('p');
      newsExcerpt.className = 'news-excerpt';
      newsExcerpt.textContent = item.excerpt;

      const newsSource = document.createElement('div');
      newsSource.className = 'news-source';
      newsSource.textContent = item.source;

      newsContent.appendChild(newsTitle);
      newsContent.appendChild(newsExcerpt);
      newsContent.appendChild(newsSource);

      newsCard.appendChild(newsContent);
      itemCol.appendChild(newsCard);
      newsContent.appendChild(itemCol);
    });

    // Add click event to open news articles
    this.container.addEventListener('click', (e) => {
      const newsCard = e.target.closest('.news-card');
      if (newsCard && newsCard.dataset.url) {
        window.open(newsCard.dataset.url, '_blank');
      }
    });
  };

  // In the future, add methods to fetch from news APIs
  component.fetchNews = function() {
    // This will be implemented with actual news API calls
    console.log('News API integration coming in a future update');
  };

  return component;
});
