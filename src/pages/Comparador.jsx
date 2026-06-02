import { useState } from "react";
import productosJson from "../productos.json";

export default function Comparador() {
  const [seleccionados, setSeleccionados] = useState([]);

  const agregarAlComparador = (e) => {
    const id = parseInt(e.target.value);
    if (!id) return;
    if (seleccionados.length >= 3) {
      alert("Solo podés comparar hasta 3 productos simultáneamente.");
      return;
    }
    if (seleccionados.find(p => p.id === id)) return;

    const prod = productosJson.find(p => p.id === id);
    setSeleccionados([...seleccionados, prod]);
  };

  const removerDelComparador = (id) => {
    setSeleccionados(seleccionados.filter(p => p.id !== id));
  };

  return (
    <div style={{ padding: "40px 20px", color: "#fff" }}>
      <h1 style={{ borderLeft: "5px solid #e10600", paddingLeft: "10px" }}>COMPARADOR DE PRODUCTOS</h1>
      
      <div style={{ marginBottom: "30px" }}>
        <label style={{ marginRight: "10px" }}>Selecciona un producto para añadir: </label>
        <select onChange={agregarAlComparador} style={{ padding: "8px", backgroundColor: "#111", color: "#fff", border: "1px solid #333" }}>
          <option value="">-- Elige un producto --</option>
          {productosJson.map(p => (
            <option key={p.id} value={p.id}>{p.nombre}</option>
          ))}
        </select>
      </div>

      {seleccionados.length === 0 ? (
        <p style={{ color: "#666" }}>Selecciona productos en el desplegable superior para iniciar la comparación técnica.</p>
      ) : (
        <div style={{ display: "flex", gap: "20px", overflowX: "auto" }}>
          {seleccionados.map(p => (
            <div key={p.id} style={{ backgroundColor: "#141414", minWidth: "280px", flex: 1, padding: "20px", borderRadius: "8px", border: "1px solid #333" }}>
              <button onClick={() => removerDelComparador(p.id)} style={{ float: "right", backgroundColor: "#e10600", color: "#fff", border: "none", padding: "4px 8px", cursor: "pointer", borderRadius: "4px" }}>Quitar</button>
              <img src={p.imagen} alt={p.nombre} style={{ width: "100%", maxHeight: "150px", objectFit: "contain", margin: "15px 0" }} />
              <h3>{p.nombre}</h3>
              <p style={{ fontSize: "1.3rem", color: "#e10600", fontWeight: "bold" }}>${p.precio.toLocaleString()}</p>
              <p>⭐ {p.rating} / 5.0</p>
              
              <div style={{ borderTop: "1px solid #333", marginTop: "15px", paddingTop: "15px" }}>
                <strong>Especificaciones Técnicas:</strong>
                <ul style={{ paddingLeft: "20px", color: "#ccc", fontSize: "0.9rem" }}>
                  {Object.entries(p.especificaciones).map(([key, val]) => (
                    <li key={key} style={{ margin: "5px 0" }}><span style={{ textTransform: "capitalize" }}>{key}</span>: {val}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}