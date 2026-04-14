import { useState } from "react";
import { register } from "../api/authApi";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    surname: "",
    years: "",
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await register(form);

      navigate("/login");

    } catch (err) {
      setError("Greška pri registraciji");
    }
  };

  return (
    <div>
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>

        <input
          placeholder="Ime"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          placeholder="Prezime"
          value={form.surname}
          onChange={(e) =>
            setForm({ ...form, surname: e.target.value })
          }
        />

        <input
          placeholder="Godine"
          type="number"
          value={form.years}
          onChange={(e) =>
            setForm({ ...form, years: e.target.value })
          }
        />

        <input
          placeholder="Username"
          value={form.username}
          onChange={(e) =>
            setForm({ ...form, username: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button type="submit">Register</button>

      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}