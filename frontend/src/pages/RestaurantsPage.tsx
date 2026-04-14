import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRestaurantsByCity } from "../api/restaurantApi";
import RestaurantCard from "../components/RestaurantCard";
import type { Restaurant } from "../model/model";
export default function RestaurantsPage() {

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