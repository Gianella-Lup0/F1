import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div style={{ minHeight: "70vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", color: "#fff", textAlign: "center", padding: "20px" }}>
      <div style={{ backgroundColor: "#e10600", padding: "15px 30px", fontSize: "2rem", fontWeight: "900", border: "4px solid #fff", letterSpacing: "2px", marginBottom: "20px" }}>
        🚨 CARRERA DETENIDA 🚨
      </div>
      <h2>404 - BANDERA ROJA EN PISTA</h2>
      <p style={{ color: "#aaa", maxWidth: "450px", marginBottom: "25px" }}>Te saliste de los límites reglamentarios del circuito. Volvé de inmediato al pitlane.</p>
      <Link to="/" style={{ padding: "10px 20px", backgroundColor: "#fff", color: "#000", fontWeight: "bold", textDecoration: "none", borderRadius: "4px" }}>VOLVER A BOXES (INICIO)</Link>
    </div>
  );
}