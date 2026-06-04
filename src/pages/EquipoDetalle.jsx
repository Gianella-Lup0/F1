import { useParams, Link } from "react-router-dom";
import { escuderiasData } from "./Equipos";
import productosJson from "../../public/productos.json";

export default function EquipoDetalle() {
  const { slug } = useParams();
  const equipoInfo = escuderiasData[slug];

  if (!equipoInfo) return <div style={{ color: "#fff", padding: "40px" }}>Escudería no encontrada.</div>;
  const productosFiltrados = productosJson.filter(p => p.equipoSlug === slug);

  return (
    <div style={{ padding: "40px 20px", color: "#fff" }}>
      <div style={{ borderBottom: "1px solid #222", paddingBottom: "20px", marginBottom: "30px" }}>
        <h1 style={{ fontSize: "2.5rem", color: "#e10600", margin: "0" }}>{equipoInfo.nombre}</h1>
        <p style={{ color: "#ffd700", fontWeight: "bold" }}>{equipoInfo.palmares}</p>
        <p style={{ color: "#ccc", lineHeight: "1.6" }}>{equipoInfo.history}</p>
      </div>
      <h2>Productos del Equipo</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "20px" }}>
        {productosFiltrados.map(p => (
          <div key={p.id} style={{ backgroundColor: "#141414", padding: "15px", borderRadius: "6px" }}>
            <img src={p.imagen} alt={p.nombre} style={{ width: "100%" }} />
            <h4>{p.nombre}</h4>
            <p style={{ color: "#e10600" }}>${p.precio.toLocaleString()}</p>
            <Link to={`/producto/${p.id}`} style={{ color: "#fff" }}>Ver Detalles</Link>
          </div>
        ))}
      </div>
    </div>
  );
}