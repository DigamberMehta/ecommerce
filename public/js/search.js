    // Add to Cart button click event
    document.querySelector('.add-to-cart-btn').addEventListener('click', async function () {
        const button = this;
        const productId = button.getAttribute('data-product-id');
        console.log('Product ID:', productId);

        try {
            const response = await fetch('/cart/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ productId })
            });

            if (response.status === 401) {
                // Redirect to login page if not authenticated
                window.location.href = '/login';
                return;
            }

            // Check if response is JSON
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                const data = await response.json();
                console.log('Response:', data);

                if (data.success) {
                    button.textContent = 'Added to Cart';
                    setTimeout(() => {
                        button.textContent = 'Add to Cart';
                    }, 2000);
                } else {
                    alert(data.message || 'Failed to add product to cart. Please try again.');
                }
            } else {
                console.error('Unexpected response format:', contentType);
                alert('An unexpected error occurred. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            
        }
    });
    function reloadPage() {
    // Optionally, you could add code here to handle the cart addition before reloading
    location.reload();
}
document.addEventListener('DOMContentLoaded', function() {
const button = document.querySelector('.add-to-cart-btn');
if (button) {
    button.addEventListener('click', function(event) {
        // Prevent default behavior if needed
        event.preventDefault();

        // Perform your action here, e.g., reloadPage()
        reloadPage();

        // Propagate the event to the parent (if needed)
        // You can also manually dispatch the event if required
        const parentDiv = button.closest('.card-button');
        if (parentDiv) {
            parentDiv.dispatchEvent(new Event('click', { bubbles: true }));
        }
    });
}
});
