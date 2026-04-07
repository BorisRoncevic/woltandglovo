import { useState } from "react";
import { createItem } from "../api/itemApi";
import { useNavigate } from "react-router-dom";

export default function CreateItemPage() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    ime: "",
    opis: "",
    cena: ""
  });

  const handleSubmit = async () => {
    try {
      await createItem(form);
      navigate("/"); 
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Ime"
        value={form.ime}
        onChange={(e) => setForm({ ...form, ime: e.target.value })}
      />

      <input
        placeholder="Opis"
        value={form.opis}
        onChange={(e) => setForm({ ...form, opis: e.target.value })}
      />

      <input
        placeholder="Cena"
        type="number"
        value={form.cena}
        onChange={(e) => setForm({ ...form, cena: e.target.value })}
      />

      <button type="submit">Kreiraj</button>
    </form>
  );
}