import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartWidget from "./CartWidget";
import "./Header.css";

export default function Header() {
  const location = useLocation();

  return (
    <header className="header">
      <div className="header-stripe" />
      <div className="header-inner">
        <Link to="/" className="header-logo">
          <span className="logo-f1">F1</span>
          <span className="logo-store">STORE</span>
        </Link>

        <nav className="header-nav">
          <Link
            to="/"
            className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
          >
            INICIO
          </Link>
          <Link
            to="/productos"
            className={`nav-link ${location.pathname === "/productos" ? "active" : ""}`}
          >
            CATÁLOGO
          </Link>
          <Link
            to="/carrito"
            className={`nav-link ${location.pathname === "/carrito" ? "active" : ""}`}
          >
            MI EQUIPO
          </Link>
        </nav>

        <CartWidget />
      </div>
    </header>
  );
}
