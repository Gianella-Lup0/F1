import { useParams, Link } from "react-router-dom";
import { escuderiasData } from "./Equipos";
import productosJson from "../productos.json";

export default function EquipoDetalle() {
  const { slug } = useParams();
  const equipoInfo = escuderiasData[slug];

  if (!equipoInfo) return <div style={{ color: "#fff", padding: "40px" }}>Escudería no encontrada.</div>;

  // Filtro automático de productos de ese equipo
  const productosFiltrados = productosJson.filter(p => p.equipoSlug === slug);

  return (
    <div style={{ padding: "40px 20px", color: "#fff" }}>
      <div style={{ borderBottom: "1px solid #222", paddingBottom: "20px", marginBottom: "30px" }}>
        <h1 style={{ fontSize: "2.5rem", color: "#e10600", margin: "0 0 10px 0" }}>{equipoInfo.nombre}</h1>
        <h3>Palmarés Histórico</h3>
        <p style={{ fontSize: "1.1rem", color: "#ffd700" }}>{equipoInfo.palmares}</p>
        <h3>Historia</h3>
        <p style={{ color: "#ccc", lineHeight: "1.6", maxWidth: "800px" }}>{equipoInfo.history}</p>
      </div>

      <h2>Productos Oficiales del Equipo</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "20px" }}>
        {productosFiltrados.length > 0 ? (
          productosFiltrados.map(p => (
            <div key={p.id} style={{ backgroundColor: "#141414", padding: "15px", borderRadius: "6px" }}>
              <img src={p.imagen} alt={p.nombre} style={{ width: "100%", borderRadius: "4px" }} />
              <h4 style={{ margin: "10px 0" }}>{p.nombre}</h4>
              <p style={{ color: "#e10600", fontWeight: "bold" }}>${p.precio.toLocaleString()}</p>
              <Link to={`/producto/${p.id}`} style={{ color: "#fff", textDecoration: "underline", fontSize: "0.9rem" }}>Ver Detalles</title></Link>
            </div>
          ))
        ) : (
          <p style={{ color: "#666" }}>No hay productos en stock para esta escudería en este momento.</p>
        )}
      </div>
    </div>
  );
}