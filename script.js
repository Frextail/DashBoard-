document.addEventListener('DOMContentLoaded', () => {
    // Función para cargar y mostrar los productos desde data.json
    async function loadProducts() {
        try {
            const response = await fetch('data.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            const products = data.transactions; // Usamos los datos de "transactions" como si fueran productos
            const productGrid = document.querySelector('.product-grid');

            // Limpiamos el contenedor por si acaso
            productGrid.innerHTML = '';

            // Creamos una tarjeta de producto por cada elemento en el JSON
            products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';

                // Formateamos el monto como un precio en dólares
                const price = `$${product.amount.toFixed(2)}`;

                productCard.innerHTML = `
                    <div class="product-image">
                        <span>Imagen del Producto</span>
                    </div>
                    <div class="product-info">
                        <h3>${product.product}</h3>
                        <p class="price">${price}</p>
                        <button class="add-to-cart-btn">Añadir al Carrito</button>
                    </div>
                `;

                productGrid.appendChild(productCard);
            });

        } catch (error) {
            console.error("No se pudieron cargar los productos:", error);
            const productGrid = document.querySelector('.product-grid');
            productGrid.innerHTML = '<p>Lo sentimos, no pudimos cargar nuestros productos en este momento.</p>';
        }
    }

    // Llamamos a la función para que se ejecute al cargar la página
    loadProducts();
});

