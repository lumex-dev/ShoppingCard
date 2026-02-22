import styles from "./app.module.css";
import NavigationBar from "./components/navbar/navbar";
import { Outlet } from "react-router-dom";
import { useState } from "react";

function App() {
  const [cart, setCart] = useState({});
  const [products, setProducts] = useState([]);
  const totalCount = Object.values(cart).reduce((sum, n) => sum + n, 0);
  return (
    <div className={styles.layout}>
      <NavigationBar totalCount={totalCount} cart={cart} />
      <Outlet context={{ cart, setCart, totalCount, products, setProducts }} />
    </div>
  );
}

export default App;
