import { useNavigate } from "react-router-dom";

const pilotosGrid = [
  { slug: "max-verstappen", nombre: "Max Verstappen", numero: 1, bandera: "🇳🇱", equipo: "Red Bull Racing" },
  { slug: "sergio-perez", nombre: "Sergio Pérez", numero: 11, bandera: "🇲🇽", equipo: "Red Bull Racing" },
  { slug: "charles-leclerc", nombre: "Charles Leclerc", numero: 16, bandera: "🇲🇨", equipo: "Scuderia Ferrari" },
  { slug: "lewis-hamilton", nombre: "Lewis Hamilton", numero: 44, bandera: "🇬🇧", equipo: "Mercedes-AMG Petronas" },
  { slug: "lando-norris", nombre: "Lando Norris", numero: 4, bandera: "🇬🇧", equipo: "McLaren F1 Team" },
  { slug: "fernando-alonso", nombre: "Fernando Alonso", numero: 14, bandera: "🇪🇸", equipo: "Aston Martin" },
  { slug: "alexander-albon", nombre: "Alexander Albon", numero: 23, bandera: "🇹🇭", equipo: "Williams Racing" },
  // Podés completar la grilla hasta los 20 pilotos manteniendo el formato de slugs
];

export default function Pilotos() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "40px 20px", color: "#fff", backgroundColor: "#0a0a0a" }}>
      <h1 style={{ borderLeft: "5px solid #e10600", paddingLeft: "10px", marginBottom: "30px" }}>
        PILOTOS DE LA PARRILLA
      </h1>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: "20px"
      }}>
        {pilotosGrid.map((p) => (
          <div 
            key={p.slug}
            onClick={() => navigate(`/productos?piloto=${p.slug}`)}
            style={{
              backgroundColor: "#141414",
              border: "1px solid #222",
              borderRadius: "8px",
              padding: "20px",
              cursor: "pointer",
              position: "relative",
              transition: "transform 0.2s"
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.03)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            <div style={{ position: "absolute", top: "10px", right: "15px", fontSize: "2rem", opacity: 0.1, fontWeight: "bold" }}>
              #{p.numero}
            </div>
            <div style={{ fontSize: "1.5rem", marginBottom: "5px" }}>{p.bandera}</div>
            <h3 style={{ margin: "5px 0 0 0", fontSize: "1.2rem" }}>{p.nombre}</h3>
            <p style={{ color: "#888", fontSize: "0.9rem", marginTop: "4px" }}>{p.equipo}</p>
          </div>
        ))}
      </div>
    </div>
  );
}