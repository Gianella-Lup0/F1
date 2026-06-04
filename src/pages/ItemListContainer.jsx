import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Item from "../components/Item";
import { toggleFavoritoId } from "./Favoritos";
import "./ItemListContainer.css";

const CATEGORIAS = ["todos", "cascos", "guantes", "ropa", "partes", "modelos", "posters", "libros", "experiencias", "ediciones-limitadas"];

export default function ItemListContainer() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoria, setCategoria] = useState("todos");
  const [sort, setSort] = useState("default");
  const [isGridView, setIsGridView] = useState(true);
  
  const { formatPrice, currency } = useCart();
  const [maxPrecioSelected, setMaxPrecioSelected] = useState(2000000);
  const [limitePrecioAbsoluto, setLimitePrecioAbsoluto] = useState(2000000);
  
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") || "";
  const pilotoQuery = searchParams.get("piloto") || "";
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch("/productos.json")
      .then((r) => r.json())
      .then((data) => {
        setProductos(data);
        if (data.length > 0) {
          const max = Math.max(...data.map(p => p.precio));
          setLimitePrecioAbsoluto(max);
          setMaxPrecioSelected(max);
        }
        setLoading(false);
      });
  }, []);

  const showToast = (mensaje) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, mensaje }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3000);
  };

  const filtered = productos
    .filter((p) => {
      const matchCategoria = categoria === "todos" || p.categoria === categoria;
      const matchPrecio = p.precio <= maxPrecioSelected;
      const matchSearch = searchQuery === "" || p.nombre.toLowerCase().includes(searchQuery.toLowerCase());
      const matchPiloto = pilotoQuery === "" || p.pilotoSlug === pilotoQuery;
      return matchCategoria && matchPrecio && matchSearch && matchPiloto;
    })
    .sort((a, b) => {
      if (sort === "precio-asc") return a.precio - b.precio;
      if (sort === "precio-desc") return b.precio - a.precio;
      if (sort === "rating") return b.rating - a.rating;
      return 0;
    });

  return (
    <div className="catalog-page">
      <div className="toast-container" style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 1000, display: "flex", flexDirection: "column", gap: "10px" }}>
        {toasts.map(t => (
          <div key={t.id} style={{ backgroundColor: "#1f1f1f", color: "#fff", borderLeft: "5px solid #e10600", padding: "12px 24px", borderRadius: "4px", fontWeight: "bold" }}>{t.mensaje}</div>
        ))}
      </div>

      <div className="catalog-hero">
        <div className="catalog-hero-content">
          <div className="catalog-hero-label">TEMPORADA 2026</div>
          <h1 className="catalog-hero-title">CATÁLOGO<br /><span className="catalog-hero-accent">OFICIAL</span></h1>
        </div>
        <div className="catalog-hero-checkered" />
      </div>

      <div style={{ backgroundColor: "#111", padding: "20px", borderRadius: "8px", margin: "0 20px 20px 20px", border: "1px solid #222" }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "20px" }}>
          <div style={{ minWidth: "250px", flex: 1 }}>
            <label style={{ color: "#aaa", fontSize: "0.85rem", fontWeight: "bold" }}>
              PRECIO MÁXIMO: <span style={{ color: "#e10600" }}>{formatPrice(maxPrecioSelected)}</span>
            </label>
            <input type="range" min="0" max={limitePrecioAbsoluto} value={maxPrecioSelected} onChange={(e) => setMaxPrecioSelected(Number(e.target.value))} style={{ width: "100%", accentColor: "#e10600" }} />
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <button onClick={() => setIsGridView(true)} style={{ padding: "8px 12px", backgroundColor: isGridView ? "#e10600" : "#222", color: "#fff", border: "none", cursor: "pointer" }}>🔳 GRILLA</button>
            <button onClick={() => setIsGridView(false)} style={{ padding: "8px 12px", backgroundColor: !isGridView ? "#e10600" : "#222", color: "#fff", border: "none", cursor: "pointer" }}>☱ LISTA</button>
          </div>
        </div>
      </div>

      <div className="catalog-controls">
        <div className="catalog-filters">
          {CATEGORIAS.map((cat) => (
            <button key={cat} className={`filter-btn ${categoria === cat ? "active" : ""}`} onClick={() => setCategoria(cat)}>
              {cat.replace("-", " ").toUpperCase()}
            </button>
          ))}
        </div>
        <select className="sort-select" value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="default">ORDENAR</option>
          <option value="precio-asc">PRECIO: MENOR</option>
          <option value="precio-desc">PRECIO: MAYOR</option>
          <option value="rating">MEJOR RATING</option>
        </select>
      </div>

      {loading ? (
        <div className="catalog-grid" style={{ padding: "0 20px" }}>
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="skeleton-card" style={{ backgroundColor: "#141414", borderRadius: "8px", padding: "20px", minHeight: "260px", display: "flex", flexDirection: "column", gap: "15px" }}>
              <div className="skeleton-shimmer" style={{ width: "100%", height: "140px", backgroundColor: "#222" }} />
              <div className="skeleton-shimmer" style={{ width: "60%", height: "20px", backgroundColor: "#222" }} />
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="catalog-count">{filtered.length} ARTÍCULOS EN PARRILLA</div>
          <div className={isGridView ? "catalog-grid" : "catalog-list-view"}>
            {filtered.map((p) => (
              <div key={p.id} style={{ position: "relative" }} className="product-card-wrapper">
                {p.isLimited && <span style={{ position: "absolute", top: "10px", left: "10px", backgroundColor: "#ffd700", color: "#000", padding: "2px 6px", fontSize: "0.7rem", fontWeight: "bold", zIndex: 5 }}>⚠️ EDICIÓN LIMITADA</span>}
                <button onClick={() => { toggleFavoritoId(p.id); showToast(`❤️ Añadido a favoritos: ${p.nombre}`); }} style={{ position: "absolute", top: "10px", right: "10px", background: "rgba(0,0,0,0.6)", border: "none", color: "#fff", borderRadius: "50%", padding: "6px", cursor: "pointer", zIndex: 5 }}>❤️</button>
                <Item producto={p} viewMode={isGridView ? "grid" : "list"} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}