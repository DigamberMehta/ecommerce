document.addEventListener('DOMContentLoaded', function () {
    const button = document.querySelector('.add-to-cart-btn');
    if (button) {
        button.addEventListener('click', async function () {
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
                    window.location.href = '/login';
                    return;
                }

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
    }
});
