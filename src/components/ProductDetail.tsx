import type { FlowerProduct } from "../data/content";
import { PRODUCT_CATEGORIES } from "../data/content";

type ProductDetailProps = {
  product: FlowerProduct;
  onAddToCart: (product: FlowerProduct) => void;
  onBack: () => void;
};

export const ProductDetail = ({
  product,
  onAddToCart,
  onBack,
}: ProductDetailProps) => {
  const categoryLabel =
    PRODUCT_CATEGORIES.find((cat) => cat.id === product.category)?.label ||
    product.category;

  return (
    <section className="product-detail-page">
      <button className="back-button" onClick={onBack}>
        ← Kembali ke Koleksi
      </button>

      <div className="product-detail-layout">
        <div className="product-detail-image">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="product-detail-info">
          <div className="product-detail-header">
            <span className="product-detail-category">{categoryLabel}</span>
            <h1>{product.name}</h1>
            <p className="product-detail-description">{product.description}</p>
          </div>

          <div className="product-detail-specs">
            <div className="spec-item">
              <span className="spec-label">Ukuran</span>
              <span className="spec-value">{product.size}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Occasion</span>
              <span className="spec-value">{product.occasion}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Kategori</span>
              <span className="spec-value">{categoryLabel}</span>
            </div>
          </div>

          <div className="product-detail-palette">
            <span className="palette-label">Palet Warna</span>
            <div className="palette-chips-large">
              {product.colorPalette.map((color) => (
                <span
                  key={color}
                  className="palette-chip-large"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          <div className="product-detail-footer">
            <div className="product-detail-price">
              <span className="price-label">Harga</span>
              <span className="price-value">
                Rp {product.price.toLocaleString("id-ID", { maximumFractionDigits: 0 })}
              </span>
            </div>
            <button
              className="btn btn-primary btn-large"
              onClick={() => onAddToCart(product)}
            >
              Tambah ke Keranjang
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

