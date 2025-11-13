import { useEffect, useMemo, useRef, useState } from "react";
import { FEATURED_OCCASIONS } from "../data/content";
import type { FlowerProduct } from "../data/content";

type PreviewProductsProps = {
  products: FlowerProduct[];
  onSelectOccasion: (
    occasion: (typeof FEATURED_OCCASIONS)[number]["id"]
  ) => void;
};

export const PreviewProducts = ({
  products,
  onSelectOccasion,
}: PreviewProductsProps) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const highlightProducts = useMemo(() => products.slice(0, 8), [products]);

  useEffect(() => {
    const element = sliderRef.current;
    if (!element) return;

    const updateScrollState = () => {
      const { scrollLeft, scrollWidth, clientWidth } = element;
      setCanScrollPrev(scrollLeft > 0);
      setCanScrollNext(scrollLeft + clientWidth < scrollWidth - 1);
    };

    updateScrollState();
    element.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      element.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  const handleScroll = (direction: "prev" | "next") => {
    const element = sliderRef.current;
    if (!element) return;
    const card = element.querySelector<HTMLDivElement>(".product-card");
    const scrollAmount = card
      ? card.offsetWidth + 24
      : element.clientWidth * 0.8;
    element.scrollBy({
      left: direction === "next" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="preview-section">
      <div className="section-heading">
        <span className="eyebrow">Signature Bouquet</span>
        <h2>Koleksi yang selalu jadi favorit pelanggan kami</h2>
        <p>
          Dipilih satu per satu, bunga kami dikurasi dari petani lokal dan
          import grade A. Setiap buket dirangkai saat ada pesanan agar tetap
          segar.
        </p>
      </div>

      <div className="preview-slider">
        <button
          className="slider-button slider-button--prev"
          onClick={() => handleScroll("prev")}
          disabled={!canScrollPrev}
          aria-label="Lihat buket sebelumnya"
        >
          ‹
        </button>

        <div className="preview-track" ref={sliderRef}>
          {highlightProducts.map((product) => (
            <article key={product.id} className="product-card">
              <figure className="product-image">
                <img src={product.image} alt={product.name} loading="lazy" />
              </figure>
              <div className="product-content">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <div className="product-meta">
                  <span className="product-price">
                    Rp{" "}
                    {product.price.toLocaleString("id-ID", {
                      maximumFractionDigits: 0,
                    })}
                  </span>
                  <span className="product-size">{product.size}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <button
          className="slider-button slider-button--next"
          onClick={() => handleScroll("next")}
          disabled={!canScrollNext}
          aria-label="Lihat buket berikutnya"
        >
          ›
        </button>
      </div>

      <div className="occasion-strip">
        {FEATURED_OCCASIONS.map((occasion) => (
          <button
            key={occasion.id}
            className="occasion-card"
            onClick={() => onSelectOccasion(occasion.id)}
          >
            <span className="occasion-eyebrow">{occasion.id}</span>
            <h4>{occasion.title}</h4>
            <p>{occasion.blurb}</p>
          </button>
        ))}
      </div>
    </section>
  );
};
