import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import "./Cart.css";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, totalPrice, totalItems } = useCart();

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <div className="cart-empty-icon">🏬</div>
        <h2 className="cart-empty-title">TU CARRITO ESTÁ VACÍO</h2>
        <p className="cart-empty-sub">Explora el catálogo y agrega piezas a tu equipo</p>
        <Link to="/productos" className="cart-empty-cta">
          VER CATÁLOGO →
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-header-section">
        <div className="cart-header-inner">
          <div>
            <div className="cart-header-label">MI GARAJE</div>
            <h1 className="cart-header-title">CARRITO</h1>
          </div>
          <button className="btn-clear" onClick={clearCart}>
            LIMPIAR TODO
          </button>
        </div>
      </div>

      <div className="cart-inner">
        {/* Items */}
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-img-wrap">
                <img src={item.imagen} alt={item.nombre} className="cart-item-img" />
              </div>

              <div className="cart-item-info">
                <div className="cart-item-team">{item.equipo}</div>
                <div className="cart-item-name">{item.nombre}</div>
                <div className="cart-item-pilot">
                  <span className="cart-pilot-dot" />
                  {item.piloto}
                </div>
              </div>

              <div className="cart-item-controls">
                <div className="quantity-control">
                  <button
                    className="qty-btn"
                    onClick={() => updateQuantity(item.id, item.cantidad - 1)}
                  >
                    −
                  </button>
                  <span className="qty-value">{item.cantidad}</span>
                  <button
                    className="qty-btn"
                    onClick={() => updateQuantity(item.id, item.cantidad + 1)}
                  >
                    +
                  </button>
                </div>

                <div className="cart-item-price">
                  ARS {(item.precio * item.cantidad).toLocaleString("es-AR")}
                </div>

                <button
                  className="btn-remove"
                  onClick={() => removeFromCart(item.id)}
                  title="Quitar del carrito"
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="cart-summary">
          <div className="summary-title">RESUMEN</div>

          <div className="summary-row">
            <span>Productos</span>
            <span>{totalItems}</span>
          </div>

          <div className="summary-sep" />

          {cart.map((item) => (
            <div key={item.id} className="summary-detail-row">
              <span className="summary-item-name">{item.nombre}</span>
              <span>ARS {(item.precio * item.cantidad).toLocaleString("es-AR")}</span>
            </div>
          ))}

          <div className="summary-sep" />

          <div className="summary-total-row">
            <span>TOTAL</span>
            <div className="summary-total-price">
              <span className="summary-currency">ARS</span>
              <span className="summary-amount">{totalPrice.toLocaleString("es-AR")}</span>
            </div>
          </div>

          <button className="btn-checkout">
            FINALIZAR COMPRA
            <span>→</span>
          </button>

          <Link to="/productos" className="btn-continue">
            ← SEGUIR COMPRANDO
          </Link>
        </div>
      </div>
    </div>
  );
}
