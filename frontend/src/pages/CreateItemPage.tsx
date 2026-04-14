import { useState } from "react";
import { createItem } from "../api/itemApi";
import { useNavigate, useParams } from "react-router-dom";

export default function CreateItemPage() {

  const navigate = useNavigate();
  const { restaurantId } = useParams();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: ""
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      await createItem({
        ...form,
        price: Number(form.price),
        restaurantId: Number(restaurantId)   
      });
  
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Ime"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        placeholder="Opis"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <input
        placeholder="Cena"
        type="number"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />

      <button type="submit">Kreiraj</button>
    </form>
  );
}