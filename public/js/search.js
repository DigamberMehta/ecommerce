async function fetchBrowsingHistory() {
    try {
        const response = await fetch('/search/history');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const historyTerms = await response.json();
        return historyTerms; // Return the fetched history terms
    } catch (err) {
        console.error('Error fetching browsing history:', err);
        return []; // Return an empty array if there's an error
    }
}

async function showBrowsingHistory() {
    const dropdown = document.getElementById('suggestions-dropdown');
    const input = document.getElementById('search-input');
    const query = input.value.trim();

    if (query.length === 0) { // Only show browsing history if input is empty
        const browsingHistoryTerms = await fetchBrowsingHistory();

        if (browsingHistoryTerms.length > 0) {
            dropdown.innerHTML = browsingHistoryTerms.map(term => `
                <li>
                    <span class="search-history-container">
                       <span> <i class="fa-regular fa-clock-rotate-left history-icon"></i> <span onclick="setSearchTerm('${term}')">${term}</span></span>
                        <a href="#" class="remove-link" onclick="removeSearchTerm('${term}')">Remove</a>
                    </span>
                </li>
            `).join('');
            dropdown.style.display = 'block'; // Show the dropdown with browsing history
        } else {
            dropdown.innerHTML = '';
            dropdown.style.display = 'none'; // Hide the dropdown if there are no browsing history terms
        }
    } else {
        dropdown.innerHTML = '';
        dropdown.style.display = 'none'; // Hide the dropdown if input is not empty
    }
}

async function removeSearchTerm(term) {
    try {
        const response = await fetch('/search/history/remove', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ term })
        });

        if (!response.ok) {
            throw new Error('Failed to remove search term.');
        }

        console.log('Search term removed successfully.');
        showBrowsingHistory(); // Refresh the browsing history to reflect the removal
    } catch (err) {
        console.error('Error removing search term:', err);
    }
}

async function fetchSuggestions() {
    const input = document.getElementById('search-input');
    const dropdown = document.getElementById('suggestions-dropdown');
    const query = input.value.trim();

    if (query.length > 0) { // Fetch suggestions only if the input is not empty
        try {
            const response = await fetch(`/search/suggestions?query=${query}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const suggestions = await response.json();

            if (suggestions.length > 0) {
                dropdown.innerHTML = suggestions.map(suggestion => `
                    <li onclick="redirectToProduct('${suggestion._id}', '${suggestion.slug}')">
                        <img src="${suggestion.images[0]}" alt="${suggestion.title}" class="suggestion-image" />
                        <span>${suggestion.title}</span>
                    </li>
                `).join('');
                dropdown.style.display = 'block'; // Show the dropdown with results
            } else {
                dropdown.innerHTML = '';
                dropdown.style.display = 'none'; // Hide the dropdown if no results are found
            }
        } catch (err) {
            console.error('Error fetching suggestions:', err);
            dropdown.innerHTML = '';
            dropdown.style.display = 'none'; // Hide the dropdown in case of error
        }
    } else {
        showBrowsingHistory(); // If input is empty, show browsing history
    }
}

function setSearchTerm(term) {
    const input = document.getElementById('search-input');
    const form = document.getElementById('search-form-navbar');
    input.value = term; // Set the input value
    form.submit(); // Submit the form automatically to trigger the search
}

function redirectToProduct(id, slug) {
    window.location.href = `/products/${id}/${slug}`;
}

document.addEventListener('click', (event) => {
    const suggestionsDropdown = document.getElementById('suggestions-dropdown');
    const searchInput = document.getElementById('search-input');
    
    if (!suggestionsDropdown.contains(event.target) && event.target !== searchInput) {
        suggestionsDropdown.innerHTML = '';
        suggestionsDropdown.style.display = 'none'; // Hide the dropdown when clicking outside
    }
});

document.getElementById('search-input').addEventListener('focus', showBrowsingHistory); // Show browsing history on focus if input is empty
document.getElementById('search-input').addEventListener('input', fetchSuggestions); // Fetch suggestions or show browsing history on input
