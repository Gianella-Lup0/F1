import { useState } from "react";
import productosJson from "../../public/productos.json";

export default function Comparador() {
  const [seleccionados, setSeleccionados] = useState([]);

  const agregarAlComparador = (e) => {
    const id = parseInt(e.target.value);
    if (!id) return;
    if (seleccionados.length >= 3) return alert("Máximo 3 productos.");
    if (seleccionados.find(p => p.id === id)) return;
    setSeleccionados([...seleccionados, productosJson.find(p => p.id === id)]);
  };

  return (
    <div style={{ padding: "40px 20px", color: "#fff" }}>
      <h1 style={{ borderLeft: "5px solid #e10600", paddingLeft: "10px", marginBottom: "20px" }}>COMPARADOR</h1>
      <select onChange={agregarAlComparador} style={{ padding: "8px", backgroundColor: "#111", color: "#fff", border: "1px solid #333", marginBottom: "20px" }}>
        <option value="">-- Añadir producto --</option>
        {productosJson.map(p => <option key={p.id} value={p.id}>{p.nombre}</option>)}
      </select>
      <div style={{ display: "flex", gap: "20px", overflowX: "auto" }}>
        {seleccionados.map(p => (
          <div key={p.id} style={{ backgroundColor: "#141414", padding: "20px", minWidth: "250px", flex: 1, border: "1px solid #333" }}>
            <button onClick={() => setSeleccionados(seleccionados.filter(item => item.id !== p.id))} style={{ backgroundColor: "#e10600", color: "#fff", border: "none", cursor: "pointer" }}>Quitar</button>
            <h3>{p.nombre}</h3>
            <p style={{ color: "#e10600", fontWeight: "bold" }}>${p.precio.toLocaleString()}</p>
            <p>Rating: ⭐ {p.rating}</p>
            <div style={{ borderTop: "1px solid #333", marginTop: "10px", paddingTop: "10px" }}>
              {Object.entries(p.especificaciones).map(([k, v]) => <div key={k} style={{ fontSize: "0.85rem" }}><span style={{ color: "#aaa" }}>{k}:</span> {v}</div>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}