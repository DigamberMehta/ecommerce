 
  function scrollImagesLeft(reviewId) {
    const container = document.getElementById(`review-images-show-container-${reviewId}`);
    container.scrollBy({
      left: -300, // Adjust the value as needed
      behavior: 'smooth'
    });
  }

  function scrollImagesRight(reviewId) {
    const container = document.getElementById(`review-images-show-container-${reviewId}`);
    container.scrollBy({
      left: 300, // Adjust the value as needed
      behavior: 'smooth'
    });
  }

 

  // Function to check if the container is overflowing
  function checkOverflow(reviewId) {
    const container = document.getElementById(`review-images-show-container-${reviewId}`);
    const reviewContainer = document.getElementById(`review-images-container-${reviewId}`);
    
    // Check if the container is overflowing
    if (container.scrollWidth > container.clientWidth) {
      reviewContainer.classList.add('overflowing');
    } else {
      reviewContainer.classList.remove('overflowing');
    }
  }

  // Run the overflow check on page load
  document.addEventListener('DOMContentLoaded', function() {
    const reviewContainers = document.querySelectorAll('.review-images-container');
    reviewContainers.forEach(container => {
      const reviewId = container.id.split('-')[3]; // Extracting the review ID from the container's ID
      checkOverflow(reviewId);

      // Make the container draggable
      makeContainerDraggable(reviewId);
    });
  });

  // Also, run the overflow check on window resize
  window.addEventListener('resize', function() {
    const reviewContainers = document.querySelectorAll('.review-images-container');
    reviewContainers.forEach(container => {
      const reviewId = container.id.split('-')[3]; // Extracting the review ID from the container's ID
      checkOverflow(reviewId);
    });
  });

  // Function to make the container draggable
  function makeContainerDraggable(reviewId) {
    const container = document.getElementById(`review-images-show-container-${reviewId}`);
    let isDown = false;
    let startX;
    let scrollLeft;

    container.addEventListener('mousedown', (e) => {
      isDown = true;
      container.classList.add('dragging');
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    });

    container.addEventListener('mouseleave', () => {
      isDown = false;
      container.classList.remove('dragging');
    });

    container.addEventListener('mouseup', () => {
      isDown = false;
      container.classList.remove('dragging');
    });

    container.addEventListener('mousemove', (e) => {
      if (!isDown) return; // Stop the function if the mouse is not down
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 2; // Scroll-fast
      container.scrollLeft = scrollLeft - walk;
    });
  }
  const shareProductButton = document.getElementById('shareProductButton');
  const copyShareProductUrlButton = document.getElementById('copyShareProductUrlButton');
  const shareProductUrlButton = document.getElementById('shareProductUrlButton');
  const shareProductShortUrlInput = document.getElementById('shareProductShortUrlInput');
  const shareProductDropdown = document.getElementById('shareProductDropdown');
  
  // Toggle dropdown visibility when share button is clicked
  shareProductButton.onclick = function() {
    // Toggle the display of the dropdown
    if (shareProductDropdown.style.display === 'block') {
      shareProductDropdown.style.display = 'none';
    } else {
      shareProductDropdown.style.display = 'block';
    }
  };
  
  // Copy URL to clipboard and change button text to 'Copied!'
  copyShareProductUrlButton.onclick = function() {
    shareProductShortUrlInput.select();
    shareProductShortUrlInput.setSelectionRange(0, 99999); // For mobile devices
  
    navigator.clipboard.writeText(shareProductShortUrlInput.value)
      .then(() => {
        copyShareProductUrlButton.innerHTML = 'Copied!';
        setTimeout(() => {
          copyShareProductUrlButton.innerHTML = '<i class="fas fa-link"></i> Copy Link';
        }, 2000); // Reset the button text after 2 seconds
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });
  };
  
  // Share URL functionality (this can be customized as needed)
  shareProductUrlButton.onclick = function() {
    if (navigator.share) {
      navigator.share({
        title: 'Check out this product!',
        url: shareProductShortUrlInput.value
      }).then(() => {
        console.log('Thanks for sharing!');
      }).catch(console.error);
    } else {
      alert('Your browser does not support the Web Share API.');
    }
  };
  
  // Close dropdown when clicking outside of it
  window.onclick = function(event) {
    const isClickInsideDropdown = shareProductDropdown.contains(event.target);
    const isClickOnShareButton = shareProductButton.contains(event.target);
  
    // If the click is outside the dropdown and not on the share button, close the dropdown
    if (!isClickInsideDropdown && !isClickOnShareButton) {
      shareProductDropdown.style.display = 'none';
    }
  };
  