document.querySelectorAll('.quantity-selector').forEach(select => {
    select.addEventListener('change', async (event) => {
        const cartItemId = event.target.closest('.cart-item').dataset.cartItemId;
        let newQuantity = event.target.value;

        if (newQuantity === 'more') {
            const manualInput = event.target.nextElementSibling;
            event.target.style.display = 'none';
            manualInput.style.display = 'block';
            manualInput.focus();
            return;
        } else {
            newQuantity = parseInt(newQuantity);
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

document.querySelectorAll('.manual-quantity').forEach(input => {
    input.addEventListener('input', (event) => {
        const updateButton = event.target.closest('.quantity-selector-container').querySelector('.update-button');
        updateButton.style.display = 'inline-block';
    });

    input.addEventListener('change', (event) => {
        if (event.target.value !== '') {
            const updateButton = event.target.closest('.quantity-selector-container').querySelector('.update-button');
            updateButton.style.display = 'inline-block';
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

document.querySelectorAll('.quantity-button.increment').forEach(button => {
    button.addEventListener('click', async (event) => {
        const select = event.target.closest('.quantity-buttons').querySelector('.quantity-selector');
        const input = event.target.closest('.quantity-buttons').querySelector('.manual-quantity');

        if (select.style.display !== 'none') {
            let currentQuantity = parseInt(select.value);
            if (currentQuantity < 10) {
                select.value = currentQuantity + 1;
                select.dispatchEvent(new Event('change'));
            } else {
                input.value = currentQuantity + 1; // Set input value to 11
                select.style.display = 'none';
                input.style.display = 'block';
                input.dispatchEvent(new Event('change'));
            }
        } else {
            input.value = parseInt(input.value) + 1;
            input.dispatchEvent(new Event('change'));
        }
    });
});

document.querySelectorAll('.quantity-button.decrement').forEach(button => {
    button.addEventListener('click', async (event) => {
        const select = event.target.closest('.quantity-buttons').querySelector('.quantity-selector');
        const input = event.target.closest('.quantity-buttons').querySelector('.manual-quantity');

        if (select.style.display !== 'none') {
            const currentQuantity = parseInt(select.value);
            if (currentQuantity > 1) {
                select.value = currentQuantity - 1;
                select.dispatchEvent(new Event('change'));
            }
        } else {
            if (parseInt(input.value) > 1) {
                input.value = parseInt(input.value) - 1;
                input.dispatchEvent(new Event('change'));
            }
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