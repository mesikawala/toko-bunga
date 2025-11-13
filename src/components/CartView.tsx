import type { CartItem } from '../types/cart'

type CartViewProps = {
  items: CartItem[]
  totalPrice: number
  onQuantityChange: (id: string, delta: number) => void
  onRemoveItem: (id: string) => void
  onClearCart: () => void
  onBackToShop: () => void
}

export const CartView = ({
  items,
  totalPrice,
  onQuantityChange,
  onRemoveItem,
  onClearCart,
  onBackToShop,
}: CartViewProps) => {
  const hasItems = items.length > 0

  return (
    <section className="cart-page">
      <div className="section-heading">
        <span className="eyebrow">Keranjangmu</span>
        <h2>Sentuhan bunga pastel yang siap dikirim</h2>
        <p>
          Kami rangkai segera setelah checkout untuk memastikan kesegaran. Kamu bisa menambahkan kartu
          ucapan gratis pada saat konfirmasi via WhatsApp.
        </p>
      </div>

      {hasItems ? (
        <div className="cart-layout">
          <div className="cart-list">
            {items.map((item) => (
              <article key={item.id} className="cart-item">
                <figure className="cart-item-image">
                  <img src={item.image} alt={item.name} loading="lazy" />
                </figure>

                <div className="cart-item-body">
                  <div>
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                  </div>

                  <div className="cart-item-controls">
                    <div className="quantity-control">
                      <button onClick={() => onQuantityChange(item.id, -1)} aria-label="Kurangi">
                        –
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => onQuantityChange(item.id, 1)} aria-label="Tambah">
                        +
                      </button>
                    </div>
                    <p className="cart-item-price">
                      Rp {(item.price * item.quantity).toLocaleString('id-ID', { maximumFractionDigits: 0 })}
                    </p>
                  </div>

                  <button className="link link-danger" onClick={() => onRemoveItem(item.id)}>
                    Hapus
                  </button>
                </div>
              </article>
            ))}
          </div>

          <aside className="cart-summary">
            <div className="summary-card">
              <h4>Ringkasan Pesanan</h4>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>Rp {totalPrice.toLocaleString('id-ID', { maximumFractionDigits: 0 })}</span>
              </div>
              <div className="summary-row">
                <span>Pengiriman</span>
                <span>Hitung setelah alamat</span>
              </div>
              <div className="summary-row summary-row--total">
                <span>Total</span>
                <span>Rp {totalPrice.toLocaleString('id-ID', { maximumFractionDigits: 0 })}</span>
              </div>
              <button className="btn btn-primary btn-full">Checkout via WhatsApp</button>
              <button className="btn btn-ghost btn-full" onClick={onClearCart}>
                Kosongkan Keranjang
              </button>
            </div>

            <div className="summary-note">
              <h5>Minta penyesuaian?</h5>
              <p>
                Kamu bisa menambahkan catatan khusus setelah checkout. Tim kami akan memastikan hasilnya
                sesuai keinginanmu sebelum dirangkai.
              </p>
            </div>
          </aside>
        </div>
      ) : (
        <div className="empty-cart">
          <h3>Keranjangmu masih kosong</h3>
          <p>
            Yuk pilih buket favorit atau konsultasi dengan florist kami untuk merancang buket impianmu.
          </p>
          <button className="btn btn-primary" onClick={onBackToShop}>
            Cari Buket
          </button>
        </div>
      )}
    </section>
  )
}


