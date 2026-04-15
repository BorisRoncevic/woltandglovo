import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getItemsByRestaurant } from "../api/itemApi";
import { useCart } from "../context/CartContext";
import ItemCard from "../components/ItemCard";
import type { Item } from "../model/model";
import "../css/RestaurantDetails.css";

export default function RestaurantDetails() {

  const { id } = useParams();
  const [items, setItems] = useState<Item[]>([]);
  const { addItem } = useCart();

  useEffect(() => {
    if (!id) return;

    const numericId = Number(id);
    if (isNaN(numericId)) return;

    getItemsByRestaurant(numericId).then(setItems);
  }, [id]);

  if (!items.length) {
    return <p className="empty-text">Nema stavki u meniju</p>;
  }

  return (
    <div className="restaurant-container">
      <h2 className="restaurant-title">Jelovnik</h2>

      <div className="items-grid">
        {items.map(item => (
          <ItemCard
            key={item.id}
            item={item}
            onAdd={addItem}
          />
        ))}
      </div>
    </div>
  );
}