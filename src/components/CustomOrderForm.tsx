import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

type FormValues = {
  name: string;
  phone: string;
  email: string;
  occasion: string;
  colorPreference: string;
  deliveryDate: string;
  budget: string;
  notes: string;
};

const INITIAL_VALUES: FormValues = {
  name: "",
  phone: "",
  email: "",
  occasion: "",
  colorPreference: "",
  deliveryDate: "",
  budget: "",
  notes: "",
};

export const CustomOrderForm = () => {
  const [formValues, setFormValues] = useState<FormValues>(INITIAL_VALUES);
  const [submitted, setSubmitted] = useState(false);

  const handleChange =
    (field: keyof FormValues) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormValues((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    setFormValues(INITIAL_VALUES);
  };

  return (
    <section className="custom-form-section" id="custom-form">
      <div className="section-heading">
        <span className="eyebrow">Custom Bouquet Service</span>
        <h2>Ceritakan buket impianmu, kami rangkai dengan penuh detail</h2>
        <p>
          Jelaskan palet warna, aroma, maupun budget yang kamu mau. Florist kami
          akan menghubungi dalam 1x24 jam untuk finalisasi desain.
        </p>
      </div>

      <form className="custom-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <label className="form-field">
            <span>Nama Lengkap</span>
            <input
              type="text"
              value={formValues.name}
              onChange={handleChange("name")}
              required
              placeholder="Misal: Anindya Rahma"
            />
          </label>
          <label className="form-field">
            <span>Nomor WhatsApp</span>
            <input
              type="tel"
              value={formValues.phone}
              onChange={handleChange("phone")}
              required
              placeholder="08xxxxxxxxxx"
              pattern="[0-9+ ]+"
            />
          </label>
          <label className="form-field">
            <span>Email (opsional)</span>
            <input
              type="email"
              value={formValues.email}
              onChange={handleChange("email")}
              placeholder="namamu@email.com"
            />
          </label>
          <label className="form-field">
            <span>Acara / Tujuan</span>
            <input
              type="text"
              value={formValues.occasion}
              onChange={handleChange("occasion")}
              required
              placeholder="Ulang tahun, lamaran, wisuda..."
            />
          </label>
          <label className="form-field">
            <span>Palet warna favorit</span>
            <input
              type="text"
              value={formValues.colorPreference}
              onChange={handleChange("colorPreference")}
              placeholder="Soft blush, white-green, lavender..."
            />
          </label>
          <label className="form-field">
            <span>Tanggal pengiriman</span>
            <input
              type="date"
              value={formValues.deliveryDate}
              onChange={handleChange("deliveryDate")}
              required
            />
          </label>
          <label className="form-field">
            <span>Budget (estimasi)</span>
            <input
              type="text"
              value={formValues.budget}
              onChange={handleChange("budget")}
              placeholder="Contoh: 700 ribu"
            />
          </label>
          <label className="form-field form-field--textarea">
            <span>Ceritakan detail tambahan</span>
            <textarea
              value={formValues.notes}
              onChange={handleChange("notes")}
              placeholder="Tulis preferensi flower box, kartu ucapan, aroma favorit, dsb."
              rows={4}
            />
          </label>
        </div>

        <button className="btn btn-primary btn-full" type="submit">
          Kirim Brief ke Florist
        </button>

        {submitted && (
          <p className="form-success">
            Terima kasih! Tim Fleurélle akan menghubungimu via WhatsApp dalam
            1x24 jam.
          </p>
        )}
      </form>
    </section>
  );
};
