import { EmptyStarIcon, HalfStarIcon, StarIcon } from "../Icons";

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
    stars.push(<StarIcon className="w-5 h-5 text-[#3483fa]" />);
  }

  if (hasHalfStar) {
    stars.push(<HalfStarIcon className="w-5 h-5 text-[#3483fa]" />);
  }

  for (let i = 0; i < emptyStars; i++) {
    stars.push(<EmptyStarIcon className="w-5 h-5 text-[#3483fa]" />);
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
