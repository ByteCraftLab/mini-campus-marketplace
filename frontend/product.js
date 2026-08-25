const $ = (selector) => document.querySelector(selector);
const FALLBACK_PRODUCT_IMAGE = "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80";

const ProductDetailApp = (() => {
  const container = $('#productDetailWrapper');

  function getProductIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('id'));
  }

  function findProduct(id) {
    return allProducts.find(p => p.id === id);
  }

  function renderError(message) {
    container.innerHTML = `
      <div style="max-width: 600px; margin: 4rem auto; text-align: center; padding: 2rem; background: #fff; border-radius: 1rem; border: 1px solid #e5e7eb;">
        <h1 style="font-size: 4rem; color: #d1d5db; margin-bottom: 1rem;">!</h1>
        <h2 style="color: #111827; margin-bottom: 0.5rem;">Product Not Found</h2>
        <p style="color: #6b7280; margin-bottom: 1.5rem;">${message}</p>
        <a href="browse.html" class="btn btn-cart" style="display: inline-block; text-decoration: none;">Back to Browse</a>
      </div>
    `;
    document.title = "Error - CampusTrade";
  }

  function formatGhc(amount) {
    return `₵${Number(amount).toLocaleString('en-GH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  function renderRelatedProducts(currentProduct) {
    const related = allProducts
      .filter(item => item.id !== currentProduct.id)
      .slice(0, 4);

    return `
      <section class="related-products" style="margin-top: 3rem;">
        <h2 style="font-size: 1.5rem; margin-bottom: 1rem; color: #111827;">You may also like these</h2>
        <div class="related-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.25rem;">
          ${related.map(item => `
            <a href="product.html?id=${item.id}" style="text-decoration: none; color: inherit; display: block; background: #fff; border: 1px solid #e5e7eb; border-radius: 1rem; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
              <img src="${item.image}" alt="${item.title}" onerror="this.onerror=null;this.src='${FALLBACK_PRODUCT_IMAGE}'" style="width: 100%; height: 180px; object-fit: cover; display: block;">
              <div style="padding: 0.9rem;">
                <div style="font-size: 0.8rem; color: #4f46e5; font-weight: 700; margin-bottom: 0.35rem;">${item.category}</div>
                <div style="font-weight: 700; margin-bottom: 0.3rem; color: #111827;">${item.title}</div>
                <div style="color: #4f46e5; font-weight: 700;">${formatGhc(item.price)}</div>
              </div>
            </a>
          `).join('')}
        </div>
      </section>
    `;
  }

  function renderProduct(product) {
    document.title = `${product.title} - CampusTrade`;

    container.innerHTML = `
      <div class="detail-container">
        <div class="detail-image-panel">
          <img src="${product.image}" alt="${product.title}" onerror="this.onerror=null;this.src='${FALLBACK_PRODUCT_IMAGE}'">
        </div>

        <div class="detail-info-panel">
          <div class="info-header">
            <div class="info-category">${product.category}</div>
            <h1 class="info-title">${product.title}</h1>
            <div class="info-meta">
              Posted by <strong>${product.seller}</strong> on ${product.datePosted}
            </div>
          </div>

          <div class="info-price">${formatGhc(product.price)}</div>

          <div class="info-description">
            <h3>Description</h3>
            <p>${product.description}</p>
            <p style="margin-top: 1rem; font-size: 0.875rem; color: #6b7280;">
              <strong>Condition:</strong> ${product.condition}
            </p>
          </div>

          <button class="btn btn-cart detail-action-btn" id="addToCartDetailBtn">
            Add to Cart
          </button>
        </div>
      </div>
      ${renderRelatedProducts(product)}
    `;

    $('#addToCartDetailBtn').addEventListener('click', () => {
      alert(`Added "${product.title}" to your cart!`);
    });
  }

  function init() {
    const id = getProductIdFromUrl();

    if (!id || isNaN(id)) {
      renderError("No valid product ID provided in the URL.");
      return;
    }

    const product = findProduct(id);

    if (product) {
      renderProduct(product);
    } else {
      renderError(`Could not find a product matching ID: ${id}`);
    }
  }

  return { init };
})();

document.addEventListener('DOMContentLoaded', ProductDetailApp.init);
