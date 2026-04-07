import { useNavigate } from "react-router-dom";

type Props = {
  restaurant: {
    id: number;
    name: string;
  };
};

export default function RestaurantCard({ restaurant }: Props) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/restaurants/${restaurant.id}`)}
      style={{
        border: "1px solid gray",
        margin: "10px",
        padding: "10px",
        cursor: "pointer"
      }}
    >
      <h3>{restaurant.name}</h3>
    </div>
  );
}