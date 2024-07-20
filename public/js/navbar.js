async function fetchSuggestions() {
    const input = document.getElementById('search-input');
    const dropdown = document.getElementById('suggestions-dropdown');
    const query = input.value.trim();

    if (query.length < 3) {
      dropdown.innerHTML = '';
      dropdown.style.display = 'none'; // Hide the dropdown if the query is less than 3 characters
      return;
    }

    try {
      const response = await fetch(`/search?query=${query}&suggestions=true`);
      const suggestions = await response.json();

      if (suggestions.length > 0) {
        dropdown.innerHTML = suggestions.map(suggestion => `
        <li onclick="redirectToProduct('${suggestion._id}', '${suggestion.slug}')">
          <img src="${suggestion.images[0]}" alt="${suggestion.title}" class="suggestion-image" />
          <span>${suggestion.title}</span>
        </li>
      `).join('');
        dropdown.style.display = 'block'; // Show the dropdown when there are results
      } else {
        dropdown.innerHTML = '';
        dropdown.style.display = 'none'; // Hide the dropdown if there are no results
      }
    } catch (err) {
      console.error('Error fetching suggestions:', err);
      dropdown.innerHTML = '';
      dropdown.style.display = 'none'; // Hide the dropdown in case of error
    }
  }

  function redirectToProduct(id, slug) {
    window.location.href = `/products/${id}/${slug}`;
  }

  document.addEventListener('click', (event) => {
    const suggestionsDropdown = document.getElementById('suggestions-dropdown');
    if (!suggestionsDropdown.contains(event.target) && event.target.id !== 'search-input') {
      suggestionsDropdown.innerHTML = '';
      suggestionsDropdown.style.display = 'none'; // Hide the dropdown when clicking outside
    }
  });
  async function fetchCartQuantity() {
      try {
        const response = await fetch('/cart/quantity', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        
        });
        const data = await response.json();
        if (response.ok) {
          document.getElementById('cart-quantity-value').textContent = data.totalQuantity;
        } else {
          console.error('Failed to fetch cart quantity:', data.error);
        }
      } catch (error) {
        console.error('Error fetching cart quantity:', error);
      }
    }
    fetchCartQuantity();

    document.addEventListener('DOMContentLoaded', function() {
  const burger = document.getElementById('burger');
  const sideMenu = document.getElementById('side-menu');
  const closeBtn = document.getElementById('close-btn');

  burger.addEventListener('click', function() {
    sideMenu.classList.toggle('open');
  });

  closeBtn.addEventListener('click', function() {
    sideMenu.classList.remove('open');
  });

  // Close side menu when clicking outside of it
  document.addEventListener('click', function(event) {
    if (!sideMenu.contains(event.target) && !burger.contains(event.target)) {
      sideMenu.classList.remove('open');
    }
  });
});
