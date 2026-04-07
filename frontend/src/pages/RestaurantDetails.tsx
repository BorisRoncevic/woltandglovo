import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getItemsByRestaurant } from "../api/itemApi";
import { useCart } from "../context/CartContext";

export default function RestaurantDetails() {

  type Item = {
    id: number;
    name: string;
    description: string;
    price : number;
  };



  const { id } = useParams();
  const [items, setItems] = useState<Item[]>([]);

  const { addItem } = useCart();

  useEffect(() => {
    getItemsByRestaurant(id).then(setItems);
  }, [id]);

  return (
    <div>
      <h2>Jelovnik</h2>

      {items.map(item => (
        <div key={item.id} style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
          <h4>{item.name}</h4>
          <p>{item.description}</p>
          <p>{item.price} RSD</p>

          <button onClick={() => addItem(item.id)}>
            Dodaj u korpu
          </button>
        </div>
      ))}
    </div>
  );
}