import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import ItemListContainer from "./pages/ItemListContainer";
import ItemDetail from "./pages/ItemDetail";
import Cart from "./pages/Cart";

// NUEVAS VISTAS
import Equipos from "./pages/Equipos";
import EquipoDetalle from "./pages/EquipoDetalle";
import Pilotos from "./pages/Pilotos";
import Calendario from "./pages/Calendario";
import Favoritos from "./pages/Favoritos";
import Comparador from "./pages/Comparador";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<ItemListContainer />} />
            <Route path="/producto/:id" element={<ItemDetail />} />
            <Route path="/carrito" element={<Cart />} />
            
            {/* NUEVAS RUTAS DE F1 */}
            <Route path="/equipos" element={<Equipos />} />
            <Route path="/equipo/:slug" element={<EquipoDetalle />} />
            <Route path="/pilotos" element={<Pilotos />} />
            <Route path="/calendario" element={<Calendario />} />
            <Route path="/favoritos" element={<Favoritos />} />
            <Route path="/comparador" element={<Comparador />} />
            <Route path="/checkout" element={<Checkout />} />
            
            {/* FALLBACK 404 BANDERA ROJA */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </CartProvider>
  );
}