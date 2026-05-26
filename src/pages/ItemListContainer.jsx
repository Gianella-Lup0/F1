import { useState, useEffect } from "react";
import Item from "../components/Item";
import "./ItemListContainer.css";

const CATEGORIAS = ["todos", "cascos", "guantes", "ropa", "partes"];

export default function ItemListContainer() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoria, setCategoria] = useState("todos");
  const [sort, setSort] = useState("default");

  useEffect(() => {
    setLoading(true);
    fetch("/productos.json")
      .then((r) => r.json())
      .then((data) => {
        setProductos(data);
        setLoading(false);
      });
  }, []);

  const filtered = productos
    .filter((p) => categoria === "todos" || p.categoria === categoria)
    .sort((a, b) => {
      if (sort === "precio-asc") return a.precio - b.precio;
      if (sort === "precio-desc") return b.precio - a.precio;
      if (sort === "rating") return b.rating - a.rating;
      return 0;
    });

  return (
    <div className="catalog-page">
      {/* Hero Banner */}
      <div className="catalog-hero">
        <div className="catalog-hero-content">
          <div className="catalog-hero-label">TEMPORADA 2024</div>
          <h1 className="catalog-hero-title">
            CATÁLOGO<br />
            <span className="catalog-hero-accent">OFICIAL</span>
          </h1>
          <p className="catalog-hero-sub">
            Piezas de competición. Memorabilia auténtica. Velocidad en cada detalle.
          </p>
        </div>
        <div className="catalog-hero-checkered" />
      </div>

      {/* Filters */}
      <div className="catalog-controls">
        <div className="catalog-filters">
          {CATEGORIAS.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${categoria === cat ? "active" : ""}`}
              onClick={() => setCategoria(cat)}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>
        <select
          className="sort-select"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="default">ORDENAR</option>
          <option value="precio-asc">PRECIO: MENOR</option>
          <option value="precio-desc">PRECIO: MAYOR</option>
          <option value="rating">MEJOR RATING</option>
        </select>
      </div>

      {/* Results */}
      {loading ? (
        <div className="catalog-loading">
          <div className="loading-spinner" />
          <span>CARGANDO CATÁLOGO...</span>
        </div>
      ) : (
        <>
          <div className="catalog-count">
            {filtered.length} {filtered.length === 1 ? "PRODUCTO" : "PRODUCTOS"}
          </div>
          <div className="catalog-grid">
            {filtered.map((p) => (
              <Item key={p.id} producto={p} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
