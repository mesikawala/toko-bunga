import type { FlowerProduct } from "../data/content";
import { PRODUCT_CATEGORIES } from "../data/content";
import { ScrollAnimate } from "./ScrollAnimate";

type ProductGridProps = {
  products: FlowerProduct[];
  onAddToCart: (product: FlowerProduct) => void;
  selectedOccasion: FlowerProduct["occasion"] | null;
  selectedCategory: FlowerProduct["category"] | null;
  onSelectCategory: (category: FlowerProduct["category"] | null) => void;
  onProductClick: (product: FlowerProduct) => void;
  isAdmin?: boolean;
  onEditProduct?: (product: FlowerProduct) => void;
};

export const ProductGrid = ({
  products,
  onAddToCart,
  selectedOccasion,
  selectedCategory,
  onSelectCategory,
  onProductClick,
  isAdmin,
  onEditProduct,
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
      <ScrollAnimate animation="fadeInUp" delay={0}>
        <div className="section-heading">
          <span className="eyebrow">Signature Collection</span>
          <h2>Pilih buket pastel terbaik untuk menemani momenmu</h2>
          <p>
            Setiap buket dibuat berdasarkan pesanan dan dapat disesuaikan dengan
            preferensi warna, ukuran, maupun sentuhan dekoratif tambahan.
          </p>
        </div>
      </ScrollAnimate>

      <ScrollAnimate animation="fadeIn" delay={200}>
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
      </ScrollAnimate>

      <div className="product-grid">
        {filteredProducts.map((product, index) => {
          const animation =
            index % 4 === 0
              ? "fadeInLeft"
              : index % 4 === 1
              ? "fadeInRight"
              : index % 4 === 2
              ? "fadeInUp"
              : "fadeIn";
          return (
            <ScrollAnimate
              key={product.id}
              animation={animation}
              delay={100 * (index % 4)}
            >
              <article
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
                <div className="product-footer-actions">
                  {isAdmin && onEditProduct && (
                    <button
                      className="btn btn-ghost btn-small"
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditProduct(product);
                      }}
                      title="Edit Produk"
                    >
                      ✏️ Edit
                    </button>
                  )}
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
            </div>
              </article>
            </ScrollAnimate>
          );
        })}
      </div>
    </section>
  );
};
