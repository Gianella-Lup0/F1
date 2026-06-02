import { Link } from "react-router-dom";

export const escuderiasData = {
  "red-bull-racing": { nombre: "Red Bull Racing", historia: "Fundado en 2005, el equipo de la bebida energética revolucionó la F1 logrando múltiples campeonatos mundiales basados en un diseño aerodinámico implacable a cargo de Adrian Newey.", palmares: "6 Mundiales de Constructores, 7 Mundiales de Pilotos." },
  "scuderia-ferrari": { nombre: "Scuderia Ferrari", historia: "El equipo más antiguo, icónico y legendario presente desde la temporada inaugural en 1950. Símbolo del Cavallino Rampante y la pasión italiana.", palmares: "16 Mundiales de Constructores, 15 Mundiales de Pilotos." },
  "mercedes-amg": { nombre: "Mercedes-AMG Petronas", historia: "Dominadores absolutos de la era híbrida moderna de la Fórmula 1, marcando hitos históricos de campeonatos consecutivos.", palmares: "8 Mundiales de Constructores, 7 Mundiales de Pilotos." },
  "mclaren": { nombre: "McLaren F1 Team", historia: "Fundada por Bruce McLaren, es la segunda escudería más longeva de la grilla, cuna de leyendas imborrables como Ayrton Senna y Alain Prost.", palmares: "8 Mundiales de Constructores, 12 Mundiales de Pilotos." }
};

export default function Equipos() {
  return (
    <div style={{ padding: "40px 20px", color: "#fff" }}>
      <h1 style={{ borderLeft: "5px solid #e10600", paddingLeft: "10px", marginBottom: "30px" }}>ESCUDERÍAS F1</h1>
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