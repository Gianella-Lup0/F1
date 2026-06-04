import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import productosJson from "../../public/productos.json";

export function toggleFavoritoId(id) {
  let favs = JSON.parse(localStorage.getItem("f1_favs")) || [];
  if (favs.includes(id)) {
    favs = favs.filter(favId => favId !== id);
  } else {
    favs.push(id);
  }
  localStorage.setItem("f1_favs", JSON.stringify(favs));
}

export default function Favoritos() {
  const [listaFavs, setListaFavs] = useState([]);

  useEffect(() => {
    const favsIds = JSON.parse(localStorage.getItem("f1_favs")) || [];
    setListaFavs(productosJson.filter(p => favsIds.includes(p.id)));
  }, []);

  const removerFav = (id) => {
    toggleFavoritoId(id);
    setListaFavs(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div style={{ padding: "40px 20px", color: "#fff" }}>
      <h1 style={{ borderLeft: "5px solid #e10600", paddingLeft: "10px", marginBottom: "30px" }}>FAVORITOS ❤️</h1>
      {listaFavs.length === 0 ? <p>No tenés productos guardados.</p> : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "20px" }}>
          {listaFavs.map(p => (
            <div key={p.id} style={{ backgroundColor: "#141414", padding: "15px", position: "relative" }}>
              <button onClick={() => removerFav(p.id)} style={{ position: "absolute", top: "10px", right: "10px", background: "none", border: "none", color: "#e10600", cursor: "pointer", fontSize: "1.2rem" }}>❤️</button>
              <img src={p.imagen} alt={p.nombre} style={{ width: "100%" }} />
              <h4>{p.nombre}</h4>
              <Link to={`/producto/${p.id}`} style={{ color: "#fff" }}>Ver producto</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}