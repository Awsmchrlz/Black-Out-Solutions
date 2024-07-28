
   document.addEventListener('DOMContentLoaded', function() {
    const cart = JSON.parse(localStorage.getItem('cart')) || {};
    const cartTableBody = document.querySelector('.cart-list tbody');

    let subtotal = 0;
    let delivery = 0; // Default delivery charge

    Object.values(cart).forEach(item => {
        // Fetch product details from the server or local data
        // Here, we're assuming you have product details available
        fetch(`/api/products/${item.id}`)
            .then(response => response.json())
            .then(product => {
                const price = parseFloat(product.productPrice);
                const total = price * item.quantity;

                subtotal += total;

                const row = document.createElement('tr');
                row.classList.add('text-center');
                row.innerHTML = `
                    <td class="product-remove"><a href="#"><span class="ion-ios-close"></span></a></td>
                    <td class="image-prod"><div class="img" style="background-image:url(${product.productImage});"></div></td>
                    <td class="product-name">
                        <h3>${product.productName}</h3>
                        <p>${product.productDescription}</p>
                    </td>
                    <td class="price">$${price.toFixed(2)}</td>
                    <td class="quantity">
                        <div class="input-group mb-3">
                            <input type="text" name="quantity" class="quantity form-control input-number" value="${item.quantity}" min="1" max="100">
                        </div>
                    </td>
                    <td class="total">$${total.toFixed(2)}</td>
                `;
                cartTableBody.appendChild(row);
            });
    });

    // const discount = 3.00; // Assuming a fixed discount for simplicity
    const total = subtotal;

    document.querySelector('.cart-total .d-flex:nth-child(1) span:last-child').textContent = `$${subtotal.toFixed(2)}`;
    document.querySelector('.cart-total .d-flex:nth-child(2) span:last-child').textContent = `$${delivery.toFixed(2)}`;
    document.querySelector('.cart-total .d-flex:nth-child(3) span:last-child').textContent = `$${discount.toFixed(2)}`;
    document.querySelector('.cart-total .total-price span:last-child').textContent = `$${total.toFixed(2)}`;
});
