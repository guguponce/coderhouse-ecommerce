import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import Navbar from "./components/Navbar/Navbar";
import Homepage from "./pages/Homepage/Homepage";
// import ItemPage from "./pages/ItemPage/ItemPage";
// import Category from "./pages/Category/Category";

import { Route, Routes } from "react-router-dom";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import CartProvider from "./hooks/CartContext";
import FirestoreProvider from "./firebase/Firestore.jsx";

function App() {
  return (
    <FirestoreProvider>
      <CartProvider>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/book/:id" element={<ItemDetailContainer />} />
          <Route path="/category/:category" element={<ItemListContainer />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </CartProvider>
    </FirestoreProvider>
  );
}

export default App;
