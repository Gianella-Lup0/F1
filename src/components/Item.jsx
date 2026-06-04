import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Item({ producto, viewMode = "grid" }) {
  const { addToCart } = useCart() || { addToCart: () => {} };
  const estaSinStock = producto.stock === 0;
  const isList = viewMode === "list";

  return (
    <div style={{
      backgroundColor: "#141414",
      padding: "20px",
      borderRadius: "8px",
      border: "1px solid #222",
      display: "flex",
      flexDirection: isList ? "row" : "column",
      alignItems: isList ? "center" : "stretch",
      gap: "15px",
      justifyContent: "space-between"
    }}>
      <img 
        src={producto.imagen} 
        alt={producto.nombre} 
        style={{ 
          width: isList ? "80px" : "100%", 
          height: isList ? "80px" : "200px", 
          objectFit: "contain" 
        }} 
      />

      <div style={{ flex: 1, padding: isList ? "0 20px" : "0" }}>
        <span style={{ fontSize: "0.75rem", color: "#e10600", fontWeight: "bold", textTransform: "uppercase" }}>
          {producto.categoria}
        </span>
        <h3 style={{ fontSize: "1.1rem", margin: "5px 0", color: "#fff" }}>{producto.nombre}</h3>
        <p style={{ color: "#888", fontSize: "0.85rem", margin: "0" }}>
          {producto.equipo} {producto.piloto !== "Nadie" ? `| ${producto.piloto}` : ""}
        </p>
      </div>

      <div style={{ 
        display: "flex", 
        flexDirection: isList ? "row" : "column", 
        alignItems: isList ? "center" : "stretch", 
        gap: "15px",
        minWidth: isList ? "220px" : "auto"
      }}>
        <span style={{ fontSize: "1.3rem", fontWeight: "bold", color: "#fff", textAlign: isList ? "right" : "left" }}>
          ${producto.precio.toLocaleString()}
        </span>

        {estaSinStock ? (
          <button disabled style={{
            backgroundColor: "#222",
            color: "#555",
            border: "none",
            padding: "10px",
            fontWeight: "bold",
            borderRadius: "4px",
            cursor: "not-allowed"
          }}>
            SIN STOCK
          </button>
        ) : (
          <button 
            onClick={() => addToCart(producto)}
            style={{
              backgroundColor: "#e10600",
              color: "#fff",
              border: "none",
              padding: "10px 15px",
              fontWeight: "bold",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            AÑADIR A BOXES
          </button>
        )}
        
        <Link 
          to={`/producto/${producto.id}`} 
          style={{ color: "#aaa", fontSize: "0.85rem", textAlign: "center", textDecoration: "underline" }}
        >
          Detalles
        </Link>
      </div>
    </div>
  );
}