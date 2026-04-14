import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getItemsByRestaurant } from "../api/itemApi";
import { useCart } from "../context/CartContext";
import ItemCard from "../components/ItemCard";
import type { Item } from "../model/model";

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

  return (
    <div>
      <h2>Jelovnik</h2>
  
      {items.map(item => (
        <ItemCard 
          key={item.id} 
          item={item} 
          onAdd={addItem} 
        />
      ))}
    </div>
  );
}