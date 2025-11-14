import { useEffect, useMemo, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { ProductGrid } from "./components/ProductGrid";
import { CartView } from "./components/CartView";
import { CustomOrderForm } from "./components/CustomOrderForm";
import { ReviewsSection } from "./components/ReviewsSection";
import { LocationSection } from "./components/LocationSection";
import { Footer } from "./components/Footer";
import { PreviewProducts } from "./components/PreviewProducts";
import { LoginModal } from "./components/LoginModal";
import { AdminProductForm } from "./components/AdminProductForm";
import { ProductDetail } from "./components/ProductDetail";
import { supabase } from "./lib/supabaseClient";
import { NAV_ITEMS, PRODUCTS } from "./data/content";
import type { FlowerProduct } from "./data/content";
import type { CartItem } from "./types/cart";

type View = "home" | "products" | "cart" | "custom" | "product-detail";
type AuthCredentials = { email: string; password: string };

const App = () => {
  const [activeView, setActiveView] = useState<View>("home");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedOccasion, setSelectedOccasion] = useState<
    FlowerProduct["occasion"] | null
  >(null);
  const [selectedCategory, setSelectedCategory] = useState<
    FlowerProduct["category"] | null
  >(null);
  const [products, setProducts] = useState<FlowerProduct[]>(PRODUCTS);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<FlowerProduct | null>(
    null
  );
  const [editingProduct, setEditingProduct] = useState<FlowerProduct | null>(
    null
  );

  const totalItems = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems]
  );

  const totalPrice = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  );

  const handleAddToCart = (product: FlowerProduct) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setActiveView("cart");
  };

  const handleQuantityChange = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(1, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => setCartItems([]);

  const handleNavigate = (view: View) => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectOccasion = (occasion: FlowerProduct["occasion"]) => {
    setSelectedOccasion(occasion);
    setActiveView("products");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleProductClick = (product: FlowerProduct) => {
    setSelectedProduct(product);
    setActiveView("product-detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const evaluateAdmin = async (supabaseUser: User | null) => {
    if (!supabaseUser) {
      setIsAdmin(false);
      return false;
    }

    // Check metadata first
    const metadataRole =
      (supabaseUser.app_metadata as { role?: string })?.role ||
      (supabaseUser.user_metadata as { role?: string })?.role;

    if (metadataRole === "admin") {
      setIsAdmin(true);
      return true;
    }

    // If not in metadata, check profiles table
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("email", supabaseUser.email || "")
        .maybeSingle();

      if (error) {
        // If table not found, it might not be exposed to API
        if (
          error.code === "PGRST205" ||
          error.message?.includes("Could not find the table")
        ) {
          console.error(
            "Tabel 'profiles' tidak ditemukan di API. Pastikan:\n" +
              "1. Tabel 'profiles' sudah dibuat di Supabase\n" +
              "2. Enable 'Enable API' di Settings > API untuk tabel ini\n" +
              "3. Atau set role di app_metadata/user_metadata di Authentication > Users"
          );
        } else {
          console.warn("Error checking profiles table:", error);
        }
        setIsAdmin(false);
        return false;
      }

      const isAdminRole = data?.role === "admin";
      setIsAdmin(isAdminRole);
      return isAdminRole;
    } catch (err) {
      console.warn("Error evaluating admin:", err);
      setIsAdmin(false);
      return false;
    }
  };

  const handleLogin = async ({ email, password }: AuthCredentials) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });

    if (error) {
      await supabase.auth.signOut().catch(() => undefined);
      return { success: false, message: error.message };
    }

    const authenticatedUser = data.user;
    const isAdminRole = await evaluateAdmin(authenticatedUser);

    if (!isAdminRole) {
      await supabase.auth.signOut().catch(() => undefined);
      return {
        success: false,
        message: "Akun ini tidak memiliki akses admin.",
      };
    }

    setIsLoginOpen(false);
    return { success: true };
  };

  const handleLogout = async () => {
    await supabase.auth.signOut().catch(() => undefined);
    setIsAdmin(false);
  };

  const handleAddProduct = (product: Omit<FlowerProduct, "id">) => {
    const generateId = () =>
      `${product.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .slice(0, 30)}-${Date.now()}`;

    const newProduct: FlowerProduct = { ...product, id: generateId() };
    setProducts((prev) => [newProduct, ...prev]);
  };

  const handleUpdateProduct = (
    productId: string,
    updatedProduct: Omit<FlowerProduct, "id">
  ) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...updatedProduct, id: productId } : p
      )
    );
    setEditingProduct(null);
  };

  const handleEditProduct = (product: FlowerProduct) => {
    setEditingProduct(product);
    setActiveView("products");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
  };

  useEffect(() => {
    const syncSession = async () => {
      const { data } = await supabase.auth.getSession();
      const currentUser = data.session?.user ?? null;
      await evaluateAdmin(currentUser);
      setAuthLoading(false);
    };

    void syncSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const nextUser = session?.user ?? null;
      await evaluateAdmin(nextUser);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="app-shell">
      <Header
        activeView={activeView === "product-detail" ? "products" : activeView}
        totalItems={totalItems}
        navItems={NAV_ITEMS}
        onNavigate={handleNavigate}
        isAdmin={isAdmin}
        onLoginClick={() => setIsLoginOpen(true)}
        onLogout={handleLogout}
        isLoading={authLoading}
      />

      <main className={`view-container view-${activeView}`}>
        {activeView === "home" && (
          <div className="fade-in">
            <HeroSection onExplore={() => handleNavigate("products")} />
            <PreviewProducts
              products={products}
              onSelectOccasion={handleSelectOccasion}
            />
            <ReviewsSection />
            <LocationSection />
          </div>
        )}

        {activeView === "products" && (
          <div className="fade-in" key="products">
            {isAdmin && (
              <AdminProductForm
                onAddProduct={handleAddProduct}
                onUpdateProduct={handleUpdateProduct}
                onClearFilter={() => setSelectedOccasion(null)}
                selectedOccasion={selectedOccasion}
                editingProduct={editingProduct}
                onCancelEdit={handleCancelEdit}
              />
            )}
            <ProductGrid
              products={products}
              onAddToCart={handleAddToCart}
              selectedOccasion={selectedOccasion}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              onProductClick={handleProductClick}
              isAdmin={isAdmin}
              onEditProduct={handleEditProduct}
            />
          </div>
        )}

        {activeView === "cart" && (
          <div className="fade-in" key="cart">
            <CartView
              items={cartItems}
              totalPrice={totalPrice}
              onQuantityChange={handleQuantityChange}
              onRemoveItem={handleRemoveItem}
              onClearCart={handleClearCart}
              onBackToShop={() => handleNavigate("products")}
            />
          </div>
        )}

        {activeView === "custom" && (
          <div className="fade-in" key="custom">
            <CustomOrderForm />
            <ReviewsSection compact />
            <LocationSection compact />
          </div>
        )}

        {activeView === "product-detail" && selectedProduct && (
          <div className="fade-in" key="product-detail">
            <ProductDetail
              product={selectedProduct}
              onAddToCart={handleAddToCart}
              onBack={() => handleNavigate("products")}
            />
          </div>
        )}
      </main>

      <Footer />

      {isLoginOpen && (
        <LoginModal
          onClose={() => setIsLoginOpen(false)}
          onSubmit={handleLogin}
        />
      )}
    </div>
  );
};

export default App;
