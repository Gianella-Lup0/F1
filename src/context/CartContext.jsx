import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("f1_cart")) || [];
  });

  // NUEVO: Estado global de Divisas
  const [currency, setCurrency] = useState("ARS");
  const exchangeRate = 0.0011; // 1 ARS = 0.0011 USD simulación interna

  useEffect(() => {
    localStorage.setItem("f1_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const itemExist = prev.find((item) => item.id === product.id);
      if (itemExist) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      return [...prev, { ...product, cantidad: 1 }];
    });
  };

  const removeOneFromCart = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item
      ).filter((item) => item.cantidad > 0)
    );
  };

  const clearCart = () => setCart([]);

  // Formateador dinámico e inteligente de precios dependiente del contexto
  const formatPrice = (amountInARS) => {
    if (currency === "USD") {
      return (amountInARS * exchangeRate).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    }
    return amountInARS.toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 0
    });
  };

  return (
    <CartContext.Provider value={{ 
      cart, addToCart, removeOneFromCart, clearCart, 
      currency, setCurrency, formatPrice 
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);