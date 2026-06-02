import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartWidget from "./CartWidget";
import "./Header.css";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") || "";

  const handleSearch = (e) => {
    const value = e.target.value;
    if (value) {
      navigate(`/productos?q=${encodeURIComponent(value)}`);
    } else {
      navigate("/productos");
    }
  };

  return (
    <header className="header">
      <div className="header-stripe" />
      <div className="header-inner">
        <Link to="/" className="header-logo">
          <span className="logo-f1">F1</span>
          <span className="logo-store">STORE</span>
        </Link>

        {/* BUSCADOR INTEGRADO */}
        <div className="header-search-container" style={{ margin: "0 20px", flex: 1, maxWidth: "300px" }}>
          <input
            type="text"
            placeholder="🏎️ Buscar producto..."
            value={searchQuery}
            onChange={handleSearch}
            style={{
              width: "100%",
              padding: "8px 12px",
              borderRadius: "4px",
              border: "1px solid #333",
              backgroundColor: "#111",
              color: "#fff",
              outline: "none"
            }}
          />
        </div>

        <nav className="header-nav">
          <Link to="/" className={`nav-link ${location.pathname === "/" ? "active" : ""}`}>
            INICIO
          </Link>
          <Link to="/productos" className={`nav-link ${location.pathname === "/productos" ? "active" : ""}`}>
            CATÁLOGO
          </Link>
          <Link to="/pilotos" className={`nav-link ${location.pathname === "/pilotos" ? "active" : ""}`}>
            PILOTOS
          </Link>
          <Link to="/equipos" className={`nav-link ${location.pathname === "/equipos" ? "active" : ""}`}>
            EQUIPOS
          </Link>
          <Link to="/calendario" className={`nav-link ${location.pathname === "/calendario" ? "active" : ""}`}>
            CALENDARIO
          </Link>
          <Link to="/favoritos" className={`nav-link ${location.pathname === "/favoritos" ? "active" : ""}`}>
            FAVORITOS
          </Link>
        </nav>

        <CartWidget />
      </div>
    </header>
  );
}