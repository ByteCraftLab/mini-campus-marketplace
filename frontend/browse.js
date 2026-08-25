const products = Array.isArray(allProducts) ? allProducts : [
  {
    id: 1,
    title: "iPhone 13 Pro Max",
    price: 5400.00,
    category: "Electronics",
    seller: "Kwame A. (Legon)",
    image: "https://images.unsplash.com/photo-1671604964191-8f1c2d6aaf05?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: 2,
    title: "Samsung Galaxy S23 Ultra",
    price: 6100.00,
    category: "Electronics",
    seller: "Ama B. (KNUST)",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: 3,
    title: "MacBook Air M2",
    price: 9800.00,
    category: "Electronics",
    seller: "Naa Y. (UCC)",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: 4,
    title: "Dell XPS 13 Laptop",
    price: 7600.00,
    category: "Electronics",
    seller: "Kojo T. (UG)",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: 5,
    title: "AirPods Pro 2",
    price: 2200.00,
    category: "Electronics",
    seller: "Efua M. (Legon)",
    image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: 6,
    title: "Sony WH-1000XM5",
    price: 3300.00,
    category: "Electronics",
    seller: "Seidu K. (KNUST)",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&auto=format&fit=crop&q=60"
  }
];

let browseSearchTerm = "";
let browseSelectedCategory = "All";

const FALLBACK_PRODUCT_IMAGE = "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80";

const browseGrid = document.getElementById("browseProductGrid");
const browseSearch = document.getElementById("browseSearchInput");
const categoryFilter = document.getElementById("categoryFilterContainer");
const browseItemCount = document.getElementById("browseItemCount");

function formatGhc(amount) {
  return `₵${Number(amount).toLocaleString('en-GH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function buildProductCard(product) {
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
        <a href="product.html?id=${product.id}" class="btn btn-view" data-action="view">View</a>
        <button class="btn btn-cart" data-action="cart">Add to Cart</button>
      </div>
    </div>
  `;

  card.querySelector('[data-action="cart"]').addEventListener('click', () => {
    alert(`Added "${product.title}" to cart!`);
  });

  return card;
}

function renderBrowsePage() {
  browseGrid.innerHTML = "";

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(browseSearchTerm.toLowerCase());
    const matchesCategory = browseSelectedCategory === "All" || product.category === browseSelectedCategory;
    return matchesSearch && matchesCategory;
  });

  browseItemCount.textContent = `${filteredProducts.length} items found`;

  if (filteredProducts.length === 0) {
    browseGrid.innerHTML = `
      <div class="no-results" style="grid-column: 1 / -1; text-align: center; padding: 3rem; background: #fff; border: 1px dashed #ccc; border-radius: 0.75rem;">
        <p style="color: #6b7280;">No products match your criteria. Try adjusting your search or filters.</p>
      </div>`;
    return;
  }

  filteredProducts.forEach(product => {
    browseGrid.appendChild(buildProductCard(product));
  });
}

browseSearch.addEventListener('input', (e) => {
  browseSearchTerm = e.target.value;
  renderBrowsePage();
});

categoryFilter.addEventListener('click', (e) => {
  if (e.target.classList.contains('filter-btn')) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    browseSelectedCategory = e.target.getAttribute('data-category');
    renderBrowsePage();
  }
});

document.addEventListener('DOMContentLoaded', renderBrowsePage);
