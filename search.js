// search.js

document.addEventListener('DOMContentLoaded', function () {
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');
  
    searchButton.addEventListener('click', function () {
      const query = searchInput.value.trim();
      if (query) {
        const searchUrl = `https://search.brave.com/search?q=${encodeURIComponent(query)}`;
        window.open(searchUrl, '_blank');
      }
    });
  
    searchInput.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        searchButton.click();
      }
    });
  });
  