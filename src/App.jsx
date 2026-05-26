import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import ItemListContainer from "./pages/ItemListContainer";
import ItemDetail from "./pages/ItemDetail";
import Cart from "./pages/Cart";

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
          </Routes>
        </Layout>
      </BrowserRouter>
    </CartProvider>
  );
}
