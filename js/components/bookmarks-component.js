/**
 * Bookmarks Component
 * 
 * Displays categorized bookmarks/links
 */

// Register the bookmarks component
ComponentRegistry.register('bookmarks', function(config, instanceId) {
  // Create a component based on the base template
  const component = Object.create(BaseComponent(config, instanceId));

  // Override the render method
  component.render = function() {
    if (!this.container) return;

    // Default to empty bookmarks if not specified
    const categories = this.config.categories || [];

    // Create container for bookmarks
    this.container.innerHTML = `
      <div class="bookmarks-component">
        <div class="bookmarks-content"></div>
      </div>
    `;

    const bookmarksContent = this.container.querySelector('.bookmarks-content');

    // Create category sections
    categories.forEach(category => {
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
      linksContainer.className = 'row row-cols-1 row-cols-md-2 g-2';

      if (category.links && Array.isArray(category.links)) {
        category.links.forEach(link => {
          const linkCol = document.createElement('div');
          linkCol.className = 'col';

          const linkCard = document.createElement('a');
          linkCard.href = link.url;
          linkCard.className = 'card h-100 text-center bookmark-link text-decoration-none';

          const cardBody = document.createElement('div');
          cardBody.className = 'card-body py-2';
          cardBody.textContent = link.title;

          linkCard.appendChild(cardBody);
          linkCol.appendChild(linkCard);
          linksContainer.appendChild(linkCol);
        });
      }

      categoryEl.appendChild(linksContainer);
      bookmarksContent.appendChild(categoryEl);
    });

    // Add event delegation for bookmark clicks
    this.container.addEventListener('click', (e) => {
      const bookmarkLink = e.target.closest('.bookmark-link');
      if (bookmarkLink) {
        // Handle individual bookmark click
        window.open(bookmarkLink.href, '_blank');
        e.preventDefault();
      }

      const categoryOpenAll = e.target.closest('.category-open-all');
      if (categoryOpenAll) {
        // Handle opening all links in a category
        const categoryName = categoryOpenAll.dataset.category;
        const category = this.config.categories.find(cat => cat.name === categoryName);

        if (category && category.links) {
          category.links.forEach(link => {
            window.open(link.url, '_blank');
          });
        }

        e.preventDefault();
      }
    });
  };

  return component;
});
