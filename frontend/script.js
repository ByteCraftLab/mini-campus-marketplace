const products = Array.isArray(allProducts) ? allProducts : [
  {
    id: 1,
    title: "iPhone 13 Pro Max",
    price: 5400,
    category: "Electronics",
    seller: "Kwame A. (Legon)",
    image: "https://images.unsplash.com/photo-1671604964191-8f1c2d6aaf05?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: 2,
    title: "Samsung Galaxy S23 Ultra",
    price: 6100,
    category: "Electronics",
    seller: "Ama B. (KNUST)",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: 3,
    title: "MacBook Air M2",
    price: 9800,
    category: "Electronics",
    seller: "Naa Y. (UCC)",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: 4,
    title: "Dell XPS 13 Laptop",
    price: 7600,
    category: "Electronics",
    seller: "Kojo T. (UG)",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&auto=format&fit=crop&q=60"
  }
];

let selectedCategory = "All";
let searchTerm = "";

const FALLBACK_PRODUCT_IMAGE = "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80";

const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const categoryContainer = document.getElementById("categoryContainer");
const itemCount = document.getElementById("itemCount");
const menuToggleBtn = document.getElementById("menuToggleBtn");
const mobileMenu = document.getElementById("mobileMenu");

function formatGhc(amount) {
  return `₵${Number(amount).toLocaleString('en-GH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function createProductCard(product) {
  const card = document.createElement('article');
  card.className = 'product-card';

  card.innerHTML = `
    <div class="card-image-wrapper">
      <img src="${product.image}" alt="${product.title}" loading="lazy" onerror="this.onerror=null;this.src='${FALLBACK_PRODUCT_IMAGE}'" />
      <span class="badge-category">${product.category}</span>
    </div>
    <div class="card-content">
      <h3 class="card-title" title="${product.title}">${product.title}</h3>
      <div class="card-seller">Seller: <strong>${product.seller}</strong></div>
      <div class="card-price">${formatGhc(product.price)}</div>
      <div class="card-actions">
        <a href="product.html?id=${product.id}" class="btn btn-view">View</a>
        <button class="btn btn-cart" data-action="cart">Add to Cart</button>
      </div>
    </div>
  `;

  card.querySelector('[data-action="cart"]').addEventListener('click', () => {
    alert(`Added "${product.title}" to cart!`);
  });

  return card;
}

function renderProducts() {
  const filtered = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  itemCount.textContent = `${filtered.length} items found`;
  productGrid.innerHTML = "";

  if (filtered.length === 0) {
    productGrid.innerHTML = `
      <div class="no-results" style="grid-column: 1 / -1;">
        No products match your search.
      </div>`;
    return;
  }

  filtered.forEach(product => {
    const card = createProductCard(product);
    productGrid.appendChild(card);
  });
}

searchInput.addEventListener("input", (e) => {
  searchTerm = e.target.value;
  renderProducts();
});

categoryContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("category-btn")) {
    document.querySelectorAll(".category-btn").forEach(btn => btn.classList.remove("active"));
    e.target.classList.add("active");
    selectedCategory = e.target.getAttribute("data-category");
    renderProducts();
  }
});

menuToggleBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("open");
});

renderProducts();
