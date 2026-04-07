import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRestaurantsByCity } from "../api/restaurantApi";
  import RestaurantCard from "../components/RestaurantCard";
export default function RestaurantsPage() {

  type Restaurant = {
    id: number;
    name: string;
  };

  const { city } = useParams();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  useEffect(() => {
    if (!city) return;
    getRestaurantsByCity(city).then(setRestaurants);
  }, [city]);

  return (
    <div>
      <h2>Restorani u {city}</h2>
  
      {restaurants.map(r => (
        <RestaurantCard key={r.id} restaurant={r} />
      ))}
    </div>
  );
}