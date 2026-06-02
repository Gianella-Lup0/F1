import { useState } from "react";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { cart, clearCart } = useCart() || { cart: [], clearCart: () => {} }; // Fallback preventivo
  const [completado, setCompletado] = useState(false);
  const [formData, setFormData] = useState({ nombre: "", email: "", direccion: "", ciudad: "", tarjeta: "" });

  const total = cart.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nombre || !formData.email || !formData.direccion) {
      alert("Por favor completa los campos obligatorios para el envío.");
      return;
    }
    setCompletado(true);
    clearCart();
  };

  if (completado) {
    return (
      <div style={{ padding: "60px 20px", color: "#fff", textAlign: "center" }}>
        <h1 style={{ color: "#00b050" }}>🏁 ¡ORDEN PROCESADA CON ÉXITO!</h1>
        <p style={{ fontSize: "1.2rem", color: "#ccc" }}>Tu pedido ha sido enviado a Boxes. Se te notificará por Email cuando el camión logístico salga hacia tu dirección.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px 20px", color: "#fff", display: "flex", flexWrap: "wrap", gap: "40px" }}>
      <div style={{ flex: 1, minWidth: "300px" }}>
        <h2>Datos de Envío y Pago</h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <input type="text" placeholder="Nombre completo *" required value={formData.nombre} onChange={e => setFormData({...formData, nombre: e.target.value})} style={{ padding: "10px", backgroundColor: "#111", color: "#fff", border: "1px solid #333" }} />
          <input type="email" placeholder="Correo Electrónico *" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} style={{ padding: "10px", backgroundColor: "#111", color: "#fff", border: "1px solid #333" }} />
          <input type="text" placeholder="Dirección de entrega *" required value={formData.direccion} onChange={e => setFormData({...formData, direccion: e.target.value})} style={{ padding: "10px", backgroundColor: "#111", color: "#fff", border: "1px solid #333" }} />
          <input type="text" placeholder="Ciudad *" required value={formData.ciudad} onChange={e => setFormData({...formData, ciudad: e.target.value})} style={{ padding: "10px", backgroundColor: "#111", color: "#fff", border: "1px solid #333" }} />
          <input type="text" placeholder="Número de Tarjeta (Ficticio para simulación)" value={formData.tarjeta} onChange={e => setFormData({...formData, tarjeta: e.target.value})} style={{ padding: "10px", backgroundColor: "#111", color: "#fff", border: "1px solid #333" }} />
          <button type="submit" style={{ backgroundColor: "#e10600", color: "#fff", border: "none", padding: "15px", fontWeight: "bold", cursor: "pointer", fontSize: "1.1rem" }}>CONFIRMAR COMPRA</button>
        </form>
      </div>

      <div style={{ flex: 1, minWidth: "300px", backgroundColor: "#141414", padding: "20px", borderRadius: "8px" }}>
        <h2>Resumen del Pedido</h2>
        {cart.map(item => (
          <div key={item.id} style={{ display: "flex", justifyContent: "space-between", margin: "10px 0", borderBottom: "1px solid #222", paddingBottom: "10px" }}>
            <span>{item.nombre} (x{item.cantidad})</span>
            <span>${(item.precio * item.cantidad).toLocaleString()}</span>
          </div>
        ))}
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "1.4rem", fontWeight: "bold", marginTop: "20px", color: "#e10600" }}>
          <span>TOTAL:</span>
          <span>${total.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}