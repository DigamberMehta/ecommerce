// document.addEventListener("DOMContentLoaded", function () {
//     const sellingPrice = <%= product.sellingPrice %>;
//     const mrpPrice = <%= product.mrpPrice %>;
//     const discountElement = document.querySelector(".product-show-discount");

//     const discountAmount = mrpPrice - sellingPrice;
//     const discountPercentage = ((discountAmount / mrpPrice) * 100).toFixed(2);

//     discountElement.textContent = `${discountPercentage}% off`;

//     // Handle Add to Cart button click
//     document.querySelector('.product-show-btn-add-to-cart').addEventListener('click', async function () {
//         const button = this;
//         const productId = button.getAttribute('data-product-id');
//         console.log('Product ID:', productId);

//         try {
//             const response = await fetch('/cart/add', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({ productId })
//             });

//             // Check if response is JSON
//             const contentType = response.headers.get('content-type');
//             if (contentType && contentType.includes('application/json')) {
//                 const data = await response.json();
//                 console.log('Response:', data);

//                 if (response.status === 401) {
//                     // Redirect to login page if not authenticated
//                     window.location.href = '/login';
//                     return;
//                 }

//                 if (data.success) {
//                     button.textContent = 'Added to Cart';
                    
//                     setTimeout(() => {
//                         button.textContent = 'Add to Cart';
//                     }, 2000);
//                 } else {
//                     alert(data.message || 'Failed to add product to cart. Please try again.');
//                 }
//             } else {
//                 console.error('Unexpected response format:', contentType);
//                 alert('An unexpected error occurred. Please try again.');
//             }
//         } catch (error) {
//             // console.error('Error:', error);
//             // alert('An error occurred. Please try again.');
//         }
//     });
// });