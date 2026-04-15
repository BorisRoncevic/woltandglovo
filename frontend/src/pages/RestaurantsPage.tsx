import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRestaurantsByCity } from "../api/restaurantApi";
import RestaurantCard from "../components/RestaurantCard";
import type { Restaurant } from "../model/model";
import "../css/RestaurantsPage.css";

export default function RestaurantsPage() {
  const { city } = useParams();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    if (!city) return;
    getRestaurantsByCity(city).then(setRestaurants);
  }, [city]);

  if (!restaurants.length) {
    return (
      <p className="empty-text">
        Nema restorana u {city}
      </p>
    );
  }

  return (
    <div className="restaurants-container">
      <h2 className="restaurants-title">
        Restorani u {city}
      </h2>

      <div className="restaurants-grid">
        {restaurants.map(r => (
          <RestaurantCard key={r.id} restaurant={r} />
        ))}
      </div>
    </div>
  );
}