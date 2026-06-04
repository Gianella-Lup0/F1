import { useState } from "react";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { cart, clearCart, formatPrice } = useCart();
  const [completado, setCompletado] = useState(false);
  const total = cart.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

  // EFECTO EFÍMERO: Lanzador nativo de confeti multicolor estilo podio F1
  const lanzarConfetiPodio = () => {
    const contenedor = document.createElement("div");
    contenedor.style.position = "fixed";
    contenedor.style.top = "0"; contenedor.style.left = "0";
    contenedor.style.width = "100vw"; contenedor.style.height = "100vh";
    contenedor.style.pointerEvents = "none"; contenedor.style.zIndex = "9999";
    document.body.appendChild(contenedor);

    const colores = ["#e10600", "#ffd700", "#ffffff", "#00d2be"];
    for (let i = 0; i < 120; i++) {
      const particula = document.createElement("div");
      particula.style.position = "absolute";
      particula.style.width = `${Math.random() * 10 + 5}px`;
      particula.style.height = `${Math.random() * 12 + 6}px`;
      particula.style.backgroundColor = colores[Math.floor(Math.random() * colores.length)];
      particula.style.left = `${Math.random() * 100}vw`;
      particula.style.top = "-20px";
      particula.style.opacity = Math.random().toString();
      particula.style.transform = `rotate(${Math.random() * 360}deg)`;
      particula.style.transition = `transform ${Math.random() * 3 + 2}s ease-out, top ${Math.random() * 3 + 2}s ease-out`;
      
      contenedor.appendChild(particula);

      setTimeout(() => {
        particula.style.top = "105vh";
        particula.style.transform = `rotate(${Math.random() * 720}deg) translateX(${Math.random() * 100 - 50}px)`;
      }, 50);
    }
    setTimeout(() => contenedor.remove(), 5000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCompletado(true);
    lanzarConfetiPodio();
    clearCart();
  };

  if (completado) {
    return (
      <div style={{ padding: "80px 20px", color: "#fff", textAlign: "center" }}>
        <h1 style={{ color: "#00b050", fontSize: "3rem", marginBottom: "15px" }}>🏆 ¡VICTORIA EN BOXES!</h1>
        <p style={{ fontSize: "1.2rem", color: "#aaa" }}>Tu orden ha sido procesada con éxito por telemetría. La logística DHL está preparando el despacho.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px 20px", color: "#fff", display: "flex", flexWrap: "wrap", gap: "40px", maxWidth: "1100px", margin: "0 auto" }}>
      <div style={{ flex: 1, minWidth: "300px" }}>
        <h2>Formulario de Despacho</h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "20px" }}>
          <input type="text" placeholder="Nombre de Piloto / Comprador *" required style={{ padding: "12px", backgroundColor: "#111", color: "#fff", border: "1px solid #333", borderRadius: "4px" }} />
          <input type="email" placeholder="Correo electrónico de telemetría *" required style={{ padding: "12px", backgroundColor: "#111", color: "#fff", border: "1px solid #333", borderRadius: "4px" }} />
          <input type="text" placeholder="Dirección de Envío (Garage / Box) *" required style={{ padding: "12px", backgroundColor: "#111", color: "#fff", border: "1px solid #333", borderRadius: "4px" }} />
          <button type="submit" style={{ backgroundColor: "#e10600", color: "#fff", border: "none", padding: "14px", fontWeight: "bold", cursor: "pointer", borderRadius: "4px", textTransform: "uppercase" }}>CONFIRMAR Y PASAR POR BANDERA A CUADROS</button>
        </form>
      </div>
      
      <div style={{ flex: 1, backgroundColor: "#141414", padding: "25px", borderRadius: "8px", border: "1px solid #222", minWidth: "300px" }}>
        <h2>Resumen de Carga</h2>
        <div style={{ margin: "20px 0", borderBottom: "1px solid #333", paddingBottom: "15px" }}>
          {cart.map(item => (
            <div key={item.id} style={{ display: "flex", justifyContent: "space-between", margin: "12px 0", fontSize: "0.95rem" }}>
              <span style={{ color: "#aaa" }}>{item.nombre} <strong>(x{item.cantidad})</strong></span>
              <span>{formatPrice(item.precio * item.cantidad)}</span>
            </div>
          ))}
        </div>
        <h3 style={{ color: "#fff", display: "flex", justifyContent: "space-between" }}>
          <span>TOTAL FACTURADO:</span>
          <span style={{ color: "#ffd700" }}>{formatPrice(total)}</span>
        </h3>
      </div>
    </div>
  );
}