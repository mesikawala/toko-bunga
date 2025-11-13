import { NAV_ITEMS } from "../data/content";

type ViewId = (typeof NAV_ITEMS)[number]["id"];

type HeaderProps = {
  activeView: ViewId;
  totalItems: number;
  navItems: typeof NAV_ITEMS;
  onNavigate: (view: ViewId) => void;
  isAdmin: boolean;
  onLoginClick: () => void;
  onLogout: () => void;
  isLoading: boolean;
};

export const Header = ({
  activeView,
  totalItems,
  navItems,
  onNavigate,
  isAdmin,
  onLoginClick,
  onLogout,
  isLoading,
}: HeaderProps) => {
  return (
    <header className="site-header">
      <div className="header-inner">
        <button className="brand-mark" onClick={() => onNavigate("home")}>
          <span className="brand-initial">F</span>
          <span className="brand-name">Fleurélle</span>
        </button>

        <nav className="main-nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-link ${
                activeView === item.id ? "nav-link--active" : ""
              }`}
              onClick={() => onNavigate(item.id)}
            >
              {item.label}
              {item.id === "cart" && totalItems > 0 && (
                <span className="nav-cart-count">{totalItems}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="header-actions">
          <a
            className="contact-pill"
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noreferrer"
          >
            Konsultasi Gratis
          </a>
          {isAdmin ? (
            <button
              className="auth-pill auth-pill--logout"
              onClick={onLogout}
              disabled={isLoading}
            >
              Keluar Admin
            </button>
          ) : (
            <button
              className="auth-pill"
              onClick={onLoginClick}
              disabled={isLoading}
            >
              Login Admin
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
