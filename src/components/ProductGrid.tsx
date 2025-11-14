import type { FlowerProduct } from "../data/content";
import { PRODUCT_CATEGORIES } from "../data/content";

type ProductGridProps = {
  products: FlowerProduct[];
  onAddToCart: (product: FlowerProduct) => void;
  selectedOccasion: FlowerProduct["occasion"] | null;
  selectedCategory: FlowerProduct["category"] | null;
  onSelectCategory: (category: FlowerProduct["category"] | null) => void;
  onProductClick: (product: FlowerProduct) => void;
};

export const ProductGrid = ({
  products,
  onAddToCart,
  selectedOccasion,
  selectedCategory,
  onSelectCategory,
  onProductClick,
}: ProductGridProps) => {
  let filteredProducts = products;

  if (selectedCategory) {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === selectedCategory
    );
  }

  if (selectedOccasion) {
    filteredProducts = filteredProducts.filter(
      (product) => product.occasion === selectedOccasion
    );
  }

  return (
    <section className="products-page">
      <div className="section-heading">
        <span className="eyebrow">Signature Collection</span>
        <h2>Pilih buket pastel terbaik untuk menemani momenmu</h2>
        <p>
          Setiap buket dibuat berdasarkan pesanan dan dapat disesuaikan dengan
          preferensi warna, ukuran, maupun sentuhan dekoratif tambahan.
        </p>
      </div>

      <div className="category-filters">
        <button
          className={`category-filter-btn ${
            selectedCategory === null ? "category-filter-btn--active" : ""
          }`}
          onClick={() => onSelectCategory(null)}
        >
          Semua Kategori
        </button>
        {PRODUCT_CATEGORIES.map((category) => (
          <button
            key={category.id}
            className={`category-filter-btn ${
              selectedCategory === category.id
                ? "category-filter-btn--active"
                : ""
            }`}
            onClick={() => onSelectCategory(category.id)}
          >
            {category.label}
          </button>
        ))}
      </div>

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <article
            key={product.id}
            className="product-card product-card--detailed product-card--clickable"
            onClick={() => onProductClick(product)}
          >
            <figure className="product-image">
              <img src={product.image} alt={product.name} loading="lazy" />
            </figure>
            <div className="product-content">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <div className="product-tags">
                <span>{product.size}</span>
                <span>{product.occasion}</span>
              </div>
              <div className="product-palette">
                {product.colorPalette.map((color) => (
                  <span key={color} style={{ backgroundColor: color }} />
                ))}
              </div>
              <div className="product-footer">
                <span className="product-price">
                  Rp{" "}
                  {product.price.toLocaleString("id-ID", {
                    maximumFractionDigits: 0,
                  })}
                </span>
                <button
                  className="btn btn-primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(product);
                  }}
                >
                  Tambah ke Keranjang
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
