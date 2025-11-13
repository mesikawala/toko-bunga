export const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div>
          <span className="brand-initial">F</span>
          <span className="brand-name">Fleurélle</span>
          <p>Atelier buket pastel Jakarta dengan layanan same-day delivery.</p>
        </div>

        <div>
          <h5>Kontak</h5>
          <ul>
            <li>
              <a href="mailto:hello@fleurelle.id">hello@fleurelle.id</a>
            </li>
            <li>
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp: +62 812-3456-7890
              </a>
            </li>
            <li>@fleurelle.flowers</li>
          </ul>
        </div>

        <div>
          <h5>Jam Operasional</h5>
          <p>Senin - Minggu · 09.00 — 20.00 WIB</p>
          <p>Same-day delivery tersedia hingga pukul 15.00 WIB</p>
        </div>
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} Fleurélle Atelier. All rights reserved.
        </span>
      </div>
    </footer>
  );
};
