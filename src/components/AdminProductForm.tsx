import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import type { FlowerProduct } from "../data/content";

type AdminProductFormProps = {
  onAddProduct: (product: Omit<FlowerProduct, "id">) => void;
  onClearFilter: () => void;
  selectedOccasion: FlowerProduct["occasion"] | null;
};

type ProductDraft = {
  name: string;
  price: string;
  description: string;
  image: string;
  size: FlowerProduct["size"];
  occasion: FlowerProduct["occasion"];
  colors: string;
};

const INITIAL_DRAFT: ProductDraft = {
  name: "",
  price: "",
  description: "",
  image: "",
  size: "Classic",
  occasion: "Everyday",
  colors: "#f9c7cf, #fff4f6, #dbeee2",
};

export const AdminProductForm = ({
  onAddProduct,
  onClearFilter,
  selectedOccasion,
}: AdminProductFormProps) => {
  const [draft, setDraft] = useState<ProductDraft>(INITIAL_DRAFT);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange =
    (field: keyof ProductDraft) =>
    (
      event: ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      setDraft((prev) => ({ ...prev, [field]: event.target.value }));
      setError(null);
    };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const priceValue = Number(draft.price.replace(/[^\d]/g, ""));

    if (
      !draft.name.trim() ||
      !draft.description.trim() ||
      !draft.image.trim()
    ) {
      setError("Pastikan semua field terisi.");
      return;
    }

    if (!priceValue || priceValue <= 0) {
      setError("Masukkan harga yang valid.");
      return;
    }

    const colorPalette = draft.colors
      .split(",")
      .map((color) => color.trim())
      .filter(Boolean)
      .map((color) => (color.startsWith("#") ? color : `#${color}`));

    onAddProduct({
      name: draft.name.trim(),
      description: draft.description.trim(),
      image: draft.image.trim(),
      price: priceValue,
      size: draft.size,
      occasion: draft.occasion,
      colorPalette:
        colorPalette.length > 0
          ? colorPalette
          : ["#f9dce4", "#fdeff2", "#dbeee1"],
    });

    setSuccess(true);
    setDraft((prev) => ({ ...INITIAL_DRAFT, occasion: prev.occasion }));
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <section className="admin-panel">
      <header className="admin-panel__header">
        <div>
          <span className="eyebrow">Admin Area</span>
          <h3>Tambah Produk Baru</h3>
        </div>
        {selectedOccasion && (
          <button className="link" onClick={onClearFilter}>
            Hapus filter occasion
          </button>
        )}
      </header>

      <form className="admin-form" onSubmit={handleSubmit}>
        <div className="admin-form__grid">
          <label className="form-field">
            <span>Nama Produk</span>
            <input
              type="text"
              value={draft.name}
              onChange={handleChange("name")}
              placeholder="Contoh: Blush Harmony"
              required
            />
          </label>
          <label className="form-field">
            <span>Harga (dalam rupiah)</span>
            <input
              type="text"
              value={draft.price}
              onChange={handleChange("price")}
              placeholder="650000"
              required
            />
          </label>
          <label className="form-field">
            <span>URL Foto Buket</span>
            <input
              type="url"
              value={draft.image}
              onChange={handleChange("image")}
              placeholder="https://..."
              required
            />
          </label>
          <label className="form-field form-field--textarea">
            <span>Deskripsi Singkat</span>
            <textarea
              value={draft.description}
              onChange={handleChange("description")}
              placeholder="Tulis karakter buket, jenis bunga, dan momen yang cocok."
              rows={3}
              required
            />
          </label>
          <label className="form-field">
            <span>Ukuran</span>
            <select value={draft.size} onChange={handleChange("size")}>
              <option value="Petite">Petite</option>
              <option value="Classic">Classic</option>
              <option value="Grand">Grand</option>
            </select>
          </label>
          <label className="form-field">
            <span>Occasion</span>
            <select value={draft.occasion} onChange={handleChange("occasion")}>
              <option value="Everyday">Everyday</option>
              <option value="Romantic">Romantic</option>
              <option value="Celebration">Celebration</option>
              <option value="Sympathy">Sympathy</option>
            </select>
          </label>
          <label className="form-field form-field--textarea">
            <span>Palet Warna (pisahkan dengan koma)</span>
            <textarea
              value={draft.colors}
              onChange={handleChange("colors")}
              placeholder="#f9dce4, #fdeff2, #dbeee1"
              rows={2}
            />
          </label>
        </div>

        {error && <p className="form-error">{error}</p>}
        {success && (
          <p className="form-success">Produk berhasil ditambahkan!</p>
        )}

        <div className="admin-form__actions">
          <button type="submit" className="btn btn-primary">
            Simpan Produk
          </button>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => {
              setDraft(INITIAL_DRAFT);
              setError(null);
            }}
          >
            Reset Form
          </button>
        </div>
      </form>
    </section>
  );
};
