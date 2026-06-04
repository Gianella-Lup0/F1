import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartWidget from "./CartWidget";
import "./Header.css";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") || "";
  
  // Consumo del estado global de monedas
  const { currency, setCurrency } = useCart();

  const handleSearch = (e) => {
    const value = e.target.value;
    navigate(value ? `/productos?q=${encodeURIComponent(value)}` : "/productos");
  };

  return (
    <header className="header">
      <div className="header-stripe" />
      <div className="header-inner">
        <Link to="/" className="header-logo">
          <span className="logo-f1">F1</span>
          <span className="logo-store">STORE</span>
        </Link>

        <div className="header-search-container" style={{ margin: "0 20px", flex: 1, maxWidth: "220px" }}>
          <input
            type="text"
            placeholder="🏎️ Buscar en boxes..."
            value={searchQuery}
            onChange={handleSearch}
            style={{
              width: "100%", padding: "6px 12px", borderRadius: "4px",
              border: "1px solid #333", backgroundColor: "#111", color: "#fff", outline: "none"
            }}
          />
        </div>

        <nav className="header-nav">
          <Link to="/" className={`nav-link ${location.pathname === "/" ? "active" : ""}`}>INICIO</Link>
          <Link to="/productos" className={`nav-link ${location.pathname === "/productos" ? "active" : ""}`}>CATÁLOGO</Link>
          <Link to="/pilotos" className={`nav-link ${location.pathname === "/pilotos" ? "active" : ""}`}>PILOTOS</Link>
          <Link to="/equipos" className={`nav-link ${location.pathname === "/equipos" ? "active" : ""}`}>EQUIPOS</Link>
          <Link to="/calendario" className={`nav-link ${location.pathname === "/calendario" ? "active" : ""}`}>CALENDARIO</Link>
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          {/* SWITCH DE DIVISAS INTERNACIONALES */}
          <select 
            value={currency} 
            onChange={(e) => setCurrency(e.target.value)}
            style={{ backgroundColor: "#222", color: "#fff", border: "1px solid #444", padding: "4px", borderRadius: "4px", cursor: "pointer" }}
          >
            <option value="ARS">ARS ($)</option>
            <option value="USD">USD ($)</option>
          </select>

          <Link to="/favoritos" title="Mis Favoritos" style={{ textDecoration: "none", fontSize: "1.1rem" }}>❤️</Link>
          <Link to="/comparador" title="Comparar Productos" style={{ textDecoration: "none", fontSize: "1.1rem" }}>📊</Link>
          <CartWidget />
        </div>
      </div>
    </header>
  );
}