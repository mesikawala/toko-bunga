import { REVIEWS } from "../data/content";
import { ScrollAnimate } from "./ScrollAnimate";

type ReviewsSectionProps = {
  compact?: boolean;
};

export const ReviewsSection = ({ compact = false }: ReviewsSectionProps) => {
  return (
    <section
      className={`reviews-section ${compact ? "reviews-section--compact" : ""}`}
    >
      {!compact && (
        <ScrollAnimate animation="fadeInUp" delay={0}>
          <div className="section-heading">
            <span className="eyebrow">Cerita Pelanggan</span>
            <h2>Ulasan tulus dari mereka yang sudah berbagi momen manis</h2>
            <p>
              Kami percaya setiap bunga punya cerita. Terima kasih sudah
              mempercayai Fleurélle untuk merangkai momen spesial kalian.
            </p>
          </div>
        </ScrollAnimate>
      )}

      <ScrollAnimate animation="fadeIn" delay={200}>
        <div className="reviews-grid">
        {REVIEWS.map((review) => (
          <article key={review.id} className="review-card">
            <div
              className="review-avatar"
              style={{ background: review.avatarColor }}
            >
              {review.name
                .split(" ")
                .map((part) => part[0])
                .join("")
                .slice(0, 2)}
            </div>
            <div className="review-body">
              <header>
                <h4>{review.name}</h4>
                <span>{review.order}</span>
              </header>
              <p>{review.message}</p>
            </div>
          </article>
        ))}
      </div>
      </ScrollAnimate>
    </section>
  );
};
