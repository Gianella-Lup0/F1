import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, addToCart, removeOneFromCart, clearCart, formatPrice } = useCart();

  const subtotal = cart.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
  
  // LOGÍSTICA DHL: Envío libre prioritario a los 200.000 ARS
  const metaEnvioGratis = 200000;
  const faltanteEnvio = metaEnvioGratis - subtotal;
  const porcentajeEnvio = Math.min((subtotal / metaEnvioGratis) * 100, 100);

  if (cart.length === 0) {
    return (
      <div style={{ padding: "60px 20px", color: "#fff", textAlign: "center" }}>
        <h2>Tu garage de compras está vacío 🛞</h2>
        <Link to="/productos" style={{ color: "#e10600", fontWeight: "bold" }}>Ir al Catálogo General</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px 20px", color: "#fff", maxWidth: "1000px", margin: "0 auto" }}>
      <h1 style={{ borderLeft: "5px solid #e10600", paddingLeft: "10px", marginBottom: "30px" }}>TU BOX DE COMPRAS</h1>

      {/* BARRA LOGÍSTICA PREMIUM: SIMULADOR DE ENVÍO DHL */}
      <div style={{ backgroundColor: "#111", border: "1px solid #ffd700", padding: "20px", borderRadius: "8px", marginBottom: "30px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", fontSize: "0.95rem" }}>
          <span>✈️ <strong>Logística DHL Express Prioritaria:</strong></span>
          <span>{faltanteEnvio > 0 ? `Faltan ${formatPrice(faltanteEnvio)} para Envío Aéreo de Competición Gratis` : "¡Lograste Envío Gratis a boxes!"}</span>
        </div>
        <div style={{ width: "100%", backgroundColor: "#222", height: "10px", borderRadius: "5px", overflow: "hidden" }}>
          <div style={{ width: `${porcentajeEnvio}%`, backgroundColor: "#ffd700", height: "100%", transition: "width 0.4s ease" }} />
        </div>
      </div>

      <div>
        {cart.map(item => (
          <div key={item.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: "#141414", padding: "15px", borderRadius: "6px", marginBottom: "15px", border: "1px solid #222" }}>
            <img src={item.imagen} alt={item.nombre} style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "4px" }} />
            <div style={{ flex: 1, padding: "0 20px" }}>
              <h4 style={{ margin: 0 }}>{item.nombre}</h4>
              <span style={{ color: "#aaa" }}>{formatPrice(item.precio)} c/u</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <button onClick={() => removeOneFromCart(item.id)} style={{ backgroundColor: "#222", color: "#fff", border: "none", padding: "5px 10px", cursor: "pointer" }}>-</button>
              <span>{item.cantidad}</span>
              <button onClick={() => addToCart(item)} style={{ backgroundColor: "#222", color: "#fff", border: "none", padding: "5px 10px", cursor: "pointer" }}>+</button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "30px", borderTop: "1px solid #222", paddingTop: "20px" }}>
        <button onClick={clearCart} style={{ background: "none", border: "none", color: "#aaa", cursor: "pointer", textDecoration: "underline" }}>Vaciar Carrito</button>
        <div style={{ textAlign: "right" }}>
          <h3>Subtotal General: <span style={{ color: "#e10600" }}>{formatPrice(subtotal)}</span></h3>
          <Link to="/checkout" style={{ display: "inline-block", backgroundColor: "#e10600", color: "#fff", padding: "12px 30px", fontWeight: "bold", textDecoration: "none", borderRadius: "4px", marginTop: "10px" }}>PROCEDER AL CHECKOUT 🏁</Link>
        </div>
      </div>
    </div>
  );
}