// components/StarRating.js
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";

export default function StarRating({ rating }) {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars.push(<FontAwesomeIcon key={i} icon={solidStar} className="text-yellow-400" />);
    } else if (i === Math.floor(rating) + 1 && rating % 1 >= 0.5) {
      stars.push(<FontAwesomeIcon key={i} icon={faStarHalfAlt} className="text-yellow-400" />);
    } else {
      stars.push(<FontAwesomeIcon key={i} icon={regularStar} className="text-yellow-400" />);
    }
  }

  return <div className="flex space-x-1">{stars}</div>;
}
