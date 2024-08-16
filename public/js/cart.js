document.querySelectorAll('.manual-quantity').forEach(input => {
    input.addEventListener('input', (event) => {
        const updateButton = event.target.closest('.quantity-selector-container').querySelector('.update-button');
        if (updateButton) {
            updateButton.style.display = 'inline-block';
        }
    });

    input.addEventListener('change', async (event) => {
        const cartItemId = event.target.closest('.cart-item').dataset.cartItemId;
        const newQuantity = parseInt(event.target.value);

        if (isNaN(newQuantity) || newQuantity < 1) {
            event.target.value = 1; // Ensure minimum value of 1
        }

        try {
            const response = await fetch('/cart/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ cartItemId, newQuantity })
            });

            const data = await response.json();

            if (data.success) {
                updateSubtotal(data.newSubtotal);
            } else {
                alert('Failed to update quantity. Please try again.');
            }
        } catch (error) {
            alert('An error occurred. Please try again.');
        }
    });
});

document.querySelectorAll('.quantity-button.increment').forEach(button => {
    button.addEventListener('click', async (event) => {
        const quantityButtonsContainer = event.target.closest('.quantity-buttons');
        const input = quantityButtonsContainer.querySelector('.manual-quantity');

        if (!input) {
            console.error("Manual quantity input (.manual-quantity) is missing.");
            return;
        }

        input.value = parseInt(input.value) + 1;
        input.dispatchEvent(new Event('change'));
    });
});

document.querySelectorAll('.quantity-button.decrement').forEach(button => {
    button.addEventListener('click', async (event) => {
        const quantityButtonsContainer = event.target.closest('.quantity-buttons');
        const input = quantityButtonsContainer.querySelector('.manual-quantity');

        if (!input) {
            console.error("Manual quantity input (.manual-quantity) is missing.");
            return;
        }

        if (parseInt(input.value) > 1) {
            input.value = parseInt(input.value) - 1;
            input.dispatchEvent(new Event('change'));
        }
    });
});

document.querySelectorAll('.update-button').forEach(button => {
    button.addEventListener('click', async (event) => {
        const cartItem = event.target.closest('.cart-item');
        const cartItemId = cartItem.dataset.cartItemId;
        const newQuantity = parseInt(cartItem.querySelector('.manual-quantity').value);

        try {
            const response = await fetch('/cart/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ cartItemId, newQuantity })
            });

            const data = await response.json();

            if (data.success) {
                updateSubtotal(data.newSubtotal);
                event.target.style.display = 'none';
            } else {
                alert('Failed to update quantity. Please try again.');
            }
        } catch (error) {
            alert('An error occurred. Please try again.');
        }
    });
});

document.querySelectorAll('.remove-button').forEach(button => {
    button.addEventListener('click', async (event) => {
        const cartItemId = event.target.closest('.cart-item').dataset.cartItemId;

        try {
            const response = await fetch('/cart/remove', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ cartItemId })
            });

            const data = await response.json();

            if (data.success) {
                event.target.closest('.cart-item').remove();
                updateSubtotal(data.newSubtotal);
            } else {
                alert('Failed to remove item. Please try again.');
            }
        } catch (error) {
            alert('An error occurred. Please try again.');
        }
    });
});

function updateSubtotal(newSubtotal) {
    document.getElementById('subtotal').textContent = `₹${newSubtotal.toFixed(2)}`;
    document.getElementById('item-count').textContent = document.querySelectorAll('.cart-item').length;
}
