interface StarRatingProps {
  rating: number;
  total: number;
}

const StarRating = ({ rating, total }: StarRatingProps) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <img
        key={`full-${i}`}
        src="/images/star.svg"
        alt="estrella completa"
        className="w-4 h-4"
      />
    );
  }

  if (hasHalfStar) {
    stars.push(
      <img
        key="half"
        src="/images/halfStar.svg"
        alt="media estrella"
        className="w-4 h-4"
      />
    );
  }

  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <img
        key={`empty-${i}`}
        src="/images/emptyStar.svg"
        alt="estrella vacía"
        className="w-4 h-4"
      />
    );
  }

  return (
    <div className="text-sm flex items-center gap-1 mt-1">
      <span className="text-gray-600">{rating.toFixed(1)}</span>
      <div className="flex items-center gap-0.5">{stars}</div>
      <span className="text-gray-600">({total})</span>
    </div>
  );
};

export default StarRating;
