import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./ItemDetail.css";

export default function ItemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/productos.json")
      .then((r) => r.json())
      .then((data) => {
        const found = data.find((p) => p.id === parseInt(id));
        setProducto(found || null);
        setLoading(false);
      });
  }, [id]);

  function handleAddToCart() {
    if (!producto) return;
    addToCart(producto);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  if (loading) {
    return (
      <div className="detail-loading">
        <div className="loading-spinner" />
        <span>CARGANDO DETALLE...</span>
      </div>
    );
  }

  if (!producto) {
    return (
      <div className="detail-not-found">
        <h2>PRODUCTO NO ENCONTRADO</h2>
        <button onClick={() => navigate("/productos")} className="btn-back">
          ← VOLVER AL CATÁLOGO
        </button>
      </div>
    );
  }

  return (
    <div className="detail-page">
      <div className="detail-breadcrumb">
        <span onClick={() => navigate("/productos")} className="breadcrumb-link">
          CATÁLOGO
        </span>
        <span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-current">{producto.nombre.toUpperCase()}</span>
      </div>

      <div className="detail-inner">
        {/* Image side */}
        <div className="detail-image-side">
          <div className="detail-img-wrap">
            <img src={producto.imagen} alt={producto.nombre} className="detail-img" />
            <div className="detail-img-gradient" />
          </div>
          <div className="detail-team-badge">{producto.equipo}</div>
        </div>

        {/* Info side */}
        <div className="detail-info-side">
          <div className="detail-category-tag">{producto.categoria.toUpperCase()}</div>

          <h1 className="detail-title">{producto.nombre}</h1>

          <div className="detail-pilot-row">
            <span className="detail-pilot-dot" />
            <span className="detail-pilot">{producto.piloto}</span>
            <div className="detail-rating">
              <span className="detail-star">★</span>
              <span>{producto.rating}</span>
            </div>
          </div>

          <p className="detail-desc">{producto.descripcion}</p>

          {/* Specs */}
          <div className="detail-specs">
            <div className="specs-title">ESPECIFICACIONES</div>
            <div className="specs-grid">
              {Object.entries(producto.especificaciones).map(([key, val]) => (
                <div key={key} className="spec-item">
                  <span className="spec-key">{key.toUpperCase()}</span>
                  <span className="spec-val">{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stock */}
          <div className="detail-stock">
            <div className={`stock-indicator ${producto.stock <= 2 ? "low" : ""}`}>
              <span className="stock-dot" />
              {producto.stock <= 2
                ? `SOLO ${producto.stock} DISPONIBLES`
                : `EN STOCK (${producto.stock} unidades)`}
            </div>
          </div>

          {/* Price & CTA */}
          <div className="detail-price-row">
            <div className="detail-price">
              <span className="detail-price-currency">ARS</span>
              <span className="detail-price-amount">
                {producto.precio.toLocaleString("es-AR")}
              </span>
            </div>

            <button
              className={`btn-add-to-cart ${added ? "added" : ""}`}
              onClick={handleAddToCart}
            >
              {added ? "✓ AGREGADO AL CARRITO" : "AGREGAR AL CARRITO"}
              {!added && <span className="btn-arrow">→</span>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
