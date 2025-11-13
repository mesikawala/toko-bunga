type LocationSectionProps = {
  compact?: boolean;
};

export const LocationSection = ({ compact = false }: LocationSectionProps) => {
  return (
    <section
      className={`location-section ${
        compact ? "location-section--compact" : ""
      }`}
    >
      <div className="section-heading">
        <span className="eyebrow">Toko Kami</span>
        <h2>Kunjungi studio bunga kami di Jakarta Selatan</h2>
        <p>
          Gedung Petals, Jl. Wijaya IX No. 12, Kebayoran Baru, Jakarta Selatan
          <br />
          Buka setiap hari pukul 09.00 – 20.00 WIB
        </p>
        <p className="location-invite">
          Yuk kunjungi studio kami dan nikmati wangi bunga segar langsung dari
          tangan florist kami.
        </p>
      </div>

      <div className="map-wrapper">
        <iframe
          title="Lokasi Fleurélle Jakarta"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.2043561889026!2d106.79988257504309!3d-6.236027793751147!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f17063f67519%3A0x2582b2043614d6f1!2sJl.%20Wijaya%20IX%20No.12%2C%20RT.4%2FRW.6%2C%20Pulo%2C%20Kec.%20Kby.%20Baru%2C%20Kota%20Jakarta%20Selatan%2C%20Daerah%20Khusus%20Ibukota%20Jakarta%2012120!5e0!3m2!1sen!2sid!4v1731493200000!5m2!1sen!2sid"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
};
