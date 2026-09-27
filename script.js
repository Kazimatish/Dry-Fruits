/* =========================================
   ALIPUR DRY FRUITS
   PRODUCT DATA
========================================= */

const products = [

    {
        id: 1,
        name: "Premium Almonds",
        category: "Dry Fruits",
        price: 1000,
        unit: "1 kg",
        badge: "Popular",
        desc: "Crisp, rich and naturally nutritious almonds.",
        image: "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=800&q=82"
    },

    {
        id: 2,
        name: "Kashmiri Walnuts",
        category: "Dry Fruits",
        price: 1500,
        unit: "1 kg",
        badge: "Premium",
        desc: "Fresh-tasting walnut kernels with a rich buttery bite.",
        image: "https://images.unsplash.com/photo-1605196560547-1c4a0c5d9f3f?auto=format&fit=crop&w=800&q=82"
    },

    {
        id: 3,
        name: "Afghan Dates",
        category: "Dates",
        price: 950,
        unit: "1 kg",
        badge: "Bestseller",
        desc: "Soft, naturally sweet dates for everyday snacking.",
        image: "https://images.unsplash.com/photo-1590838888238-8d0f2e7c6b3f?auto=format&fit=crop&w=800&q=82"
    },

    {
        id: 4,
        name: "Premium Pistachios",
        category: "Dry Fruits",
        price: 2350,
        unit: "1 kg",
        badge: "Premium",
        desc: "Crunchy pistachios with a delicious roasted-nut flavor.",
        image: "https://images.unsplash.com/photo-1615485737651-9c5c8e4a3d8a?auto=format&fit=crop&w=800&q=82"
    },

    {
        id: 5,
        name: "Dried Apricots",
        category: "Dried Fruits",
        price: 1650,
        unit: "1 kg",
        badge: "Fresh",
        desc: "Soft, tangy and naturally sweet dried apricots.",
        image: "https://images.unsplash.com/photo-1595231776515-ddffb1f4eb73?auto=format&fit=crop&w=800&q=82"
    },

    {
        id: 6,
        name: "Golden Raisins",
        category: "Dried Fruits",
        price: 900,
        unit: "1 kg",
        badge: "Popular",
        desc: "Naturally sweet raisins, perfect for breakfast and baking.",
        image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=800&q=82"
    },

    {
        id: 7,
        name: "Dried Mulberries",
        category: "Dried Fruits",
        price: 1250,
        unit: "1 kg",
        badge: "Natural",
        desc: "Delicate, chewy dried mulberries with a honey-like taste.",
        image: "https://images.unsplash.com/photo-1599909533606-f9bdf4b9f6e5?auto=format&fit=crop&w=800&q=82"
    },

    {
        id: 8,
        name: "Dried Cranberries",
        category: "Dried Fruits",
        price: 1350,
        unit: "1 kg",
        badge: "Popular",
        desc: "Sweet-tart dried berries for snacking and desserts.",
        image: "https://images.unsplash.com/photo-1573246123716-6b1782bfc499?auto=format&fit=crop&w=800&q=82"
    },

    {
        id: 9,
        name: "Green Cardamom",
        category: "Herbs & Spices",
        price: 2200,
        unit: "250 g",
        badge: "Aromatic",
        desc: "Fragrant green cardamom for tea, desserts and cooking.",
        image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=82"
    },

    {
        id: 10,
        name: "Fennel Seeds",
        category: "Herbs & Spices",
        price: 650,
        unit: "500 g",
        badge: "Natural",
        desc: "Fresh aromatic fennel seeds, traditionally enjoyed after meals.",
        image: "https://images.unsplash.com/photo-1603117715031-9b1f6c1f8f8b?auto=format&fit=crop&w=800&q=82"
    },

    {
        id: 11,
        name: "Flax Seeds",
        category: "Herbs & Seeds",
        price: 550,
        unit: "500 g",
        badge: "Healthy",
        desc: "Nutty seeds that work well in breakfast and baking.",
        image: "https://images.unsplash.com/photo-1612257999756-1a6a5c2f1f3b?auto=format&fit=crop&w=800&q=82"
    },

    {
        id: 12,
        name: "Dried Figs (Anjeer)",
        category: "Dried Fruits",
        price: 1950,
        unit: "1 kg",
        badge: "Premium",
        desc: "Tender, naturally sweet dried figs with a soft texture.",
        image: "https://images.unsplash.com/photo-1599909533606-f9bdf4b9f6e5?auto=format&fit=crop&w=800&q=82"
    }

];


/* =========================================
   APPLICATION STATE
========================================= */

const state = {

    category: "All",

    search: "",

    sort: "featured",

    cart: JSON.parse(
        localStorage.getItem("alipurCart") || "{}"
    )

};


/* =========================================
   SHORT SELECTOR
========================================= */

const $ = selector =>
    document.querySelector(selector);


/* =========================================
   FORMAT PRICE
========================================= */

function money(number) {

    return `Rs ${number.toLocaleString("en-PK")}`;

}


/* =========================================
   CATEGORY BUTTONS
========================================= */

function renderCategories() {

    const categories = [
        "All",
        ...new Set(
            products.map(product => product.category)
        )
    ];


    $("#categoryPills").innerHTML =
        categories.map(category => {

            return `
                <button
                    class="cat-btn ${
                        category === state.category
                            ? "active"
                            : ""
                    }"
                    data-category="${category}">

                    ${category}

                </button>
            `;

        }).join("");


    document
        .querySelectorAll(".cat-btn")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    state.category =
                        button.dataset.category;

                    renderCategories();

                    renderProducts();

                }
            );

        });

}


/* =========================================
   FILTER PRODUCTS
========================================= */

function getFilteredProducts() {

    let filtered = products.filter(product => {

        const categoryMatch =
            state.category === "All" ||
            product.category === state.category;


        const searchText =
            `${product.name}
             ${product.category}
             ${product.desc}`
            .toLowerCase();


        const searchMatch =
            searchText.includes(
                state.search.toLowerCase()
            );


        return categoryMatch && searchMatch;

    });


    /* SORT */

    if (state.sort === "low") {

        filtered.sort(
            (a,b) => a.price - b.price
        );

    }


    if (state.sort === "high") {

        filtered.sort(
            (a,b) => b.price - a.price
        );

    }


    if (state.sort === "name") {

        filtered.sort(
            (a,b) =>
                a.name.localeCompare(b.name)
        );

    }


    return filtered;

}


/* =========================================
   DISPLAY PRODUCTS
========================================= */

function renderProducts() {

    const filtered =
        getFilteredProducts();


    const grid =
        $("#productGrid");


    $("#emptyState").hidden =
        filtered.length > 0;


    grid.innerHTML =
        filtered.map(product => {

            return `

                <article class="product-card">

                    <div class="product-img">

                        <img
                            loading="lazy"
                            src="${product.image}"
                            alt="${product.name}"

                            onerror="
                                this.src='https://images.unsplash.com/photo-1608797178974-15b35a64ede9?auto=format&fit=crop&w=800&q=80'
                            "
                        >

                        <span class="badge">
                            ${product.badge}
                        </span>

                    </div>


                    <div class="product-info">

                        <span class="product-category">
                            ${product.category}
                        </span>


                        <h3 class="product-name">
                            ${product.name}
                        </h3>


                        <p class="product-desc">
                            ${product.desc}
                        </p>


                        <div class="product-bottom">

                            <div class="price">

                                ${money(product.price)}

                                <small>
                                    / ${product.unit}
                                </small>

                            </div>


                            <button
                                class="add-btn"
                                data-add="${product.id}"
                                aria-label="Add ${product.name}">

                                +

                            </button>

                        </div>

                    </div>

                </article>

            `;

        }).join("");


    document
        .querySelectorAll("[data-add]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    addToCart(
                        Number(button.dataset.add)
                    );

                }
            );

        });

}


/* =========================================
   SAVE CART
========================================= */

function saveCart() {

    localStorage.setItem(
        "alipurCart",
        JSON.stringify(state.cart)
    );

}


/* =========================================
   ADD PRODUCT
========================================= */

function addToCart(id) {

    state.cart[id] =
        (state.cart[id] || 0) + 1;


    saveCart();

    renderCart();

    openCart();

    showToast(
        "Product added to your cart"
    );

}


/* =========================================
   CHANGE QUANTITY
========================================= */

function changeQuantity(id, amount) {

    state.cart[id] =
        (state.cart[id] || 0) + amount;


    if (state.cart[id] <= 0) {

        delete state.cart[id];

    }


    saveCart();

    renderCart();

}


/* =========================================
   CART PRODUCTS
========================================= */

function getCartItems() {

    return Object
        .entries(state.cart)
        .map(([id, quantity]) => {

            return {

                product:
                    products.find(
                        product =>
                            product.id === Number(id)
                    ),

                quantity

            };

        })
        .filter(item => item.product);

}


/* =========================================
   RENDER CART
========================================= */

function renderCart() {

    const items =
        getCartItems();


    const totalQuantity =
        items.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );


    $("#cartCount").textContent =
        totalQuantity;


    if (!items.length) {

        $("#cartItems").innerHTML = `

            <div class="empty-state">

                <div>🛒</div>

                <h3>
                    Your cart is empty
                </h3>

                <p>
                    Add your favorite products
                    to start an order.
                </p>

            </div>

        `;

    } else {

        $("#cartItems").innerHTML =

            items.map(item => {

                const product =
                    item.product;

                const quantity =
                    item.quantity;


                return `

                    <div class="cart-item">

                        <img
                            src="${product.image}"
                            alt="${product.name}"
                        >


                        <div>

                            <h4>
                                ${product.name}
                            </h4>

                            <small>
                                ${money(product.price)}
                                /
                                ${product.unit}
                            </small>


                            <div class="qty">

                                <button
                                    data-qty="${product.id}"
                                    data-change="-1">

                                    −

                                </button>


                                <b>
                                    ${quantity}
                                </b>


                                <button
                                    data-qty="${product.id}"
                                    data-change="1">

                                    +

                                </button>

                            </div>

                        </div>


                        <div>

                            <b>
                                ${money(
                                    product.price *
                                    quantity
                                )}
                            </b>


                            <button
                                class="remove"
                                data-remove="${product.id}">

                                Remove

                            </button>

                        </div>

                    </div>

                `;

            }).join("");

    }


    /* QUANTITY BUTTONS */

    document
        .querySelectorAll("[data-qty]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    changeQuantity(

                        Number(
                            button.dataset.qty
                        ),

                        Number(
                            button.dataset.change
                        )

                    );

                }
            );

        });


    /* REMOVE */

    document
        .querySelectorAll("[data-remove]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    delete state.cart[
                        button.dataset.remove
                    ];

                    saveCart();

                    renderCart();

                }
            );

        });


    /* TOTAL */

    const total =
        items.reduce(
            (sum, item) =>
                sum +
                item.product.price *
                item.quantity,
            0
        );


    $("#cartTotal").textContent =
        money(total);

}


/* =========================================
   OPEN CART
========================================= */

function openCart() {

    $("#cartDrawer")
        .classList.add("open");

    $("#cartOverlay")
        .classList.add("open");

    document.body.style.overflow =
        "hidden";

}


/* =========================================
   CLOSE CART
========================================= */

function closeCart() {

    $("#cartDrawer")
        .classList.remove("open");

    $("#cartOverlay")
        .classList.remove("open");

    document.body.style.overflow =
        "";

}


/* =========================================
   WHATSAPP ORDER
========================================= */

function orderOnWhatsApp() {

    const items =
        getCartItems();


    if (!items.length) {

        showToast(
            "Your cart is empty"
        );

        return;

    }


    const orderLines =
        items.map(item => {

            return `• ${item.product.name} — ${item.quantity} x ${item.product.unit}`;

        }).join("\n");


    const total =
        items.reduce(
            (sum, item) =>
                sum +
                item.product.price *
                item.quantity,
            0
        );


    const message = `

Assalam-o-Alaikum,

I want to place an order from Alipur Dry Fruits:

${orderLines}

Estimated product total:
${money(total)}

Please confirm availability, delivery charges and final total.

Thank you.

`;


    const whatsappURL =
        `https://wa.me/923488277200?text=${encodeURIComponent(message)}`;


    window.open(
        whatsappURL,
        "_blank"
    );

}


/* =========================================
   TOAST MESSAGE
========================================= */

function showToast(message) {

    const toast =
        $("#toast");


    toast.textContent =
        message;


    toast.classList.add("show");


    setTimeout(() => {

        toast.classList.remove("show");

    }, 1800);

}


/* =========================================
   SEARCH
========================================= */

$("#searchInput")
    .addEventListener(
        "input",
        event => {

            state.search =
                event.target.value;

            renderProducts();

        }
    );


/* =========================================
   SORT
========================================= */

$("#sortSelect")
    .addEventListener(
        "change",
        event => {

            state.sort =
                event.target.value;

            renderProducts();

        }
    );


/* =========================================
   SEARCH ICON
========================================= */

$("#searchFocusBtn")
    .addEventListener(
        "click",
        () => {

            document
                .querySelector("#products")
                .scrollIntoView({
                    behavior: "smooth"
                });


            setTimeout(() => {

                $("#searchInput").focus();

            }, 400);

        }
    );


/* =========================================
   CART EVENTS
========================================= */

$("#cartBtn")
    .addEventListener(
        "click",
        openCart
    );


$("#closeCart")
    .addEventListener(
        "click",
        closeCart
    );


$("#cartOverlay")
    .addEventListener(
        "click",
        closeCart
    );


/* =========================================
   CLEAR CART
========================================= */

$("#clearCart")
    .addEventListener(
        "click",
        () => {

            state.cart = {};

            saveCart();

            renderCart();

            showToast(
                "Cart cleared"
            );

        }
    );


/* =========================================
   WHATSAPP CART
========================================= */

$("#whatsappCart")
    .addEventListener(
        "click",
        orderOnWhatsApp
    );


/* =========================================
   MOBILE MENU
========================================= */

$("#menuBtn")
    .addEventListener(
        "click",
        () => {

            $("#nav")
                .classList.toggle("open");

        }
    );


document
    .querySelectorAll(".nav a")
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                $("#nav")
                    .classList.remove("open");

            }
        );

    });


/* =========================================
   YEAR
========================================= */

$("#year").textContent =
    new Date().getFullYear();


/* =========================================
   START WEBSITE
========================================= */

renderCategories();

renderProducts();

renderCart();