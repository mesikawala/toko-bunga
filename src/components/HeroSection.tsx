type HeroSectionProps = {
  onExplore: () => void;
};

export const HeroSection = ({ onExplore }: HeroSectionProps) => {
  return (
    <section className="hero-section">
      <div className="hero-copy">
        <span className="eyebrow">Jakarta · Flower Atelier</span>
        <h1>
          Buket bunga pastel
          <br />
          untuk setiap cerita hangatmu
        </h1>
        <p>
          Fleurélle merangkai bunga dengan komposisi elegan, palet warna lembut,
          dan sentuhan personal untuk momen paling berkesan. Pesan instan atau
          kreasi custom bersama florist kami.
        </p>
        <div className="hero-actions">
          <button className="btn btn-primary" onClick={onExplore}>
            Lihat Koleksi
          </button>
          <a
            className="btn btn-secondary"
            href="#custom-form"
            onClick={(event) => {
              event.preventDefault();
              document
                .getElementById("custom-form")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Konsultasi Custom
          </a>
        </div>
      </div>

      <div className="hero-visual">
        <div className="hero-card hero-card--front">
          <h3>Palet Pavorit</h3>
          <div className="palette-chips">
            <span style={{ background: "#f7d4dc" }} />
            <span style={{ background: "#fde9ef" }} />
            <span style={{ background: "#e5f3eb" }} />
            <span style={{ background: "#ffffff" }} />
          </div>
          <p>Buket pastel dengan tekstur airy, siap menghangatkan hati.</p>
        </div>
        <div className="hero-card hero-card--back">
          <span className="stat-value">2.500+</span>
          <span className="stat-label">Buket terkirim di Jabodetabek</span>
        </div>
      </div>
    </section>
  );
};
