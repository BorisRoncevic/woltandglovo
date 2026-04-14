import { useState } from "react";
import { createRestaurant } from "../api/restaurantApi";
import { useNavigate } from "react-router-dom";

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
      console.log("Saljem restoran:", form);
      await createRestaurant(form);
      navigate("/my-restaurants");
    } catch (err) {
      console.error(err);
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
          <option value="Novi_Sad">Novi Sad</option>
          <option value="Beograd">Beograd</option>
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