import { useState } from "react";
import { createRestaurant } from "../api/restaurantApi";
import { useNavigate } from "react-router-dom";
import "../css/CreateRestaurant.css";

export default function CreateRestaurantPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    city: "Novi_Sad",
    location: ""
  });

  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createRestaurant(form);
      navigate("/my-restaurants");
    } catch (err) {
      setError("Greška pri kreiranju restorana");
    }
  };

  return (
    <div className="create-container">
      <h2 className="create-title">Kreiraj restoran</h2>

      <form onSubmit={handleSubmit} className="create-form">

        <input
          className="create-input"
          placeholder="Naziv restorana"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <select
          className="create-select"
          value={form.city}
          onChange={(e) =>
            setForm({ ...form, city: e.target.value })
          }
        >
          <option value="Novi_Sad">Novi Sad</option>
          <option value="Beograd">Beograd</option>
        </select>

        <input
          className="create-input"
          placeholder="Adresa (npr. Bulevar Oslobođenja 10)"
          value={form.location}
          onChange={(e) =>
            setForm({ ...form, location: e.target.value })
          }
        />

        <button className="create-button" type="submit">
          Kreiraj
        </button>
      </form>

      {error && <p className="error-text">{error}</p>}
    </div>
  );
}