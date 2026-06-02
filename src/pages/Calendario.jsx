import { useState, useEffect } from "react";

const gpsData = [
  { id: 1, carrera: "GP de Bahrein", circuito: "Sakhir Circuit", pais: "Bahrein", fecha: "2026-03-01T12:00:00Z" },
  { id: 2, carrera: "GP de Arabia Saudita", circuito: "Jeddah Corniche", pais: "Arabia Saudita", fecha: "2026-03-15T16:00:00Z" },
  { id: 3, carrera: "GP de Australia", circuito: "Albert Park", pais: "Australia", fecha: "2026-03-29T03:00:00Z" },
];

export default function Calendario() {
  const proximoGP = gpsData[0]; // Tomamos el primero como ejemplo dinámico
  const [tiempoFaltante, setTiempoFaltante] = useState("");

  useEffect(() => {
    const intervalo = setInterval(() => {
      const ahora = new Date().getTime();
      const fechaDestino = new Date(proximoGP.fecha).getTime();
      const diferencia = fechaDestino - ahora;

      if (diferencia < 0) {
        setTiempoFaltante("¡SESIÓN EN CURSO / TERMINADA!");
        clearInterval(intervalo);
      } else {
        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);
        setTiempoFaltante(`${dias}d ${horas}h ${minutos}m ${segundos}s`);
      }
    }, 1000);

    return () => clearInterval(intervalo);
  }, [proximoGP.fecha]);

  return (
    <div style={{ padding: "40px 20px", color: "#fff" }}>
      {/* CUENTA REGRESIVA DESTACADA */}
      <div style={{
        background: "linear-gradient(90deg, #e10600, #1f1f1f)",
        padding: "30px",
        borderRadius: "8px",
        marginBottom: "40px",
        textAlign: "center"
      }}>
        <p style={{ letterSpacing: "2px", fontSize: "0.9rem", margin: 0, textTransform: "uppercase" }}>Próximo Gran Premio</p>
        <h2 style={{ fontSize: "2rem", margin: "10px 0" }}>{proximoGP.carrera} ({proximoGP.pais})</h2>
        <div style={{ fontSize: "1.8rem", fontFamily: "monospace", fontWeight: "bold", background: "rgba(0,0,0,0.5)", display: "inline-block", padding: "10px 20px", borderRadius: "4px" }}>
          🏁 {tiempoFaltante}
        </div>
      </div>

      <h2>Calendario de Circuitos</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {gpsData.map(gp => (
          <div key={gp.id} style={{ display: "flex", justifyContent: "space-between", backgroundColor: "#141414", padding: "15px 20px", borderRadius: "6px", borderLeft: "4px solid #333" }}>
            <div>
              <strong style={{ fontSize: "1.1rem" }}>{gp.carrera}</strong>
              <div style={{ color: "#aaa", fontSize: "0.85rem" }}>{gp.circuito}, {gp.pais}</div>
            </div>
            <div style={{ color: "#e10600", fontWeight: "bold" }}>
              {new Date(gp.fecha).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}