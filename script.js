$(document).ready(function () {
    const productGrid = $("#productGrid");
    const searchInput = $("#searchInput");
    const searchButton = $("#searchButton");
    let allProducts = [];

    function displayProducts(products) {
        productGrid.empty(); 

        if (products.length > 0) {
            products.forEach(product => {
                const productCard = `
                    <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                        <div class="product-card card h-100">
                            <img src="${product.image}" class="card-img-top" alt="${product.title}">
                            <div class="card-body">
                                <h5 class="card-title">${product.title}</h5>
                                <p class="card-text text-primary">$${product.price}</p>
                                <p class="card-text">${product.description.substring(0, 100)}...</p>
                                <button class="btn btn-primary">View More</button>
                            </div>
                        </div>
                    </div>
                `;
                productGrid.append(productCard);
            });
        } else {
            productGrid.append('<p class="text-center">No products found.</p>');
        }
    }

    function fetchProducts() {
        const apiURL = "https://fakestoreapi.com/products";

        $.get(apiURL, function (data) {
            allProducts = data;
            displayProducts(allProducts); 
        });
    }

    searchButton.click(function () {
        const query = searchInput.val().toLowerCase();
        const filteredProducts = allProducts.filter(product =>
            product.title.toLowerCase().includes(query)
        );
        displayProducts(filteredProducts);
    });

    fetchProducts();
});
