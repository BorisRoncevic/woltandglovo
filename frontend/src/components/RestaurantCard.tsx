import { useNavigate } from "react-router-dom";
import "../css/RestaurantCard.css";

type Props = {
  restaurant: {
    id: number;
    name: string;
    city?: string;
  };
};

export default function RestaurantCard({ restaurant }: Props) {
  const navigate = useNavigate();

  return (
    <div
      className="restaurant-card"
      onClick={() => navigate(`/details/${restaurant.id}`)}
    >
      <div className="restaurant-name">{restaurant.name}</div>

      {/* opcionalno */}
      {restaurant.city && (
        <div className="restaurant-extra">
          {restaurant.city}
        </div>
      )}
    </div>
  );
}