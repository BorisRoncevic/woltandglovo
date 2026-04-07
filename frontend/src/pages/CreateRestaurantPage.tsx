import { useState } from "react";
import { createRestaurant } from "../api/restaurantApi";
import { useNavigate } from "react-router-dom";

export default function CreateRestaurantPage() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    city: "NOVI_SAD",
    location: ""
  });

  const [error, setError] = useState("");

  const handleSubmit = async () => {

    try {
      await createRestaurant(form);
      navigate("/my-restaurants");
    } catch (err) {
      setError("Greška pri kreiranju restorana");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>Kreiraj restoran</h2>

      <form onSubmit={handleSubmit}>

        <input
          placeholder="Naziv restorana"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          style={{ display: "block", marginBottom: "10px", width: "100%" }}
        />

        <select
          value={form.city}
          onChange={(e) =>
            setForm({ ...form, city: e.target.value })
          }
          style={{ display: "block", marginBottom: "10px", width: "100%" }}
        >
          <option value="NOVI_SAD">Novi Sad</option>
          <option value="BEOGRAD">Beograd</option>
        </select>

        <input
          placeholder="Adresa (npr. Bulevar Oslobođenja 10)"
          value={form.location}
          onChange={(e) =>
            setForm({ ...form, location: e.target.value })
          }
          style={{ display: "block", marginBottom: "10px", width: "100%" }}
        />

        <button type="submit">Kreiraj</button>

      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}