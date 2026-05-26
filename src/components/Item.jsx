import { Link } from "react-router-dom";
import "./Item.css";

export default function Item({ producto }) {
  const { id, nombre, piloto, equipo, precio, imagen, rating, stock } = producto;

  return (
    <Link to={`/producto/${id}`} className="item-card">
      <div className="item-img-wrap">
        <img src={imagen} alt={nombre} className="item-img" loading="lazy" />
        {stock <= 2 && (
          <span className="item-badge-limited">ÚLTIMAS UNIDADES</span>
        )}
        <div className="item-overlay" />
      </div>

      <div className="item-body">
        <div className="item-team">{equipo}</div>
        <h3 className="item-name">{nombre}</h3>
        <div className="item-pilot">
          <span className="pilot-dot" />
          {piloto}
        </div>

        <div className="item-footer">
          <div className="item-price">
            <span className="price-currency">ARS</span>
            <span className="price-amount">
              {precio.toLocaleString("es-AR")}
            </span>
          </div>
          <div className="item-rating">
            <span className="rating-star">★</span>
            <span>{rating}</span>
          </div>
        </div>
      </div>

      <div className="item-hover-line" />
    </Link>
  );
}
