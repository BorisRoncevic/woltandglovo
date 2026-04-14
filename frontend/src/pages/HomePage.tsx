import { useNavigate } from "react-router-dom";

export default function HomePage() {

  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Izaberi grad</h1>

      <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>

        <button
          onClick={() => navigate("/restaurants/Novi_Sad")}
        >
          Novi Sad
        </button>

        <button
          onClick={() => navigate("/restaurants/Beograd")}
        >
          Beograd
        </button>

      </div>
    </div>
  );
}