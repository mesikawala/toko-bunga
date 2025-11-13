import type { FlowerProduct } from "../data/content";

type ProductGridProps = {
  products: FlowerProduct[];
  onAddToCart: (product: FlowerProduct) => void;
  selectedOccasion: FlowerProduct["occasion"] | null;
};

export const ProductGrid = ({
  products,
  onAddToCart,
  selectedOccasion,
}: ProductGridProps) => {
  const filteredProducts = selectedOccasion
    ? products.filter((product) => product.occasion === selectedOccasion)
    : products;

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

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <article
            key={product.id}
            className="product-card product-card--detailed"
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
                  onClick={() => onAddToCart(product)}
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
