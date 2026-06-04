import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { escuderiasData } from "./Equipos";
import productosJson from "../../public/productos.json";

export default function EquipoDetalle() {
  const { slug } = useParams();
  const { formatPrice } = useCart();
  const equipoInfo = escuderiasData[slug];

  if (!equipoInfo) return <div style={{ color: "#fff", padding: "40px" }}>Escudería no encontrada.</div>;
  const productosFiltrados = productosJson.filter(p => p.equipoSlug === slug);

  return (
    <div style={{ padding: "40px 20px", color: "#fff" }}>
      {/* BANNER DINÁMICO COLOREADO POR ESCUDERÍA */}
      <div style={{ 
        background: `linear-gradient(135deg, ${equipoInfo.color}, ${equipoInfo.accent})`, 
        padding: "40px", borderRadius: "12px", marginBottom: "40px", boxShadow: "0 8px 24px rgba(0,0,0,0.3)"
      }}>
        <h1 style={{ fontSize: "3rem", color: "#fff", margin: "0", textTransform: "uppercase", letterSpacing: "1px" }}>{equipoInfo.nombre}</h1>
        <p style={{ color: "#ffd700", fontWeight: "bold", fontSize: "1.2rem", margin: "10px 0 20px 0" }}>Palmarés: {equipoInfo.palmares}</p>
        <p style={{ color: "#fff", lineHeight: "1.6", maxWidth: "700px", opacity: 0.9 }}>{equipoInfo.history}</p>
      </div>

      <h2 style={{ marginBottom: "20px", borderBottom: "2px solid #222", paddingBottom: "10px" }}>Catálogo Oficial del Equipo</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "20px" }}>
        {productosFiltrados.map(p => (
          <div key={p.id} style={{ backgroundColor: "#141414", padding: "20px", borderRadius: "8px", border: "1px solid #222", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <img src={p.imagen} alt={p.nombre} style={{ width: "100%", height: "160px", objectFit: "cover", borderRadius: "4px" }} />
            <h4 style={{ margin: "15px 0 5px 0", fontSize: "1.1rem" }}>{p.nombre}</h4>
            <p style={{ color: equipoInfo.color, fontWeight: "bold", fontSize: "1.2rem" }}>{formatPrice(p.precio)}</p>
            <Link to={`/producto/${p.id}`} style={{ 
              display: "block", textAlign: "center", backgroundColor: "#222", color: "#fff", 
              padding: "10px", borderRadius: "4px", textDecoration: "none", fontWeight: "bold", marginTop: "10px"
            }}>Ver Ficha Técnica</Link>
          </div>
        ))}
      </div>
    </div>
  );
}