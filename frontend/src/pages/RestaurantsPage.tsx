import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRestaurantsByCity } from "../api/restaurantApi";

export default function RestaurantsPage() {

  type Restaurant = {
    id: number;
    name: string;
  };

  const { city } = useParams();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  useEffect(() => {
    getRestaurantsByCity(city).then(setRestaurants);
  }, [city]);

  return (
    <div>
      <h2>Restorani u {city}</h2>

      {restaurants.map(r => (
        <div key={r.id}>
          {r.name}
        </div>
      ))}
    </div>
  );
}