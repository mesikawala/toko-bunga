import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import type { FlowerProduct } from "../data/content";
import { PRODUCT_CATEGORIES } from "../data/content";
import { supabase } from "../lib/supabaseClient";

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
  category: FlowerProduct["category"];
  colors: string;
};

const INITIAL_DRAFT: ProductDraft = {
  name: "",
  price: "",
  description: "",
  image: "",
  size: "Classic",
  occasion: "Everyday",
  category: "buket-bunga",
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
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

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

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("File harus berupa gambar.");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Ukuran file maksimal 5MB.");
      return;
    }

    setImageFile(file);
    setError(null);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(7)}.${fileExt}`;
    const filePath = `products/${fileName}`;

    const { error: uploadError, data } = await supabase.storage
      .from("product-images")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      throw new Error(`Upload gagal: ${uploadError.message}`);
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("product-images").getPublicUrl(filePath);

    return publicUrl;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setUploading(true);

    try {
      const priceValue = Number(draft.price.replace(/[^\d]/g, ""));

      if (!draft.name.trim() || !draft.description.trim()) {
        setError("Pastikan nama dan deskripsi terisi.");
        setUploading(false);
        return;
      }

      if (!imageFile && !draft.image.trim()) {
        setError("Pilih gambar atau masukkan URL gambar.");
        setUploading(false);
        return;
      }

      if (!priceValue || priceValue <= 0) {
        setError("Masukkan harga yang valid.");
        setUploading(false);
        return;
      }

      // Upload image if file is selected
      let imageUrl = draft.image.trim();
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      const colorPalette = draft.colors
        .split(",")
        .map((color) => color.trim())
        .filter(Boolean)
        .map((color) => (color.startsWith("#") ? color : `#${color}`));

      onAddProduct({
        name: draft.name.trim(),
        description: draft.description.trim(),
        image: imageUrl,
        price: priceValue,
        size: draft.size,
        occasion: draft.occasion,
        category: draft.category,
        colorPalette:
          colorPalette.length > 0
            ? colorPalette
            : ["#f9dce4", "#fdeff2", "#dbeee1"],
      });

      setSuccess(true);
      setDraft((prev) => ({
        ...INITIAL_DRAFT,
        occasion: prev.occasion,
        category: prev.category,
      }));
      setImageFile(null);
      setImagePreview(null);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Terjadi kesalahan saat upload."
      );
    } finally {
      setUploading(false);
    }
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
          <label className="form-field form-field--file">
            <span>Foto Produk</span>
            <div className="file-upload-wrapper">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="file-input"
                id="product-image-upload"
              />
              <label
                htmlFor="product-image-upload"
                className="file-upload-label"
              >
                {imageFile ? "Ganti Foto" : "Pilih Foto dari Komputer"}
              </label>
              {imageFile && <span className="file-name">{imageFile.name}</span>}
            </div>
            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview} alt="Preview" />
                <button
                  type="button"
                  className="remove-preview"
                  onClick={() => {
                    setImageFile(null);
                    setImagePreview(null);
                  }}
                >
                  ×
                </button>
              </div>
            )}
            <div className="file-upload-divider">
              <span>atau</span>
            </div>
            <input
              type="url"
              value={draft.image}
              onChange={handleChange("image")}
              placeholder="Masukkan URL gambar (opsional jika sudah upload)"
              className="url-input-fallback"
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
          <label className="form-field">
            <span>Kategori</span>
            <select value={draft.category} onChange={handleChange("category")}>
              {PRODUCT_CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
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
          <button
            type="submit"
            className="btn btn-primary"
            disabled={uploading}
          >
            {uploading ? "Mengupload..." : "Simpan Produk"}
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
