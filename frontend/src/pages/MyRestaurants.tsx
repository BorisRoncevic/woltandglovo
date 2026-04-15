import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { Restaurant } from "../model/model";
import { getMyRestaurants } from "../api/restaurantApi";
import "../css/MyRestaurants.css";


export default function MyRestaurants() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getMyRestaurants().then(setRestaurants);
  }, []);

  if (!restaurants.length) {
    return <p className="empty-text">Nema restorana</p>;
  }

  return (
    <div className="myrestaurants-container">
      <h2 className="myrestaurants-title">Moji restorani</h2>

      {restaurants.map((restaurant) => (
        <div
          key={restaurant.id}
          className="restaurant-card"
          onClick={() =>
            navigate(`/restaurant/${restaurant.id}/orders`)
          }
        >
          <div className="restaurant-name">{restaurant.name}</div>

          {/* 🔥 Dugme */}
          <button
            className="add-item-button"
            onClick={(e) => {
              e.stopPropagation(); // 🔥 SPREČAVA klik na parent
              navigate(`/create-item/${restaurant.id}`);
            }}
          >
            Dodaj stavku
          </button>
        </div>
      ))}
    </div>
  );
}