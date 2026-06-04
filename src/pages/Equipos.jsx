import { Link } from "react-router-dom";

export const escuderiasData = {
  "red-bull-racing": { nombre: "Red Bull Racing", history: "Fundado en 2005, revolucionó la F1 con su diseño aerodinámico implacable.", palmares: "6 Constructores, 7 Pilotos." },
  "scuderia-ferrari": { nombre: "Scuderia Ferrari", history: "El equipo más antiguo e icónico presente desde 1950.", palmares: "16 Constructores, 15 Pilotos." },
  "mercedes-amg": { nombre: "Mercedes-AMG Petronas", history: "Dominadores absolutos de la era híbrida moderna de la F1.", palmares: "8 Constructores, 7 Pilotos." },
  "mclaren": { nombre: "McLaren F1 Team", history: "Fundada por Bruce McLaren, cuna de leyendas como Senna y Prost.", palmares: "8 Constructores, 12 Pilotos." }
};

export default function Equipos() {
  return (
    <div style={{ padding: "40px 20px", color: "#fff" }}>
      <h1 style={{ borderLeft: "5px solid #e10600", paddingLeft: "10px", marginBottom: "30px" }}>ESCUDERÍAS</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
        {Object.entries(escuderiasData).map(([slug, data]) => (
          <Link to={`/equipo/${slug}`} key={slug} style={{ textDecoration: "none", color: "inherit" }}>
            <div style={{ backgroundColor: "#141414", padding: "20px", borderRadius: "6px", border: "1px solid #222" }}>
              <h2>{data.nombre}</h2>
              <p style={{ color: "#e10600", fontWeight: "bold" }}>🏆 {data.palmares.split(",")[0]}</p>
              <span style={{ color: "#aaa", fontSize: "0.85rem" }}>Ver historia y productos →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}