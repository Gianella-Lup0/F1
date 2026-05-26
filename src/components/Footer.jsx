import "./Footer.css";

const teamMembers = [
  {
    name: "Valentina Rossi",
    role: "Head of Engineering",
    avatar: "VR",
    color: "#FF1E00",
  },
  {
    name: "Marco Verstappen",
    role: "Lead Designer",
    avatar: "MV",
    color: "#3671C6",
  },
  {
    name: "Gianella Lupo Martinez",
    role: "Full Stack Developer",
    avatar: "GM",
    color: "#0aaf7e",
  },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-stripe" />
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="footer-logo">
            <span className="footer-logo-f1">F1</span>
            <span className="footer-logo-store">STORE</span>
          </div>
          <p className="footer-tagline">
            Velocidad. Precisión. Pasión.
          </p>
          <p className="footer-desc">
            La tienda oficial de merchandising y piezas de colección de la Fórmula 1.
            Cada pieza cuenta una historia de adrenalina pura.
          </p>
        </div>

        <div className="footer-links">
          <h4 className="footer-section-title">NAVEGACIÓN</h4>
          <ul>
            <li><a href="/">Inicio</a></li>
            <li><a href="/productos">Catálogo</a></li>
            <li><a href="/carrito">Carrito</a></li>
          </ul>
        </div>

        <div className="footer-team">
          <h4 className="footer-section-title">NUESTRO EQUIPO</h4>
          <div className="team-cards">
            {teamMembers.map((member) => (
              <div key={member.name} className="team-card">
                <div
                  className="team-avatar"
                  style={{ background: member.color }}
                >
                  {member.avatar}
                </div>
                <div>
                  <div className="team-name">{member.name}</div>
                  <div className="team-role">{member.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 F1 Store. Todos los derechos reservados.</span>
        <span className="footer-flag">🏁</span>
      </div>
    </footer>
  );
}
