import { Link } from "react-router-dom";
import "./Home.css";

const HIGHLIGHTS = [
  { number: "20", label: "Pilotos en pista", icon: "🚘" },
  { number: "23", label: "GPs por temporada", icon: "🏁" },
  { number: "∞", label: "Velocidad máxima", icon: "⚡" },
];

const FEATURED_TEAMS = [
  { name: "Red Bull Racing", color: "#3671C6", wins: "21 victorias en 2023" },
  { name: "Scuderia Ferrari", color: "#E8002D", wins: "9 victorias en 2023" },
  { name: "Mercedes-AMG", color: "#00D2BE", wins: "3 victorias en 2023" },
  { name: "McLaren F1", color: "#FF8000", wins: "2 victorias en 2023" },
  { name: "Aston Martin", color: "#358C75", wins: "0 victorias en 2023" },
  { name: "Williams Racing", color: "#005AFF", wins: "Legendario desde 1977" },
];

{/*

*/}

export default function Home() {
  return (
    <div className="home">
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-track-lines" />
          <div className="hero-glow" />
          <div className="hero-checkered-bg" />
        </div>

        <div className="hero-content">
          <div className="hero-eyebrow">
            <span className="hero-flag">🏁</span>
            <span>TEMPORADA 2026 · FÓRMULA 1</span>
          </div>

          <h1 className="hero-title">
            <span className="hero-title-line">SIENTE</span>
            <span className="hero-title-line outline">LA VELOCIDAD</span>
            <span className="hero-title-line">EN TUS MANOS</span>
          </h1>

          <p className="hero-sub">
            Cascos de competición. Piezas auténticas. Memorabilia que nació en el asfalto.
            <br />
            Colecciones inspiradas en Senna, Hamilton, Verstappen y los campeones que dejaron huella.
          </p>

          <div className="hero-ctas">
            <Link to="/productos" className="cta-primary">
              VER CATÁLOGO
              <span className="cta-arrow">→</span>
            </Link>
            <Link to="/productos" className="cta-secondary">
              PIEZAS EXCLUSIVAS
            </Link>
          </div>
        </div>

        <div className="hero-scroll-indicator">
          <div className="scroll-line" />
          <span>LET GO!</span>
        </div>
      </section>

      {/* STATS */}
      <section className="stats-section">
        {HIGHLIGHTS.map((h) => (
          <div key={h.label} className="stat-item">
            <div className="stat-icon">{h.icon}</div>
            <div className="stat-number">{h.number}</div>
            <div className="stat-label">{h.label}</div>
          </div>
        ))}
      </section>

      {/* SENNA TRIBUTE */}
      <section className="tribute-section">
        <div className="tribute-inner">
          <div className="tribute-text-side">
            <div className="tribute-tag">LEYENDA · AYRTON SENNA</div>
            <h2 className="tribute-title">
              "NO SE PUEDE SOBREPASAR EL LÍMITE.<br />
              <span className="tribute-accent">HAY QUE ABRAZAR EL LÍMITE."</span>
            </h2>
            <p className="tribute-sub">
              La colección Senna es un homenaje al piloto más talentoso en la historia de la Fórmula 1. 
              Cada pieza lleva el espíritu de San Paulo, Mónaco y Imola.
            </p>
            <Link to="/productos" className="tribute-cta">
              VER COLECCIÓN SENNA →
            </Link>
          </div>
          <div className="tribute-visual">
            <div className="tribute-circle">
              <div className="tribute-number">3</div>
              <div className="tribute-circle-label">Campeonatos<br />Mundiales</div>
            </div>
            <div className="tribute-lines">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="tribute-line" style={{ animationDelay: `${i * 0.2}s` }} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TEAMS GRID */}
      <section className="teams-section">
        <div className="teams-inner">
          <div className="section-header">
            <div className="section-tag">EQUIPOS · 2024</div>
            <h2 className="section-title">LOS MEJORES<br />EQUIPOS DEL MUNDO</h2>
          </div>
          <div className="teams-grid">
            {FEATURED_TEAMS.map((team) => (
              <div key={team.name} className="team-item" style={{ '--team-color': team.color }}>
                <div className="team-item-bar" />
                <div className="team-item-name">{team.name}</div>
                <div className="team-item-wins">{team.wins}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="final-cta-section">
        <div className="final-cta-inner">
          <div className="final-cta-flag">🏁</div>
          <h2 className="final-cta-title">¿LISTO PARA ENTRAR AL BOX?</h2>
          <p className="final-cta-sub">Más de 100 productos de colección esperan en el catálogo</p>
          <Link to="/productos" className="cta-primary large">
            EXPLORAR CATÁLOGO →
          </Link>
        </div>
      </section>
    </div>
  );
}
