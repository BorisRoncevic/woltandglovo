import { useNavigate } from "react-router-dom";
import "../css/HomePage.css";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1 className="home-title">Izaberi grad</h1>

      <div className="city-buttons">
        <button
          className="city-button"
          onClick={() => navigate("/restaurants/Novi_Sad")}
        >
          Novi Sad
        </button>

        <button
          className="city-button"
          onClick={() => navigate("/restaurants/Beograd")}
        >
          Beograd
        </button>
      </div>
    </div>
  );
}