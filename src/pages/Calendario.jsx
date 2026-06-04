import { useState, useEffect } from "react";

const gpsData = [
  { id: 1, carrera: "GP de Bahrein", circuito: "Sakhir Circuit", pais: "Bahrein", fecha: "2026-03-01T12:00:00Z" },
  { id: 2, carrera: "GP de Arabia Saudita", circuito: "Jeddah Corniche", pais: "Arabia Saudita", fecha: "2026-03-15T16:00:00Z" }
];

export default function Calendario() {
  const proximoGP = gpsData[0];
  const [tiempoFaltante, setTiempoFaltante] = useState("");

  useEffect(() => {
    const intervalo = setInterval(() => {
      const diferencia = new Date(proximoGP.fecha).getTime() - new Date().getTime();
      if (diferencia < 0) {
        setTiempoFaltante("¡SESIÓN EN CURSO!");
        clearInterval(intervalo);
      } else {
        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
        setTiempoFaltante(`${dias}d ${horas}h ${minutos}m`);
      }
    }, 1000);
    return () => clearInterval(intervalo);
  }, [proximoGP.fecha]);

  return (
    <div style={{ padding: "40px 20px", color: "#fff" }}>
      <div style={{ background: "linear-gradient(90deg, #e10600, #1f1f1f)", padding: "30px", borderRadius: "8px", textAlign: "center", marginBottom: "35px" }}>
        <h2>{proximoGP.carrera}</h2>
        <div style={{ fontSize: "1.5rem", fontFamily: "monospace", background: "rgba(0,0,0,0.4)", padding: "10px", display: "inline-block" }}>
          🏁 {tiempoFaltante}
        </div>
      </div>
      <h2>Lista de Circuitos</h2>
      {gpsData.map(gp => (
        <div key={gp.id} style={{ display: "flex", justifyContent: "space-between", backgroundColor: "#141414", padding: "15px", marginBottom: "10px" }}>
          <div><strong>{gp.carrera}</strong><div style={{ color: "#aaa", fontSize: "0.8rem" }}>{gp.circuito}</div></div>
          <div style={{ color: "#e10600", fontWeight: "bold" }}>{new Date(gp.fecha).toLocaleDateString()}</div>
        </div>
      ))}
    </div>
  );
}